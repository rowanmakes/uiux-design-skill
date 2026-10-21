// scripts/shot.mjs  用法: node scripts/shot.mjs <html路径> <输出目录>
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const [, , htmlPath, outDir] = process.argv;
if (!htmlPath || !outDir) {
  console.error('用法: node scripts/shot.mjs <html路径> <输出目录>');
  process.exit(1);
}
fs.mkdirSync(outDir, { recursive: true });

const viewports = [
  { name: 'wide', width: 1440, height: 900 },
  { name: 'narrow', width: 390, height: 844 },
];
const report = { file: htmlPath, viewports: {}, consoleErrors: [], externalRequests: [], tabStops: [] };

const browser = await chromium.launch();
for (const vp of viewports) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  const page = await ctx.newPage();
  page.on('console', (m) => { if (m.type() === 'error') report.consoleErrors.push(`[${vp.name}] ${m.text()}`); });
  page.on('request', (r) => {
    const u = r.url();
    if (!u.startsWith('file:') && !u.startsWith('data:') && !u.startsWith('blob:')) report.externalRequests.push(`[${vp.name}] ${u}`);
  });
  await page.goto(pathToFileURL(path.resolve(htmlPath)).href);
  await page.waitForTimeout(800);

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth
  );
  report.viewports[vp.name] = { horizontalOverflow: overflow };

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
