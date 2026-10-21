import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const recDir = process.argv[2] || 'runs/e2-C-agy/recordings/initial';
const outDir = path.join(recDir, 'frames');
fs.mkdirSync(outDir, { recursive: true });

const times = [0.5, 2.5, 4.5, 6.5, 8.5, 10.5, 12.5, 14.5, 16.5, 18.5, 21.0, 23.5];
const browser = await chromium.launch();

try {
  for (const vp of ['1440x900', '390x844']) {
    const videoFile = `${vp}-scroll.webm`;
    const viewerHtmlPath = path.join(recDir, `${vp}-viewer.html`);
    fs.writeFileSync(
      viewerHtmlPath,
      `<!DOCTYPE html>
<html>
<body style="margin:0;background:#0e0c0a;color:#eee;font-family:sans-serif;padding:16px">
  <h3 style="margin:0 0 12px;font-size:16px">Video Playback Frame Sampling: ${videoFile}</h3>
  <video id="v" src="./${videoFile}" muted playsinline preload="auto" style="width:320px;height:180px;border:1px solid #444"></video>
  <div id="status" style="margin:8px 0;font-size:13px;color:#ccc"></div>
  <div id="grid" style="display:grid;grid-template-columns:repeat(4, 1fr);gap:10px"></div>
</body>
</html>`,
      'utf8'
    );

    const page = await browser.newPage({ viewport: { width: 1440, height: 1080 } });
    await page.goto(pathToFileURL(path.resolve(viewerHtmlPath)).href, { waitUntil: 'load', timeout: 8000 });

    const meta = await page.evaluate(async (ts) => {
      const waitEventBounded = (el, ev, ms = 3000) =>
        new Promise((resolve) => {
          let done = false;
          const finish = (tag) => {
            if (done) return;
            done = true;
            el.removeEventListener(ev, onEv);
            resolve(tag);
          };
          const onEv = () => finish('event');
          el.addEventListener(ev, onEv, { once: true });
          setTimeout(() => finish('timeout'), ms);
        });

      const v = document.getElementById('v');
      if (v.readyState < 2) {
        await waitEventBounded(v, 'loadeddata', 4000);
      }

      // Play briefly to verify actual browser playback works
      let playedOk = false;
      try {
        await v.play();
        await new Promise((r) => setTimeout(r, 400));
        playedOk = !v.paused && v.currentTime > 0;
        v.pause();
      } catch (e) {
        playedOk = false;
      }

      const seekBounded = async (targetSec) => {
        if (Math.abs(v.currentTime - targetSec) < 0.02 && v.readyState >= 2) {
          return 'same-time';
        }
        const p = waitEventBounded(v, 'seeked', 2500);
        v.currentTime = targetSec;
        return await p;
      };

      const grid = document.getElementById('grid');
      const captured = [];
      for (const t of ts) {
        const res = await seekBounded(t);
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
        const c = document.createElement('canvas');
        c.width = v.videoWidth || 640;
        c.height = v.videoHeight || 360;
        c.getContext('2d').drawImage(v, 0, 0, c.width, c.height);
        const wrap = document.createElement('div');
        wrap.style.background = '#1c1815';
        wrap.style.padding = '6px';
        wrap.style.border = '1px solid #332a22';
        const cap = document.createElement('div');
        cap.style.fontSize = '12px';
        cap.style.marginBottom = '4px';
        cap.style.color = '#e59a43';
        cap.textContent = `req=${t.toFixed(1)}s actual=${v.currentTime.toFixed(2)}s (${res})`;
        c.style.width = '100%';
        c.style.height = 'auto';
        c.style.display = 'block';
        wrap.appendChild(cap);
        wrap.appendChild(c);
        grid.appendChild(wrap);
        captured.push({ req: t, actual: Number(v.currentTime.toFixed(2)), res });
      }
      document.getElementById('status').textContent =
        `playedOk=${playedOk} video=${v.videoWidth}x${v.videoHeight} duration=${v.duration}`;
      return {
        playedOk,
        duration: v.duration,
        videoWidth: v.videoWidth,
        videoHeight: v.videoHeight,
        captured,
      };
    }, times);

    console.log(vp, JSON.stringify(meta));
    await page.screenshot({ path: path.join(outDir, `${vp}-contact-sheet.png`), fullPage: true });
    await page.close();
    fs.unlinkSync(viewerHtmlPath);
  }
} finally {
  await browser.close();
}
