# E1 准备：参考站截图采集报告

日期：2026-10-21（所有时间戳为 UTC）。工作目录：本子 worktree `e1-preparation`（分支 LJC-god/e1-preparation）。
本报告只记录真实执行结果；未记录任何令牌、Cookie、凭据。

## 1. 依赖与环境验证

- `package.json` devDependencies 含 `playwright: ^1.64.1`；`package-lock.json` 锁定 `playwright@1.64.1`（`packages[""].devDependencies` 与 package.json 一致，`node_modules/playwright` 与 `node_modules/playwright-core` 均为 1.64.1）。
- 两文件均受 Git 跟踪（`git ls-files` 确认），且为上一轮提交 `c3c6945`（"test: Round 1 preparation — briefs 01/07, ..."）已提交的内容；本轮无需改动，原版本原样保留，来源即该提交。
- 实际执行 `npm ci`：成功（`added 2 packages in 1s`），`npx playwright --version` → `1.64.1`。
- 实际执行 `npx playwright install chromium`：浏览器就绪，`chromium.executablePath()` = `C:\Users\12296\AppData\Local\ms-playwright\chromium-1248\chrome-win64\chrome.exe`。
- 既有 `scripts/shot.mjs` 最小验证：`node scripts/shot.mjs test/smoke/index.html .codex/tmp/shot-verify --viewports=wide` 成功，产出 `wide-fold.png`、`wide-full.png`、`report.json`（horizontalOverflow=false，console/page 错误 0）。证明本 worktree 可 `npm ci` 后直接截图。临时输出均在 `.codex/tmp/`（未提交、未覆盖旧产物）。
- 用户级 Skill 仅做存在性枚举（未读取内容、未改动全局规则）：`~/.codex/skills/` 存在，但其中没有 `uiux-design`，也没有 `frontend-design`；`~/.claude/skills/` 目录不存在。

## 2. scripts/ref-shot.mjs（本轮新增）

用法：`node scripts/ref-shot.mjs <网址> <输出目录>`。行为（全部按任务要求）：

- Playwright Chromium，viewport 1440×900；加载（`waitUntil:'load'`）后等 3 秒动画再截首屏 `01-fold.png`；`window.scrollBy(0, innerHeight)` 滚动一整屏后等 3 秒再截 `02-scrolled.png`（均为 viewport 截图，非 fullPage）。
- 有限超时：导航 45s、单张截图 30s；页面明显更高而窗口滚动未生效时会再尝试一次 `documentElement.scrollTop += innerHeight` 并如实记录两次尝试。
- `meta.json` 记录：请求/最终网址、重定向链、HTTP 状态、开始/结束与每张截图时间、导航耗时、滚动前后位置与文档高度、每张截图的字节数与像素统计（自写 PNG 解码：量化色数、亮度标准差、主色占比）、控制台/页面错误（截断、限条数）。
- 防误报：正文文本长度与元素数阈值 + 标题/正文拦截词匹配（captcha、access denied、just a moment、安全验证等）+ 两张截图空白像素检测，综合判定 `assessment.status`：`content` / `suspicious` / `blocked-or-empty` / `error`。
- 只读访问：不登录、不绕过访问控制、不替换网站；UA 覆盖为普通桌面 Chrome 并在 meta.json 中透明记录。
- 本地自测（输出 `.codex/tmp/`，未提交）：真实内容页判 `content`；空白页判 `blocked-or-empty`（像素空白+0 字文本）；含 "Access Denied / verify you are human / captcha" 的页面判 `blocked-or-empty`（命中拦截词）。

## 3. 六站采集结果

执行（顺序、真实耗时含 3s+3s 等待）：`node scripts/ref-shot.mjs <网址> test/refs/<域名>`，六站总计约 80 秒（14:05:07–14:06:25Z）。全部只访问任务指定的六个原站。

| 站点 | HTTP | 最终网址 | 导航耗时 | 滚动 0→Y (文档高) | 判定 | 看图确认 |
|---|---|---|---|---|---|---|
| linear.app | 200 | https://linear.app/ | 3.7s | 0→900 (9960px) | content | 首屏 "The product development system for teams and agents" + 产品 UI 模拟；第二屏客户 logo 墙，真实渲染 |
| apple.com | 200 | https://www.apple.com/ | 3.3s | 0→900 (13401px) | content | 首屏 iPhone 主题 hero + 苹果全局导航；第二屏 iPhone Pro / Apple Card 区块，真实渲染（看图模型不认识当前在售机型，属其知识截断，截图本身为 apple.com 实际返回内容） |
| grok.com | 200 | https://grok.com/ | 6.8s | 0→0 (文档高=900px) | content | 未登录落地页 "What should we explore?" + 聊天输入框；文档恰为一屏高，窗口无第二屏可滚，第二张与首屏同区（含页脚），非错误 |
| cursor.com | 200 | https://cursor.com/ | 2.5s | 0→900 (8199px) | content | 首屏 "Cursor is your coding agent…" + Download CTA；第二屏信任 logo 墙与 agent 区块，真实渲染 |
| spaceship.com | 200 | https://www.spaceship.com/ | 7.6s | 0→900 (19310px) | content | 首屏 "A domain odyssey" 域名搜索；第二屏 "Domains at cost" hero，真实渲染 |
| dishoom.com | 200 | https://www.dishoom.com/ | 5.4s | 0→900 (10198px) | content | 首屏 "सभी का स्वागत / From Bombay With Love" 深色 hero（背景为深色图像/视频区）+ Book a table；第二屏导航与 hero 延续，真实渲染 |

- 六站均成功：HTTP 200、无导航错误、无拦截/验证码/空白页信号；12 张截图全部经看图能力逐一确认确有真实网页内容（上表末列）。
- 无失败站点，故无失败页截图需要标注。所有站点均出现常规 Cookie 同意横幅（grok/cursor/spaceship/dishoom 较明显），属页面真实状态，未做点击处理。
- 各站目录：`test/refs/<域名>/{01-fold.png, 02-scrolled.png, meta.json}`；完整原始数据（重定向链、精确时间戳、像素统计、控制台错误条数等）见各 `meta.json`。cursor.com 有 1 条、spaceship.com 有 5 条控制台错误（第三方资源加载类，不影响渲染），已记录于各自 meta.json。
- `test/refs/README.md` 为任务指定原文，逐字照抄，未增删。

## 4. 耗时汇总

- `npm ci` + 版本确认：约 4s；`npx playwright install chromium`：约 2s（浏览器已就绪）。
- `shot.mjs` 冒烟验证：约 4s；`ref-shot.mjs` 本地三例自测：约 16s。
- 六站采集：80s（逐站 10–17s，含每站 3s+3s 动画等待）。
- 写脚本 + 自测 + 采集 + 看图核验 + 报告合计约 25 分钟。

## 5. 提交范围

仅提交：`scripts/ref-shot.mjs`、`test/refs/`（六站截图 + meta.json + README.md + 本报告）。`package.json`、`package-lock.json` 无改动（沿用提交 `c3c6945`）。未触碰 `skill/`、既有简报素材、其他脚本、旧 `runs/blind/reviews`；未推送。
