# 半山烘焙 (Banshan Roastery) — 创作与迭代过程日志 (Process Log)

## 阶段一：理解需求与审美北极星确立
- **时间**：2026-10-21 09:46 - 09:50
- **核心动作**：
  - 研读项目内 `skill/uiux-design/SKILL.md`、`skill/uiux-design/references/taste.md`（重点对齐第 1.5 节「场景即页面 / 电影式数字体验」）、`interaction.md`、`review-and-evidence.md`、`brand-to-interface.md`，以及 `test/briefs/01.md` 和 `test/materials/01.md`。
  - 审视参考标杆截图（Dishoom 琥珀暖光编辑感排印、Spaceship 电影级全屏推镜叙事），确立「**成都破晓半山雾海与林间微亮烘焙暖窗**」的视觉北极星：冷黛青雾（`oklch(0.11 0.02 250)`）与暖琥珀炉火（`oklch(0.75 0.14 66)`）的色温推进。
  - 撰写 `runs/e2-A-agy/design-notes.md`，锁定单链路页面流向（首屏雾海定场 → 三幕滚动推镜叙事 → 窗前木桌开放账页定制台 → 页脚单次诚实声明），明确首屏红线（仅主视觉 + 一句话 + 一个动作 + 左上角克制品牌名，豆单与价格绝不挤入首屏）。

## 阶段二：主视觉与三幕故事画面检视及复制
- **时间**：2026-10-21 09:47 - 09:51
- **核心动作**：
  - 读取 `test/e2/images/A/selection.json`，并使用 `read_file` 逐张目视审查指定的 4 张生成场景图（`test/e2/images/A/candidates/hero-01.webp` 与 `test/e2/images/A/story/01~03.webp`），随后原样复制到 `runs/e2-A-agy/output/assets/`：
    1. `hero-01.webp`：破晓前深蓝色山谷云海，右下角山腰木屋透出温暖琥珀色窗光，左侧 1/3 为深色松林负空间，完美契合首屏排版留白。
    2. `story-01.webp`：山谷雾海缓缓流淌，远处山坡烘焙间窗光微亮，对应品牌哲学与第一支花香型水洗豆「云雾水洗」。
    3. `story-02.webp`：镜头推近至林间木石烘焙小屋窗外，窗内清晰可见小型烘焙机与温暖炉火，对应「火塘日晒」与「山脊蜜处理」。
    4. `story-03.webp`：镜头进入烘焙间窗前厚木桌，200g 牛皮纸咖啡豆袋、散落浅中烘咖啡豆与冒着热气的粗陶杯静置桌面，窗外是蓝调山雾，对应按月订阅规则与木桌定制台。

## 阶段三：编写 `runs/e2-A-agy/output/index.html` 初版
- **时间**：2026-10-21 09:56 - 10:02
- **核心动作**：
  - 实现纯内联 CSS + 原生 JS 的单文件页面 `runs/e2-A-agy/output/index.html`。
  - 构建真实 `window.scrollY` 驱动的三幕镜头平滑叠化、轻景深推镜（`scale` + `translate3d`）与光影/水汽响应。
  - 构建多层自然氛围系统：双层长周期山雾漂移（`44s` / `54s`）、窗光柔光呼吸（`8s`）、第三幕杯口热气（`38s`）、零星空气微尘（`8.6s~13.8s`）及 SVG `feTurbulence` 胶片颗粒层（`opacity: 0.14`）。
  - 构建窗前木桌订阅定制台：支持点选当期三款豆子、切换单袋（`¥62 / 月起`）/ 双袋尝鲜组合（`¥118 / 月`）、切换寄送节奏（`每 2 周` / `每月` / `每 6 周`）、收件称呼空值校验、生成订阅烘焙单凭条及一键复制/撤销闭环。

## 阶段四：第一轮录屏审查与问题定位 (`recordings/initial`)
- **时间**：2026-10-21 10:02 - 10:05
- **核心动作**：
  - 运行 `node scripts/scroll-record.mjs runs/e2-A-agy/output/index.html runs/e2-A-agy/recordings/initial`。
  - 提取视频连续帧序列（`runs/e2-A-agy/recordings/initial/frames/`）并用 `read_file` 逐张审查 `1440x900` 与 `390x844` 的全部截图与帧序列。
  - **发现问题**：
    1. `.light-source-window` 光晕半径偏小，形成可见圆形硬边，且在 `390x844-01-start.png` 中与首屏主标题重叠。
    2. `--font-serif` 中 `'Georgia'` 排在 `'Noto Serif SC'` 之前，导致中文逗号与句号宽度被西文字体压缩。
    3. `.scene-act` 与 `.menu-row` 的四周细边框仍有轻微卡片感。
    4. 页面中存在 `·` 中点连接符。
    5. `390x844` 窄屏下 `#subscribe-desk` 高度超出 `100vh`，导致 `03-two-thirds` 提前滑入定制台且 `04-end` 裁切定制台顶部标题。

## 阶段五：第二轮修复、录屏与复查 (`recordings/round-2`)
- **时间**：2026-10-21 10:05 - 10:09
- **核心动作**：
  - 修改 `runs/e2-A-agy/output/index.html` 修复上述 5 项问题（重写漫射光晕、中文字体优先、移除盒状边框改为开放式账页排印、清除 `·` 符号、对齐宽窄屏章节高度比）。
  - 运行 `node scripts/scroll-record.mjs runs/e2-A-agy/output/index.html runs/e2-A-agy/recordings/round-2`（保留 `initial` 不覆盖）。
  - 提取 `round-2/frames/` 连续帧序列并目视检查全部 8 张截图与帧序列。
  - **发现新细节问题**：
    1. `390x844` 窄屏上出现 3 处孤字换行（`奶油口 / 感`、`红茶尾 / 韵`、`双袋尝鲜组 / 合`）。
    2. 第一幕 `story-01.webp` 向第二幕 `story-02.webp` 的叠化起点（`0.21`）偏早，第一幕满不透明度停留时间可进一步延长。

## 阶段六：第三轮终版精修、录屏与全量验证 (`recordings/final` & `recordings/reduced-motion`)
- **时间**：2026-10-21 10:09 - 10:21
- **核心动作**：
  - 为所有风味词组、产地与数量价格单位添加 `.nowrap` 保护，微调 `390x844` 账页列宽与字号；将第一幕向第二幕转场调整为 `smoothstep(0.27, 0.32, globalProgress)`。
  - 运行 `node scripts/scroll-record.mjs runs/e2-A-agy/output/index.html runs/e2-A-agy/recordings/final` 生成终版录屏。
  - 运行 `node scripts/scroll-record.mjs runs/e2-A-agy/output/index.html runs/e2-A-agy/recordings/reduced-motion --reduced-motion` 生成减弱动态效果录屏。
  - 提取 `final/frames/` 连续帧序列与 `t=7.5s` 第一幕定格帧，并在 Chromium 原生视频播放器中实播检验全部 `.webm` 视频，验证所有交互闭环、无障碍焦点与零报错指标，完成 `verification.md`。
