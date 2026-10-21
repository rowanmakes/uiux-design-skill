# 外部设计技能清单：借什么、不借什么

状态说明：
- **读过源码**：笔记 08 对入口文件做过阅读，但没有同题生成对照
- **按用途归档**：笔记 05 记录了用途，未单独评估
- **仅收藏**：只有链接，没有评估

仓库自带的盲评、评分、性能数据属于作者材料，未经复现不当作有效证明。上游会更新，下面的版本以笔记核对日期（2026-10-16）为准。

## 已读源码

| 技能 | 值得借鉴 | 边界与代价 |
| --- | --- | --- |
| [Impeccable](https://github.com/pbakaus/impeccable) · 快照 `6af45ac` · [入口](https://github.com/pbakaus/impeccable/blob/6af45ac9a5eb8792f033d3242f52e99812fd91fa/plugin/skills/impeccable/SKILL.md) | 产品事实（PRODUCT.md）与视觉系统（DESIGN.md）分开；按页面任务选模式（Persuade / Operate / Read / Experience）；critique（设计判断）与 audit（技术检查）分开；`bolder` 的含义是在现有系统内强化一个决定性变化并让周边退后，而不是堆效果 | 完整工作流含工具、确认与评审编排，不是轻量提示词。入口版本 4.6.0。裁剪使用要标"适配版" |
| [no-slop-design](https://github.com/agshinrajabov/no-slop-design) · 快照 `ae2ecc2` · [SKILL.md](https://github.com/agshinrajabov/no-slop-design/blob/ae2ecc20970ff982a7f2cc7b145d859e1df9ef21/SKILL.md) | 先确认市场、语言、已有品牌；参考要写出具体借鉴点；区分表达强度与交互深度；"依据 → 决策 → 可见结果"的追溯记录 | 参考数量、标志性交互、token 与检查流程等硬约束较重，按任务裁剪。作者的跨行业试验为自报，未复现 |
| [Taste Skill](https://github.com/Leonxlnx/taste-skill) · 快照 `f624f37` · [SKILL.md](https://github.com/Leonxlnx/taste-skill/blob/f624f37a8c650b9cc550253104925efe4c8de246/skills/taste-skill/SKILL.md) | 从真实主体、地点、材料、历史、动作中找概念；检查概念换成竞争者是否仍成立；截图后继续修；删模板装饰后补真实内容与有分量的构图 | 默认面向公开页面，不用于后台与应用屏幕。至少四张真实图片、至少八个移动元素、无渐变等是它的实现约束，不是质量定律。适合营销站/作品集的独立实验 |
| [brandkit](https://github.com/Leonxlnx/taste-skill/blob/f624f37a8c650b9cc550253104925efe4c8de246/skills/brandkit/SKILL.md) | 把品牌想法放进 Logo、字体、颜色、数字界面、实体应用多种场景里看 | 产物是品牌概览图，不是可实现的设计系统。默认"高端精致"倾向未必适合所有受众。方向探索时可选 |
| [Baoyu](https://github.com/JimLiu/baoyu-design) · [SKILL.md](https://github.com/JimLiu/baoyu-design/blob/main/skills/baoyu-design/SKILL.md) · [create-design-system](https://github.com/JimLiu/baoyu-design/blob/main/skills/baoyu-design/built-in-skills/create-design-system.md) · [frontend-design](https://github.com/JimLiu/baoyu-design/blob/main/skills/baoyu-design/built-in-skills/frontend-design.md) | 把品牌语气、资产、基础样式、组件、完整页面连起来，并记录素材来源与缺失；无既有品牌约束时的风格探索 | 适合已有材料的系统化整理，不把全套工具链变成每次必做项。其内置 frontend-design 偏"大胆独特"，与克制取向要按场景选 |

## 按用途归档

| 技能 | 用途 | 使用时机 |
| --- | --- | --- |
| [emil-design-eng](https://github.com/emilkowalski/skills/blob/main/skills/emil-design-eng/SKILL.md) | 设计工程与交互反馈、动效打磨 | 针对具体交互问题补充 |
| [fixing-accessibility](https://github.com/ibelick/ui-skills/blob/main/skills/fixing-accessibility/SKILL.md) | 可访问名称、键盘、焦点、表单、对比度 | 围绕受影响界面修复 |
| [fixing-motion-performance](https://github.com/ibelick/ui-skills/blob/main/skills/fixing-motion-performance/SKILL.md) | 动效卡顿、滚动、布局读写、合成层 | 已观察到性能问题时 |
| [Anthropic frontend-design](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md) / [canvas-design](https://github.com/anthropics/skills/tree/main/skills/canvas-design) | 官方前端设计与画布设计技能 | 笔记里"定位先于风格"等分析来自改编材料，与官方原版不同 |

## 2026-10-21 调研：读过主文件与关键参考

已吸收进 `taste.md` 的标"已吸收"。详细记录见仓库 `docs/research/2026-10-21-skill-survey.md`。均未做同题生成对照。

| 技能 · 快照 | 价值 | 状态 |
| --- | --- | --- |
| [oil-ui](https://github.com/oil-oil/oil-ui) · `7002e1a` | 模糊词翻译表、8 种首屏骨架、差异检验（比线框、眯眼看块面）、北极星与记忆点、示例数据要像真的、中文标题行高 | 已吸收一部分；差异检验和方向卡待做 |
| [huashu-design](https://github.com/alchaincyf/huashu-design) · `798c423` | 作者三轮失败教训（"加选项不加禁令"）、三方向生成法、素材分档、外观账本、色彩推导与低饱和、中文排印 | 已吸收一部分；外观账本和三方向生成待做 |
| [tasteful-ui-skill](https://github.com/DonkeyKing01/tasteful-ui-skill) · `159ccd4` | 苹果、Linear、xAI、Cursor 等网站的设计规格拆解（第三方提取，可能过时）；"参考是材料不是方向" | 已吸收 |
| [ui-craft](https://github.com/educlopez/ui-craft) · `49b7517` | 三种默认外观、换品牌自测、强调色预算、模糊 8px 测试、极简变体参数（动效偏保守，需调） | 已吸收 |
| [apple-design-skill](https://github.com/dickwu/apple-design-skill) · `914b6a3` | 苹果人机界面指南全文，只适合 iOS/macOS App；苹果官网风格不等于这份指南 | 做 App 时再用 |
| [ux-discovery-interviewer-skill](https://github.com/JacobLinCool/ux-discovery-interviewer-skill) · `305a4b9` | 需求模糊时的渐进式访谈 | 第 1 步可选 |
| [open-design-skill](https://github.com/sugarforever/open-design-skill) · `c41f8ab` | 大型品牌设计规格库的入口，需下载几百 MB | 暂不用 |
| [ComfyArt](https://github.com/jtydhr88/ComfyArt) · `910d422` | 本地 ComfyUI 设计画布；可作为本地生图后端，补足素材 | 有 ComfyUI 时考虑 |
| [agent-skills (uxuiprinciples)](https://github.com/uxuiprinciples/agent-skills) · `bc3f52d` | 免费版即普通模型评估，完整功能需付费 API 并上传界面描述 | 跳过 |
| [ui-ux-agent-skill-system](https://github.com/sergekostenchuk/ui-ux-agent-skill-system) · `ddaedd7` | 含 SEO、部署、安全的大型编排系统，太重 | 跳过 |
| [Figma-AI-Bridge](https://github.com/renfei-design/Figma-AI-Bridge) · [Figma-Context-MCP-Skill](https://github.com/HowardTangOvO/Figma-Context-MCP-Skill) · [agent-ready](https://github.com/Owl-Listener/agent-ready) | 只服务 Figma 工作流 | 用 Figma 时再看 |

## 组合原则

- 已有产品局部平淡：保持身份，选具体区块定向调整，再做真实页面评审。
- 从零做品牌站：no-slop-design 或 Taste Skill 二选一做主探索，不同时加载多套冲突的风格规则。
- 建设品牌系统：先确认定位、已有资产、产品场景，再借 Baoyu 的系统整理方法，brandkit 辅助看方向。
- 比较技能谁更有效：每个独立一组，固定简报、内容、模型与预算，记录实际加载的版本、截图、修改轮次。

## 2026-10-21 补充：用户指定的动效与检查来源

| 来源 · 快照 | 用途 | 注意 |
| --- | --- | --- |
| [Magic UI](https://github.com/magicuidesign/magicui) · `efe76fc` | 75 个动效组件，React + Tailwind + shadcn，依赖 motion | 按用途挑（`taste.md` 第 8 节）；不少组件是 AI 落地页的常见套路 |
| [impeccable](https://github.com/pbakaus/impeccable) · `89097b9`（4.7.0） | 交付前用 `critique`、`audit`、`polish` 检查 | 只用检查部分 |
| [taste-skill](https://github.com/Leonxlnx/taste-skill) · `6010f91` | 交付前用 `references/critique.md`（14 遍检查）看设计表达与细节 | 它要求至少 8 个移动元素、每个区块出场动画、至少 4 张真实图片，与用户"少用动效"冲突，不采用 |
| [awesome-design-md](https://github.com/VoltAgent/awesome-design-md) · `3b60532` | 84 份 DESIGN.md 种子；网站 getdesign.md 有 550 多份 | 三个方向用三份不同种子，防止撞脸 |
