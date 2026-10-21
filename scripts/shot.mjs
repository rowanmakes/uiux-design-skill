// scripts/shot.mjs  用法: node scripts/shot.mjs <html路径> <输出目录> [--viewports=wide,narrow,1280x800,...]
// 预设视口: wide=1440x900, narrow=390x844；其余按 `宽x高` 指定（如 1280x800），报告/截图名使用 `1280x800`。
// 本轮取证改动（详见 runs/evidence-report.md）：
//   1) 新增可选 --viewports 参数（默认仍为 wide,narrow，向后兼容）；
//   2) report.file 一律写 HTML 基本名（index.html），不含运行/组路径，避免 report.json 泄露运行 ID；
//   3) 新增 pageErrors 字段单独记录 pageerror，不并入 consoleErrors；
//   4) console/pageerror/请求文本中出现的本页 file:// 绝对路径一律脱敏为 index.html，其余保留原文。
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const args = process.argv.slice(2).filter((a) => !a.startsWith('--viewports='));
const vpArg = process.argv.find((a) => a.startsWith('--viewports='));
const [htmlPath, outDir] = args;
if (!htmlPath || !outDir || args.length > 2) {
  console.error('用法: node scripts/shot.mjs <html路径> <输出目录> [--viewports=wide,narrow,1280x800,...]');
  process.exit(1);
}
fs.mkdirSync(outDir, { recursive: true });

const presets = {
  wide: { name: 'wide', width: 1440, height: 900 },
  narrow: { name: 'narrow', width: 390, height: 844 },
};
const viewports = (vpArg ? vpArg.slice('--viewports='.length).split(',') : ['wide', 'narrow']).map((item) => {
  const key = item.trim();
  if (presets[key]) return presets[key];
  const m = /^(\d+)x(\d+)$/.exec(key);
  if (!m) {
    console.error(`未知视口规格: ${key}（可用: wide, narrow, 或 宽xHeight 如 1280x800）`);
    process.exit(1);
  }
  return { name: key, width: Number(m[1]), height: Number(m[2]) };
});

// 脱敏：本页 file:// 绝对路径 → index.html；所在目录 URL → 前缀剔除
const pageUrl = pathToFileURL(path.resolve(htmlPath)).href;
const dirUrl = pathToFileURL(path.resolve(htmlPath, '..')).href + '/';
const sanitize = (s) => String(s).split(pageUrl).join('index.html').split(dirUrl).join('');

const report = {
  file: path.basename(htmlPath),
  viewports: {},
  consoleErrors: [],
  pageErrors: [],
  externalRequests: [],
  tabStops: [],
};

const browser = await chromium.launch();
for (const vp of viewports) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  const page = await ctx.newPage();
  page.on('console', (m) => {
    if (m.type() === 'error') report.consoleErrors.push(`[${vp.name}] ${sanitize(m.text())}`);
  });
  page.on('pageerror', (e) => {
    report.pageErrors.push(`[${vp.name}] ${sanitize(e.message)}`);
  });
  page.on('request', (r) => {
    const u = r.url();
    if (!u.startsWith('file:') && !u.startsWith('data:') && !u.startsWith('blob:'))
      report.externalRequests.push(`[${vp.name}] ${sanitize(u)}`);
  });
  await page.goto(pageUrl);
  await page.waitForTimeout(800);

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth
  );
  report.viewports[vp.name] = { width: vp.width, height: vp.height, horizontalOverflow: overflow };

  await page.screenshot({ path: path.join(outDir, `${vp.name}-fold.png`) });
  await page.screenshot({ path: path.join(outDir, `${vp.name}-full.png`), fullPage: true });

  if (vp.name === 'wide') {
    // 键盘巡检：记录前 40 次 Tab 落在哪些元素上，是否有可见焦点样式（启发式，仍需人工看）
    for (let i = 0; i < 40; i++) {
      await page.keyboard.press('Tab');
      const info = await page.evaluate(() => {
        const el = document.activeElement;
        if (!el || el === document.body) return null;
        const cs = getComputedStyle(el);
        const hasRing = cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0 || cs.boxShadow !== 'none';
        return { tag: el.tagName.toLowerCase(), text: (el.innerText || el.getAttribute('aria-label') || '').trim().slice(0, 40), visibleFocusStyle: hasRing };
      });
      if (info) report.tabStops.push(info);
    }
  }
  await ctx.close();
}
await browser.close();

fs.writeFileSync(path.join(outDir, 'report.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
