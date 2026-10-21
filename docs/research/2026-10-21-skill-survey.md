# 外部设计技能调研 · 2026-10-21

对象：原始笔记（`2026-10-16-original-notes.md`）中尚未评估的 13 个仓库和 3 篇文章。
方法：浅克隆后阅读各仓库主文件和与目标相关的参考文件；没有逐个读完全部文件（huashu-design 约 400 个文件），没有做同题生成对照。仓库自带的效果图和评分属于作者材料，未复现。

## 核心结论

1. **用户的品味（留白、干净、简约、大气、干练）正好是模型的默认陷阱。** oil-ui、huashu-design、ui-craft 都独立记录了模型会滑向"安静高级"的几种固定外观。所以 Skill 不能只写这几个词，必须写成参数、骨架、素材和自检。
2. **西文的"高级参数"在中文上会出问题。** 大标题负字距和 1.05 的紧行高是为西文设计的；中文标题不加负字距，行高也要更大。
3. **约束太多会变无聊。** huashu-design 作者的第三轮教训：为了避开 AI 味加了很多禁令，结果三个方向都退成规整网格，用户嫌"太无聊"，输给了不加约束的旧做法。结论是加选项，不加禁令。
4. **v0.1 缺的六块：** 模糊词翻译、首屏骨架库、素材分档、差异检验、中文排印、外观账本。前四块和中文已写入 `taste.md`，差异检验的完整版和外观账本留到后续迭代。

## 逐个评估

### oil-ui · `7002e1a` · 最贴合
- 模糊词翻译表：高级、精致、克制、简洁都要翻成可观察的决定。
- 认品类、拆标杆：取 2–3 家真实截图，拆成 6–10 条看得见的要素，各写"是什么、为什么"。只拆出"干净、留白、一种强调色"说明没拆到位。
- 调性五刻度：能量、完成度、密度、分量、严肃度。
- 8 种首屏骨架；左右分栏是模型默认，一轮最多一次；"调性决定音量，骨架决定结构"。
- 差异检验：并排比线框、四项（骨架、字体、色彩、主视觉）至多一项相同、不按明暗分方向、眯眼看块面。
- 北极星、记忆点（一两处）、展示产品真实交付物、减法：每屏一个主角。
- 示例数据要像真的；中文多行标题行高 1.2–1.35；图标库也会趋同。

### huashu-design · `798c423` · 教训最值钱
- 明确写出 Claude 自己的默认审美和模板装饰清单。
- 三轮失败教训（只换皮 → 隐喻过猛 → 禁令太多变无聊），得出"加选项不加禁令"。
- 三方向生成：最佳设计师 / 同媒介真实参照（截图后拆规则）/ 风格轮盘；先 6 张缩略图再挑 3 张。
- 方向卡里的"胆量花在哪（唯一一处）"和"form 来自内容的哪里"。
- 素材分档：没有生图能力时用真图、程序化材质、数据即图像、字即图像。
- 外观账本：记录每次交付的样子，下次主动避开。
- 色彩：采样 → 收敛（oklch，2–3 个彩色）→ 一句话论证；低饱和带来印刷质感。
- 中文排印：字体地图、不要负字距、行高、标点、无斜体。
- 过头检验：去掉这个手法信息更清楚，它就是过头。

### tasteful-ui · `159ccd4`
- 收录了一批网站的设计规格拆解（来源 awesome-design-md），包括用户喜欢的苹果、Linear、xAI、Cursor。共同点：非纯黑纯白、单一强调色只给交互、紧凑标题、极淡边框、无装饰阴影渐变；每家各有一个独有决定。
- 数值为第三方提取，可能过时，未核实。
- "参考是材料不是方向"；"截图好看但产品更不清楚，就否决"。

### ui-craft · `49b7517`
- 三种默认外观；"换一个同类品牌会得到同样方案吗"自测。
- 强调色预算、每屏字重不超过 3 种、模糊 8px 测试、相邻层级差 1.5 倍。
- 极简变体的具体参数；它的动效强度偏低，与用户喜欢的动效不符，需要调整。
- 成熟界面"从不做"的清单。

### 其他
- **apple-design-skill** `914b6a3`：苹果人机界面指南，只适合原生 App。
- **ux-discovery-interviewer** `305a4b9`：渐进式需求访谈，可用于第 1 步。
- **open-design-skill** `c41f8ab`：大型规格库入口，较重。
- **ComfyArt** `910d422`：本地 AI 设计画布；可作为本地生图后端。
- **uxuiprinciples** `bc3f52d`：完整功能依赖付费 API 并上传数据，跳过。
- **ui-ux-agent-skill-system** `ddaedd7`：含 SEO、部署、安全的大型系统，太重，跳过。
- **Figma-AI-Bridge** `9570c3c`、**Figma-Context-MCP-Skill** `325a51f`、**agent-ready** `84ae3cd`：只服务 Figma 工作流。

### 三篇文章
- **rar.design · 7 条原则：** 给了具体像素值，但 F 型阅读和 7±2 的用法正是常见误用。
- **Moon-D：** 通用 UI/UX 入门内容，带公司推广。
- **Lovart：** 推广意味明显；有用的只有"可被验证的品牌承诺"和"Logo 与竞品并排，陌生人三秒能否分辨"，后者与"换名字测试"同理。

## 来源
- https://github.com/oil-oil/oil-ui
- https://github.com/alchaincyf/huashu-design
- https://github.com/DonkeyKing01/tasteful-ui-skill
- https://github.com/educlopez/ui-craft
- https://github.com/dickwu/apple-design-skill
- https://github.com/JacobLinCool/ux-discovery-interviewer-skill
- https://github.com/sugarforever/open-design-skill
- https://github.com/jtydhr88/ComfyArt
- https://github.com/uxuiprinciples/agent-skills
- https://github.com/sergekostenchuk/ui-ux-agent-skill-system
- https://github.com/renfei-design/Figma-AI-Bridge
- https://github.com/HowardTangOvO/Figma-Context-MCP-Skill
- https://github.com/Owl-Listener/agent-ready
- https://rar.design/posts/7-ui-ux-design-principles
- https://www.moon-d.com/blog/uiux-design.php
- https://www.lovart.ai/zh/blog/ai-branding-design
