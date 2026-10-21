#!/usr/bin/env node
// scripts/ref-shot.mjs — 参考站截图采集（只读访问，不登录、不绕过访问控制）
// 用法: node scripts/ref-shot.mjs <网址> <输出目录>
// 行为：1440x900 viewport；加载后等 3s 动画 → 截首屏；window.scrollBy 一整屏 → 等 3s → 截第二屏。
// 元数据：meta.json 记录请求/最终网址、重定向链、HTTP 状态、各截图时间与滚动位置、
//        导航/控制台错误、验证码·拦截·空白页信号（PNG 像素统计 + 文本特征），如实判定。
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const [urlArg, outDirArg] = process.argv.slice(2);
if (!urlArg || !outDirArg || process.argv.length > 4) {
  console.error('用法: node scripts/ref-shot.mjs <网址> <输出目录>');
  process.exit(2);
}
const url = urlArg;
const outDir = outDirArg;
fs.mkdirSync(outDir, { recursive: true });

const NAV_TIMEOUT_MS = 45_000; // 有限导航超时
const ANIM_WAIT_MS = 3_000;    // 加载后 / 滚动后的动画等待
const SHOT_TIMEOUT_MS = 30_000;
const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

// —— 最小 PNG 解码（8bit 非隔行 RGB/RGBA），用于空白页像素检测 ——
function pngMetrics(buf) {
  if (buf.length < 8 || buf.readUInt32BE(0) !== 0x89504e47) throw new Error('not a png');
  let off = 8;
  let width = 0, height = 0, bitDepth = 0, colorType = 0, interlace = 0;
  const idat = [];
  while (off + 8 <= buf.length) {
    const len = buf.readUInt32BE(off);
    const type = buf.toString('ascii', off + 4, off + 8);
    const data = buf.subarray(off + 8, off + 8 + len);
    if (type === 'IHDR') {
      width = data.readUInt32BE(0); height = data.readUInt32BE(4);
      bitDepth = data[8]; colorType = data[9]; interlace = data[12];
    } else if (type === 'IDAT') idat.push(data);
    off += 12 + len;
    if (type === 'IEND') break;
  }
  if (bitDepth !== 8 || (colorType !== 6 && colorType !== 2) || interlace !== 0) {
    return { supported: false, width, height };
  }
  const ch = colorType === 6 ? 4 : 3;
  const raw = zlib.inflateSync(Buffer.concat(idat));
  const stride = width * ch;
  const px = Buffer.allocUnsafe(height * stride);
  let src = 0;
  for (let y = 0; y < height; y++) {
    const filter = raw[src++];
    raw.copy(px, y * stride, src, src + stride);
    if (filter === 0) { src += stride; continue; }
    const row = y * stride;
    for (let x = 0; x < stride; x++) {
      const left = x >= ch ? px[row + x - ch] : 0;
      const up = y > 0 ? px[row - stride + x] : 0;
      const ul = y > 0 && x >= ch ? px[row - stride + x - ch] : 0;
      let v = px[row + x];
      if (filter === 1) v = (v + left) & 0xff;
      else if (filter === 2) v = (v + up) & 0xff;
      else if (filter === 3) v = (v + ((left + up) >> 1)) & 0xff;
      else if (filter === 4) {
        const p = left + up - ul;
        const pa = Math.abs(p - left), pb = Math.abs(p - up), pc = Math.abs(p - ul);
        v = (v + (pa <= pb && pa <= pc ? left : pb <= pc ? up : ul)) & 0xff;
      }
      px[row + x] = v;
    }
    src += stride;
  }
  const colorCounts = new Map();
  let sum = 0, sumSq = 0, n = 0;
  for (let y = 0; y < height; y++) {
    const row = y * stride;
    for (let x = 0; x < width; x++) {
      const i = row + x * ch;
      const r = px[i], g = px[i + 1], b = px[i + 2];
      const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      sum += lum; sumSq += lum * lum; n++;
      const q = ((r >> 4) << 8) | ((g >> 4) << 4) | (b >> 4);
      colorCounts.set(q, (colorCounts.get(q) || 0) + 1);
    }
  }
  const mean = sum / n;
  const std = Math.sqrt(Math.max(0, sumSq / n - mean * mean));
  let dominant = 0;
  for (const c of colorCounts.values()) dominant = Math.max(dominant, c);
  return {
    supported: true, width, height,
    uniqueQuantizedColors: colorCounts.size,
    luminanceStdDev: Math.round(std * 100) / 100,
    dominantColorFraction: Math.round((dominant / n) * 10000) / 10000,
  };
}

const meta = {
  script: 'scripts/ref-shot.mjs',
  requestedUrl: url,
  finalUrl: null,
  redirectChain: [],
  httpStatus: null,
  statusText: null,
  startedAt: new Date().toISOString(),
  finishedAt: null,
  viewport: { width: 1440, height: 900 },
  userAgentOverride: USER_AGENT,
  navigationTimeoutMs: NAV_TIMEOUT_MS,
  animWaitMs: ANIM_WAIT_MS,
  navigationError: null,
  timingsMs: { navigation: null, animWaitAfterLoad: ANIM_WAIT_MS, scrollWait: ANIM_WAIT_MS },
  title: null,
  page: null,
  scroll: null,
  blockedPagePatterns: [],
  screenshots: [],
  consoleErrors: [],
  pageErrors: [],
  assessment: null,
};

const BLOCKED_PATTERNS = [
  'captcha', 'are you a robot', 'verify you are human', 'unusual traffic',
  'access denied', 'attention required', 'just a moment', 'enable javascript',
  'blocked', 'request blocked', 'error 403', 'error 404', '安全验证', '访问被拒绝',
];

const browser = await chromium.launch();
try {
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    locale: 'en-US',
    timezoneId: 'UTC',
    userAgent: USER_AGENT,
    extraHTTPHeaders: { 'accept-language': 'en-US,en;q=0.9' },
  });
  const page = await ctx.newPage();
  page.on('console', (m) => {
    if (m.type() === 'error' && meta.consoleErrors.length < 10)
      meta.consoleErrors.push(m.text().slice(0, 200));
  });
  page.on('pageerror', (e) => {
    if (meta.pageErrors.length < 10) meta.pageErrors.push(String(e.message).split('\n')[0].slice(0, 200));
  });

  // —— 导航（有限超时；load 超时也保留已渲染内容继续截图并如实记录）——
  const t0 = Date.now();
  let response = null;
  try {
    response = await page.goto(url, { waitUntil: 'load', timeout: NAV_TIMEOUT_MS });
  } catch (e) {
    meta.navigationError = String(e.message).split('\n')[0].slice(0, 300);
  }
  meta.timingsMs.navigation = Date.now() - t0;
  meta.finalUrl = page.url();
  if (response) {
    meta.httpStatus = response.status();
    meta.statusText = response.statusText();
    try {
      meta.redirectChain = response.request().redirectChain().map((r) => r.url());
    } catch { /* 保留空链 */ }
  }

  // —— 加载后等动画，再截首屏 ——
  await page.waitForTimeout(ANIM_WAIT_MS);
  const before = await page.evaluate(() => ({
    title: document.title,
    textLength: (document.body ? document.body.innerText : '').trim().length,
    headText: (document.body ? document.body.innerText : '').trim().slice(0, 3000),
    elementCount: document.querySelectorAll('*').length,
    imageCount: document.images.length,
    innerHeight: window.innerHeight,
    scrollHeight: document.documentElement.scrollHeight,
    scrollY: window.scrollY,
  }));
  meta.title = before.title;
  meta.page = {
    textLength: before.textLength,
    elementCount: before.elementCount,
    imageCount: before.imageCount,
  };
  const scanText = `${before.title || ''} ${before.headText || ''}`.toLowerCase();
  meta.blockedPagePatterns = BLOCKED_PATTERNS.filter((p) => scanText.includes(p));

  const shots = [];
  async function takeShot(file) {
    const p = path.join(outDir, file);
    const takenAt = new Date().toISOString();
    const scrollY = await page.evaluate(() => window.scrollY);
    await page.screenshot({ path: p, timeout: SHOT_TIMEOUT_MS });
    const buf = fs.readFileSync(p);
    shots.push({
      file,
      takenAt,
      scrollY,
      bytes: buf.length,
      pixels: pngMetrics(buf),
    });
  }

  await takeShot('01-fold.png');

  // —— 向下滚动一整屏，等动画，截第二屏 ——
  const attempts = [];
  await page.evaluate(() => window.scrollBy(0, window.innerHeight));
  await page.waitForTimeout(ANIM_WAIT_MS);
  let y1 = await page.evaluate(() => window.scrollY);
  attempts.push({ method: 'window.scrollBy(0, innerHeight)', scrollYAfter: y1 });
  // 若窗口滚动未生效而页面明显更长，再尝试一次直接设置 scrollTop（如实记录两种尝试）
  const maxScroll = before.scrollHeight - before.innerHeight;
  if (y1 < Math.min(innerHeightSafe(before.innerHeight), maxScroll) * 0.5 && maxScroll > before.innerHeight) {
    await page.evaluate(() => { document.documentElement.scrollTop += window.innerHeight; });
    await page.waitForTimeout(1_000);
    const y2 = await page.evaluate(() => window.scrollY);
    attempts.push({ method: 'documentElement.scrollTop += innerHeight', scrollYAfter: y2 });
    y1 = y2;
  }
  await takeShot('02-scrolled.png');
  meta.scroll = {
    innerHeight: before.innerHeight,
    documentScrollHeight: before.scrollHeight,
    scrollYBefore: before.scrollY,
    scrollYAfter: y1,
    attempts,
  };
  meta.screenshots = shots;

  // —— 判定：不把验证码/拦截/空白页当正常内容 ——
  const reasons = [];
  if (meta.navigationError) reasons.push(`navigation error: ${meta.navigationError}`);
  if (meta.httpStatus != null && meta.httpStatus >= 400) reasons.push(`http status ${meta.httpStatus}`);
  if (meta.blockedPagePatterns.length) reasons.push(`blocked-page pattern: ${meta.blockedPagePatterns.join(', ')}`);
  const blank = (s) => !s || !s.pixels || !s.pixels.supported ||
    s.pixels.uniqueQuantizedColors < 8 || s.pixels.luminanceStdDev < 2;
  if (blank(shots[0])) reasons.push('first viewport looks blank (pixel statistics)');
  if (blank(shots[1])) reasons.push('second viewport looks blank (pixel statistics)');
  if (meta.page.textLength < 80) reasons.push(`body text too short (${meta.page.textLength} chars)`);
  if (meta.page.elementCount < 30) reasons.push(`too few elements (${meta.page.elementCount})`);
  const looksLikeContent = reasons.length === 0;
  let status;
  if (looksLikeContent) status = 'content';
  else if (meta.navigationError || (meta.httpStatus != null && meta.httpStatus >= 400)) status = 'error';
  else if (meta.blockedPagePatterns.length || (blank(shots[0]) && meta.page.textLength < 200)) status = 'blocked-or-empty';
  else status = 'suspicious';
  meta.assessment = { status, looksLikeContent, reasons };
  await ctx.close();
} catch (e) {
  meta.assessment = meta.assessment || {
    status: 'error',
    looksLikeContent: false,
    reasons: [`capture failed: ${String(e.message).split('\n')[0].slice(0, 300)}`],
  };
} finally {
  meta.finishedAt = new Date().toISOString();
  fs.writeFileSync(path.join(outDir, 'meta.json'), JSON.stringify(meta, null, 2));
  console.log(JSON.stringify({
    requestedUrl: meta.requestedUrl,
    finalUrl: meta.finalUrl,
    httpStatus: meta.httpStatus,
    assessment: meta.assessment,
    screenshots: meta.screenshots.map((s) => s.file),
  }, null, 2));
  await browser.close();
}

function innerHeightSafe(h) { return h || 900; }
