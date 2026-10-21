# 半山烘焙 (Banshan Roastery) — 视觉与动态自检报告 (`self-review.md`)

- **试验标识**：`e2-B-agy`（Condition B：`SKILL.md` + `taste.md` + `interaction.md`）
- **最终产物**：[`runs/e2-B-agy/output/index.html`](file:///C:/Users/12296/orca/workspaces/FrontDesign/e2-B-agy/runs/e2-B-agy/output/index.html)
- **录制产物**：
  - 第一轮初版录制：`runs/e2-B-agy/recordings/initial/`（`1440x900` 与 `390x844` 全程滚动录像 `.webm`、首尾及三分位截图、连续帧拼图与过渡带、`summary.json`）
  - 第二轮终版录制：`runs/e2-B-agy/recordings/final/`（`1440x900` 与 `390x844` 全程滚动录像 `.webm`、首尾及三分位截图、连续帧拼图与过渡带、`summary.json`）

---

## 一、北极星（North Star）

> **“步入半山深夜的铸铁烘焙间：每一次向下滚动，都是从夜雾山谷推门入室、凑近滚筒观火听爆、直到在木桌旁亲手封存一袋热气未散的浅中烘咖啡豆。”**

围绕这一北极星，页面摒弃了常见的“顶部横幅 + 三栏商品卡片 + 价格对比表 + 评价墙”SaaS 模板结构，采用**全视口固定烘焙舞台（Sticky Viewport Stage）+ 右侧单列叙事手记流（Editorial Ledger）**的双层空间架构：
- **底层固定视觉舞台（`#roast-stage`）**：占满 `100vw × 100vh`，随页面滚动在四幕实景画面之间平滑交叉溶解（Cross-dissolve），辅以随滚动深度缓慢漂移的暖琥珀余烬径向光晕（`#stage-glow`）与右上角实时更新的「烘焙工序标尺」（`半山夜火 — 浅中出炉 — 按月封袋`）。
- **前景单列叙事手记（`.narrative-column`）**：在桌面端锚定于画面左侧负空间（最大阅读宽度控制在 `42ch–55ch`），以铸铁暖炭黑半透明毛玻璃手记面板承载四幕叙事，使读者在向下滚动时，视线始终能够同时感知右侧铸铁烘焙机的炉火变化与左侧手记文字的温度。
- **色彩与字体克制**：
  - 严格执行暗色暖炭调（`#0E0B09` 炉膛深炭底、`#17120E` 熟铁皮面板、`#F3ECE1` 羊皮纸暖白正文、`#B9AC9B` 亚麻灰褐次级文本），仅使用单一暖铜琥珀强调色 `#C96F3B`（搭配微光描边 `#E09A5C`），全页无任何高饱和霓虹色或额外装饰色。
  - 标题与风味引语采用衬线体（`Noto Serif SC` / `Songti SC`），正文采用干净的无衬线体（`Noto Sans SC` / `PingFang SC`），烘焙参数、海拔、批次号与价格账单统一采用等宽字体（`JetBrains Mono`）并开启 `font-variant-numeric: tabular-nums`。

---

## 二、候选图片逐一检视与选图决策

在动手编写任何 HTML/CSS 之前，通过 `read_file` 工具逐一检视了 `test/materials/images/01/` 下的全部 6 张候选图片（3 张 Hero 候选 + 3 张 Story 候选），并根据构图、明暗分布、负空间位置与色温做出如下选择：

### 1. Hero 主图选择（3 选 1）
- **`hero/01.webp`（淘汰）**：画面为咖啡豆从铸铁冷却盘倾泻而下的特写，视觉冲击力强，但高光集中在画面中央偏左的豆流上，明暗反差剧烈且缺乏稳定的大面积暗部负空间，若在左侧或中央叠放主标题「从生豆入锅到封袋寄出，只隔一个夜晚」，文字会直接压在豆流高光纹理上，破坏主体且影响可读性。
- **`hero/02.webp`（选用 → `output/assets/hero-roaster.webp`）**：画面主体位于右侧——铸铁烘焙机滚筒出豆口透出温暖的炉火琥珀光，熟豆落入冷却筛盘；而画面左侧约 45% 区域是深邃柔和的暗炭色工作室背景，天然形成极佳的**左文右景（Left Text, Right Subject）**负空间。主标题、副标题与行动按钮落在左侧暗部，完全不遮挡右侧炉口火光与咖啡豆细节，色温与全站暖炭琥珀色调高度契合。
- **`hero/03.webp`（淘汰）**：画面从室内向外俯瞰暮色群山，左侧前景为烘焙机局部剪影。虽然意境开阔，但与 `story/01.webp`（从暮色山谷回望亮灯烘焙间）在叙事视角上存在一定重复，且作为首屏对“新鲜出锅浅中烘”的近距离感官冲击不如 `hero/02.webp`。

### 2. Story 叙事配图选择（全部选用，构建三幕时间线）
- **`story/01.webp`（选用 → `output/assets/story-01-workshop.webp` · 第一幕「入夜寻山 · 烘焙间与产地起点」）**：蓝调时刻（Blue Hour）的山坡远景，右侧暖光亮起的烘焙工坊木屋与左侧远山云雾形成冷暖对比。左侧天空与山谷暗部恰好承接第一幕的品牌独白与第一支高海拔水洗豆「云雾水洗」。
- **`story/02.webp`（选用 → `output/assets/story-02-drum.webp` · 第二幕「炉火听爆 · 浅中烘的焦糖化临界」）**：烘焙机观察窗与黄铜取样勺的近景特写，焦点在于右侧观察窗内的暖橘炉火与铸铁机械肌理，完美对应一爆末至二爆前的火候把控，承接「火塘日晒」与「山脊蜜处理」两支甜感与醇厚度递进的豆单。
- **`story/03.webp`（选用 → `output/assets/story-03-vessel.webp` · 第三幕「按月封袋 · 当期烘焙预约单」）**：木桌上暖光笼罩的牛皮纸咖啡豆袋、白瓷杯测碗与袅袅升起的热气，主体偏右，氛围静谧温暖，作为全页收尾的订阅配置与收件预约单背景，给用户“刚刚装袋封口、等待贴单寄出”的真实收尾体验。

---

## 三、两轮录制与直接视觉观察记录

### 1. 核验方法说明（诚实边界）
- **截图直接检视**：使用 `read_file` 逐张检视了 `initial` 与 `final` 两轮录制生成的全部 8 张关键视口截图（`1440x900-01-start.png`、`02-third.png`、`03-two-thirds.png`、`04-end.png` 以及 `390x844-01-start.png`、`02-third.png`、`03-two-thirds.png`、`04-end.png`）。
- **视频连续帧与播放器双重核验**：由于 `read_file` 工具直接支持图像文件，为完整检查 `.webm` 滚动录像的动态连续性与播放表现，采取了双重验证：
  1. 使用 `ffmpeg` 从 `.webm` 录像中提取了 **1fps 全程 30 秒连续帧缩略图网格**（`1440x900-contact-sheet.png`、`390x844-contact-sheet.png`，覆盖 `t=0s` 至 `t=29s`）以及 **2fps 高清跨幕溶解过渡序列**（`1440x900-crossfade-1to2.png` 对应 `t=14.5s..17.5s`、`1440x900-crossfade-2to3.png` 对应 `t=21.0s..24.0s`），并通过 `read_file` 逐帧检视了画面过渡。
  2. 使用 Playwright 启动 Chromium 浏览器，将 `1440x900-scroll.webm` 与 `390x844-scroll.webm` 挂载到原生 HTML5 `<video>` 播放器中进行解码与寻帧播放，捕获播放器实景截图（`runs/e2-B-agy/observations/final/video-player-check.png`）并核对了 `videoWidth`、`videoHeight` 与 `readyState`。

---

### 2. 第一轮录制（`recordings/initial`）发现的具体问题

通过对 `runs/e2-B-agy/recordings/initial/` 的截图与连续帧网格进行视觉检查，定位出以下 **5 项具体视觉与交互缺陷**：

1. **桌面端 `1440x900-02-third.png` 夜空背景出现可见的圆形光晕边界**：
   - **现象**：当页面滚动到 `scrollY = 1094`（第一幕 `story-01-workshop.webp` 暮色山谷）时，由于背景左上方是深蓝黑色的纯净夜空，固定舞台的动态光晕层 `.stage-dynamic-glow`（原尺寸 `55vw`、无高斯模糊）在夜空中呈现出肉眼可见的圆弧形色阶边缘。
2. **桌面端 `1440x900-04-end.png` 右下角烘焙标尺与页脚产生空间挤压，移动端标尺遮挡标题区**：
   - **现象**：原 `.stage-roast-rail` 固定在视口右下角（`bottom: 32px; right: 44px`）。当滚动到底部 `04-end` 时，页脚 `.site-footer` 进入视口底部，与右下角固定标尺在水平与垂直方向上发生临近挤压；而在移动端 `390x844` 中，固定在顶部的标尺条又与手记面板顶部标题靠得太近。
3. **移动端 `390x844-04-end.png` 底部订阅卡片完全遮挡了第四幕 `story-03-vessel.webp` 背景**：
   - **现象**：移动端第三幕「按月封袋」面板因为两档方案卡片纵向堆叠且内边距偏大，在滚动到页面最底部（`04-end`）时，深色毛玻璃卡片从视口顶部一直铺到底部，导致第四幕极具氛围感的牛皮纸豆袋与热气杯测碗（`story-03-vessel.webp`）在移动端完全没有露出窗口。
4. **实心亮橙色主按钮（CTA）在暗调铸铁场景中略显生硬与数码感**：
   - **现象**：初版 Hero 主按钮「步入今夜烘焙间」和底部提交按钮「生成当期烘焙订阅单」使用了高明度实心橙色渐变（`linear-gradient(135deg, #C96F3B, #A85426)`），在深炭色胶片质感的实景照片旁显得像常规电商促销按钮，不够克制内敛。
5. **豆单参数卡缺少直观的浅中烘火候视觉锚点**：
   - **现象**：三支当期豆单（「云雾水洗」「火塘日晒」「山脊蜜处理」）虽然列出了四维参数与杯测描述，但读者在快速浏览时无法一眼看出三支豆子在“浅中烘光谱”上的细微火候递进关系（如水洗偏清亮一爆末、蜜处理偏醇厚一爆密后延展）。

---

### 3. 第二轮迭代修正（`recordings/final`）与前后对比验证

针对上述 5 项问题，在 [`runs/e2-B-agy/output/index.html`](file:///C:/Users/12296/orca/workspaces/FrontDesign/e2-B-agy/runs/e2-B-agy/output/index.html) 中实施了精确修正，并重新执行 `scroll-record.mjs` 生成 `recordings/final/`：

| 问题编号 | 第二轮具体代码修改 | `recordings/final` 视觉核验结果 |
| :--- | :--- | :--- |
| **1. 夜空光晕硬边** | 将 `.stage-dynamic-glow` 尺寸扩大至 `78vw × 78vw`（`max-width: 1120px`），改用四段超平滑径向衰减（`0% -> 28% -> 56% -> 76%`），并叠加 `filter: blur(44px)`。 | 检视 `final/1440x900-02-third.png` 与 `1440x900-crossfade-1to2.png`：深蓝夜空与远山过渡自然柔和，圆形硬边彻底消失。 |
| **2. 右下角标尺碰撞** | 将 `.stage-roast-rail` 移至桌面端视口右上角安全区（`top: clamp(20px, 3.4vh, 36px); right: clamp(28px, 4vw, 56px)`），移动端在小屏下隐藏独立悬浮标尺以免挤压正文。 | 检视 `final/1440x900-04-end.png`：右上角标尺与右上角导航微胶囊对齐，底部 `.site-footer` 干净独立，无任何重叠或挤压。 |
| **3. 移动端第四幕背景被遮挡** | 移动端顶部增加半透明实景取景窗渐变，将每幕之交的 `.scene-block` 顶部留白设为 `padding-top: 23vh`，并将移动端两档订阅方案改为紧凑双列并排卡片（`grid-template-columns: repeat(2, minmax(0, 1fr))`）。 | 检视 `final/390x844-04-end.png`：视口顶部约 `180px` 清晰露出 `story-03-vessel.webp` 的暖光牛皮纸豆袋与桌面器皿，下方完整容纳整个订阅配置、收件表单与页脚。 |
| **4. 实心亮橙按钮数码感** | 将 `.hero-cta` 与 `.submit-btn` 重构为**「铸铁焦糖微光按钮（Cast-Iron & Ember-Lit Gold Rim）」**：采用深暖胡桃炭渐变底色 `linear-gradient(180deg, rgba(46, 31, 22, 0.92), rgba(28, 19, 14, 0.96))`，配以 `1px solid rgba(224, 154, 92, 0.48)` 暖铜描边、顶部高光内阴影及左侧发光琥珀圆点。 | 检视 `final/1440x900-01-start.png` 与 `04-end.png`：按钮既具备清晰的可点击交互暗示，又完全融入半山烘焙间的暗调工业手作氛围，严格契合低饱和度色彩预算。 |
| **5. 豆单火候可视化与前景景深** | 为三支豆单新增 `.roast-meter`（浅中烘火候与风味刻度条：一爆初 → 焦糖化甜感段 → 二爆前），并在滚动引擎中为 `#panel-chapter-01..03` 增加随滚动位置轻微响应的 `translate3d` 与透明度景深过渡。 | 检视 `final/1440x900-02-third.png`、`03-two-thirds.png` 及连续帧过渡带 `1440x900-crossfade-1to2.png`、`2to3.png`：三支豆单的火候落点一目了然，跨幕滚动时前景手记与背景实景呈现细腻的呼吸感。 |

---

## 四、交互闭环与无障碍（`prefers-reduced-motion`）核验

除滚动录制外，通过 Playwright 自动化脚本与截图（`runs/e2-B-agy/observations/final/interactive-receipt-check.png`）对页面全部交互状态与无障碍降级进行了实测验证：

1. **豆单卡片 ↔ 底部订阅配置双向联动**：
   - 在第一幕或第二幕点击任意豆单卡片底部的「选为首期寄送豆款」按钮（`[data-select-bean]`），或在第三幕直接点击豆单胶囊按钮（`[data-pill-bean="云雾水洗" | "火塘日晒" | "山脊蜜处理"]`），卡片选中态（`.is-selected`）、按钮文案（`已选为首期寄送豆款`）与底部实时摘要（`#live-selection-summary`）同步更新。
   - 当切换为「单袋订阅（`¥62 / 月起`）」时，若原本选中了 2 支豆子，系统自动收敛为 1 支；切换回「双袋尝鲜组合（`¥118 / 月`）」时，若不足 2 支则自动补齐两支产地组合。
2. **三种配送节奏与方案实时同步**：
   - 切换「每 2 周 / 每月 / 每 6 周」三个配送节奏按钮（`.cadence-btn`）时，`aria-checked` 状态与底部实时订阅摘要（如 `已选：双袋尝鲜组合（¥118 / 月） ｜ 每 2 周 ｜ 首期：火塘日晒 + 山脊蜜处理`）即时无闪烁更新。
3. **表单校验与原位预约回执闭环**：
   - 未填写完整收件人或收件地址直接点击「生成当期烘焙订阅单」（`#submit-booking-btn`）时，内联错误提示（`#address-error`）立即显示并自动聚焦 `#subscriber-address`。
   - 填入完整收件信息后提交，原位平滑切换为「已登记当期烘焙订阅单」（`#booking-receipt`），完整展示所选方案、寄送节奏、首期豆款与收件信息，并提供「修改订阅偏好」（`#modify-booking-btn`）与「撤销本次登记」（`#cancel-booking-btn`）闭环操作。
4. **`prefers-reduced-motion: reduce` 降级保护**：
   - CSS `@media (prefers-reduced-motion: reduce)` 显式关闭了平滑滚动、粒子浮动与过渡动画；JavaScript 滚动引擎检测到 `prefersReducedMotion.matches` 时，停用缩放与视差位移，将跨幕背景切换改为按章节直接到位，确保全部叙事内容始终清晰可读。
5. **合规单次声明**：
   - 页脚底部包含且仅包含一次自然融入排版的说明文案：`说明：本页全部品牌介绍、三款豆子与订阅价格均为固定「样例」演示素材，非真实商家，无客户评价或销量数据；全页四幅场景图均为生成图像。`

---

## 五、交付文件清单

- 页面主文件：[`runs/e2-B-agy/output/index.html`](file:///C:/Users/12296/orca/workspaces/FrontDesign/e2-B-agy/runs/e2-B-agy/output/index.html)
- 静态图片资产：
  - `runs/e2-B-agy/output/assets/hero-roaster.webp`（源自 `test/materials/images/01/hero/02.webp`）
  - `runs/e2-B-agy/output/assets/story-01-workshop.webp`（源自 `test/materials/images/01/story/01.webp`）
  - `runs/e2-B-agy/output/assets/story-02-drum.webp`（源自 `test/materials/images/01/story/02.webp`）
  - `runs/e2-B-agy/output/assets/story-03-vessel.webp`（源自 `test/materials/images/01/story/03.webp`）
- 第一轮录制文件：`runs/e2-B-agy/recordings/initial/`
- 第二轮终版录制文件：`runs/e2-B-agy/recordings/final/`
- 自检报告：[`runs/e2-B-agy/self-review.md`](file:///C:/Users/12296/orca/workspaces/FrontDesign/e2-B-agy/runs/e2-B-agy/self-review.md)
