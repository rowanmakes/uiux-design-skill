// scripts/scroll-record.mjs  用法: node scripts/scroll-record.mjs <html路径> <输出目录> [--reduced-motion]
//
// 滚动录像取证：对 1440x900 与 390x844 两个视口各录一段 webm。
// 时间线（每视口约 25s，另有浏览器启动等准备时间）：
//   0s   加载页面（file://，支持相对资源），等 load + 字体 + 图片，再静置 3s（首帧停留，进视频）
//   ~4s  匀速线性连续滚动 top→bottom，目标 20s，用 performance.now() 实测计时驱动，不整体瞬跳；
//        每帧 window.scrollTo({behavior:'instant'}) 小步推进，站点 CSS scroll-behavior:smooth
//        也不会与驱动打架；每帧重读 scrollHeight，天然支持动态高度页面。
// 截图：滚动起点、1/3、2/3、终点各一张，文件名带视口宽度标签（如 1440x900-01-start.png）。
// 不禁用站点动画/CSS（--reduced-motion 可选，仅在显式传入时向页面模拟 reduce）。
// report.json：真实计时、视频/截图路径、滚动轨迹采样、视口、console/page 错误、失败请求与失败项。
// 退出码：0=两个视口都成功；1=CLI 用法错误；2=部分或全部视口失败（report 仍写出）。

import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const USAGE = '用法: node scripts/scroll-record.mjs <html路径> <输出目录> [--reduced-motion]';
const VIEWPORTS = [
  { name: '1440x900', width: 1440, height: 900 },
  { name: '390x844', width: 390, height: 844 },
];
const INITIAL_HOLD_MS = 3000; // 起点静置，需体现在视频开头
const SCROLL_MS = 20000; // 目标滚动时长（实测计时，非整眠）
const FINAL_PAUSE_MS = 2000; // 底部静置，需体现在视频结尾
const ASSETS_TIMEOUT_MS = 8000; // 字体/图片就绪上限，超时不算失败（记录后继续）

const argv = process.argv.slice(2);
const reducedMotion = argv.includes('--reduced-motion');
const positional = argv.filter((a) => a !== '--reduced-motion');
const [htmlPath, outDir] = positional;
if (positional.length !== 2 || !htmlPath || !outDir) {
  console.error(USAGE);
  process.exit(1);
}
if (!fs.existsSync(htmlPath) || !fs.statSync(htmlPath).isFile()) {
  console.error(`输入不是文件: ${htmlPath}`);
  process.exit(1);
}
fs.mkdirSync(outDir, { recursive: true });

const htmlAbs = path.resolve(htmlPath);
// 脱敏：本页 file:// 绝对路径 → 文件名；所在目录 URL → 前缀剔除（沿用 shot.mjs 约定）
const pageUrl = pathToFileURL(htmlAbs).href;
const dirUrl = pathToFileURL(path.resolve(htmlPath, '..')).href + '/';
const sanitize = (s) => String(s).split(pageUrl).join(path.basename(htmlPath)).split(dirUrl).join('');

const report = {
  file: path.basename(htmlPath),
  generatedAt: new Date().toISOString(),
  reducedMotion,
  timeline: { initialHoldMs: INITIAL_HOLD_MS, scrollTargetMs: SCROLL_MS, finalPauseMs: FINAL_PAUSE_MS },
  viewports: {},
  failures: [],
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// 页内驱动器：RAF 每帧用实测 elapsed 计算线性进度（匀速，用户要求 uniform speed），
// 每小步 scrollTo 显式 behavior:'instant'——站点 CSS 设了 scroll-behavior:smooth 也不会
// 与本驱动反复打架；不禁用站点动画/CSS。每帧重读 scrollHeight-innerHeight，
// 页面长高/变矮都能贴住真实底部。首帧可能被无头环境延迟 ~1s（实测），
// 时间线从第一帧真正到达时才起算，避免开局跳变。
// 注意：必须传真实函数而非字符串——本机 Playwright 1.64 对带缩进的字符串表达式不会自动调用。
const driverFn = (durationMs) => {
  window.__scrollInfo = { progress: 0, scrollY: Math.round(window.scrollY), maxScroll: 0, scrollHeight: 0, done: false, elapsedMs: 0 };
  window.__scrollHold = false; // Node 侧截图前置 true 暂停滚动，暂停时长不计入 20s 时间线
  return new Promise((resolve) => {
    let start = null;
    let holdStart = null;
    let holdAccum = 0;
    const step = () => {
      const now = performance.now();
      if (start === null) start = now; // 首帧到达才开始计时
      if (window.__scrollHold) {
        if (holdStart === null) holdStart = now;
      } else if (holdStart !== null) {
        holdAccum += now - holdStart;
        holdStart = null;
      }
      const doc = document.scrollingElement || document.documentElement;
      const maxScroll = Math.max(0, doc.scrollHeight - window.innerHeight);
      const elapsed = now - start - holdAccum;
      const t = Math.min(1, elapsed / durationMs); // 线性：progress 即时间比例
      if (!window.__scrollHold) window.scrollTo({ top: t * maxScroll, left: 0, behavior: 'instant' });
      window.__scrollInfo = {
        progress: t,
        scrollY: Math.round(window.scrollY),
        maxScroll: Math.round(maxScroll),
        scrollHeight: Math.round(doc.scrollHeight),
        done: t >= 1,
        elapsedMs: Math.round(elapsed),
      };
      if (t >= 1) resolve(window.__scrollInfo);
      else requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
};

async function recordViewport(browser, vp) {
  const entry = {
    viewport: { width: vp.width, height: vp.height },
    timeline: {},
    scroll: { samples: [] },
    screenshots: [],
    video: null,
    consoleErrors: [],
    pageErrors: [],
    failedRequests: [],
  };
  const t0 = Date.now();
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    recordVideo: { dir: outDir, size: { width: vp.width, height: vp.height } },
    ...(reducedMotion ? { reducedMotion: 'reduce' } : {}),
  });
  const page = await ctx.newPage();
  page.on('console', (m) => {
    if (m.type() === 'error') entry.consoleErrors.push(sanitize(m.text()));
  });
  page.on('pageerror', (e) => entry.pageErrors.push(sanitize(e.message)));
  page.on('requestfailed', (r) => entry.failedRequests.push(sanitize(`${r.method()} ${r.url()} :: ${r.failure()?.errorText}`)));

  try {
    const navStart = Date.now();
    await page.goto(pageUrl, { waitUntil: 'load' });
    // 资产就绪：字体 + 全部 img complete；超时上限后继续（不阻断取证）
    const assetsOk = await Promise.race([
      page.evaluate(
        () => Promise.all([
          document.fonts ? document.fonts.ready : Promise.resolve(),
          ...Array.from(document.images).map((img) =>
            img.complete && img.naturalWidth > 0 ? Promise.resolve() : new Promise((res) => { img.addEventListener('load', res, { once: true }); img.addEventListener('error', res, { once: true }); }),
          ),
        ]).then(() => true),
      ),
      sleep(ASSETS_TIMEOUT_MS).then(() => false),
    ]);
    entry.timeline.setupMs = Date.now() - t0;
    entry.timeline.assetsReady = assetsOk;

    await page.evaluate(() => window.scrollTo(0, 0)); // 确认从顶部开始
    await sleep(INITIAL_HOLD_MS); // 首帧停留，须体现在视频开头

    const info0 = await page.evaluate(() => {
      const doc = document.scrollingElement || document.documentElement;
      return { scrollHeight: Math.round(doc.scrollHeight), innerHeight: window.innerHeight, maxScroll: Math.round(Math.max(0, doc.scrollHeight - window.innerHeight)) };
    });
    entry.scroll.startScrollHeight = info0.scrollHeight;
    entry.scroll.maxScrollStartPx = info0.maxScroll;
    entry.scroll.shortPage = info0.maxScroll <= 0;

    // 截图 1/4：滚动起点（此刻仍在顶部）
    const shot = async (label, scrollY) => {
      const p = path.join(outDir, `${vp.name}-${label}.png`);
      await page.screenshot({ path: p });
      entry.screenshots.push({ label, path: (path.relative(process.cwd(), p) || p).split(path.sep).join('/'), scrollY });
    };
    // 滚动中截图：先暂停驱动（暂停时长不计入 20s），画面停稳再拍，记录实际冻结位置
    const shotHeld = async (label) => {
      await page.evaluate(() => { window.__scrollHold = true; });
      await sleep(150); // 等当前帧停稳
      const y = await page.evaluate(() => Math.round(window.scrollY));
      await shot(label, y);
      await page.evaluate(() => { window.__scrollHold = false; });
    };
    await shot('01-start', 0);

    if (!entry.scroll.shortPage) {
      // 先同步初始化标志，避免首个轮询跑在驱动 evaluate 之前读到 undefined
      await page.evaluate(() => {
        window.__scrollInfo = { progress: 0, scrollY: Math.round(window.scrollY), maxScroll: 0, scrollHeight: 0, done: false, elapsedMs: 0 };
      });
      // 启动页内驱动（不 await；Node 并行轮询进度并在 1/3、2/3 处截图）
      let driverError = null;
      const driverDone = page.evaluate(driverFn, SCROLL_MS).catch((e) => { driverError = e; return null; });
      const scrollStart = Date.now();
      let shotThird = false;
      let shotTwoThirds = false;
      let sampleCount = 0;
      // 轮询直到驱动完成（含首帧 RAF 预热缓冲；超时视为失败抛出）
      for (;;) {
        const info = (await page.evaluate(() => window.__scrollInfo)) || { progress: 0, scrollY: 0, maxScroll: 0, done: false, elapsedMs: 0 };
        if (driverError) throw driverError;
        const at = Date.now() - scrollStart;
        if (sampleCount++ % 12 === 0 || info.done) entry.scroll.samples.push({ tMs: at, ...info }); // 约 1s 一个轨迹点
        // 线性 progress 即位置比例；maxScroll>0 门槛避免初始化 0 值误触发
        if (!shotThird && info.maxScroll > 0 && info.progress >= 1 / 3) {
          shotThird = true;
          await shotHeld('02-third');
        }
        if (!shotTwoThirds && info.maxScroll > 0 && info.progress >= 2 / 3) {
          shotTwoThirds = true;
          await shotHeld('03-two-thirds');
        }
        if (info.done) break;
        if (at > SCROLL_MS + 15000) throw new Error(`滚动驱动超时未完成（${at}ms）`);
        await sleep(80);
      }
      const finalInfo = await driverDone;
      entry.timeline.scrollActualMs = finalInfo ? finalInfo.elapsedMs : null;
      entry.scroll.endScrollY = finalInfo ? finalInfo.scrollY : null;
      entry.scroll.endMaxScrollPx = finalInfo ? finalInfo.maxScroll : null;
      entry.scroll.endScrollHeight = finalInfo ? finalInfo.scrollHeight : null;
      entry.scroll.reachedBottom = finalInfo ? finalInfo.maxScroll - finalInfo.scrollY <= 2 : false;
    } else {
      entry.timeline.scrollActualMs = 0;
      entry.scroll.endScrollY = 0;
      // 短页：无滚动可做，其余三张截图同位拍摄，如实记录
      await shot('02-third', 0);
      await shot('03-two-thirds', 0);
    }

    await sleep(FINAL_PAUSE_MS); // 末帧停留，须体现在视频结尾

    // 截图 4/4：终点（短页时即顶部，与 01 相同位置）
    const endY = await page.evaluate(() => Math.round(window.scrollY));
    await shot('04-end', endY);

    // 关 context 落盘视频，改成稳定文件名
    const video = page.video();
    await ctx.close();
    const raw = await video.path();
    const videoPath = path.join(outDir, `${vp.name}-scroll.webm`);
    fs.renameSync(raw, videoPath);
    const st = fs.statSync(videoPath);
    entry.video = { path: (path.relative(process.cwd(), videoPath) || videoPath).split(path.sep).join('/'), width: vp.width, height: vp.height, fileSizeBytes: st.size, nonempty: st.size > 0 };
    entry.timeline.totalMs = Date.now() - t0;
    entry.ok = true;
    return entry;
  } catch (err) {
    entry.ok = false;
    const msg = sanitize(err && err.message ? err.message : String(err));
    entry.error = msg;
    report.failures.push(`[${vp.name}] ${msg}`);
    try { await ctx.close(); } catch { /* 已关闭则忽略 */ }
    return entry;
  }
}

const runStart = Date.now();
const browser = await chromium.launch();
for (const vp of VIEWPORTS) {
  report.viewports[vp.name] = await recordViewport(browser, vp);
}
await browser.close();
report.totalRuntimeMs = Date.now() - runStart;

fs.writeFileSync(path.join(outDir, 'report.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));

const failed = VIEWPORTS.filter((vp) => !report.viewports[vp.name].ok);
if (failed.length) {
  console.error(`失败视口: ${failed.map((v) => v.name).join(', ')}（详见 report.json failures）`);
  process.exit(2);
}
