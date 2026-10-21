# 2026-10-16

<aside>
📖

**UI/UX 设计研究笔记**

01–04 保留阅读摘记与个人思考；05 整理前端研究方法与公开技能来源；06–10 深化品牌方法、真实案例、技能筛选、执行流程与项目演练。

**快速阅读：**想看思想读 06–07；想选技能读 08；准备动手读 09–10。

</aside>

---

## GitHub 链接总索引 · 2026-10-20 补齐

**计数口径：**当前可见聊天中，用户直接提供了 **3 个 GitHub 链接**：ComfyArt、huashu-design、oil-ui。本文在本次整理前已有 **38 个不同的 GitHub URL，涉及 17 个仓库**；保留原文全部链接并补入上述 3 个后，共 **41 个不同 URL，涉及 20 个仓库**。

仓库主页、目录页和具体文件页是不同 URL；同一个 Markdown 链接的显示文本与跳转地址不重复计数。文档已有的研究引用与聊天中直接贴出的链接分开记录，不把全部研究引用都说成用户逐条发送的链接。用户还提到过 Matt Pocock，但没有直接提供他的 GitHub URL，因此不猜测补入，也不计入上述数量。

### 聊天中直接提供的 3 个链接

| 仓库 | 完整链接 | 在本项目中的讨论用途 |
| --- | --- | --- |
| ComfyArt | [jtydhr88/ComfyArt](https://github.com/jtydhr88/ComfyArt) | 讨论 Lovart 式设计 Agent、品牌成套物料与 HTML 落地思路时提供的参考 |
| huashu-design | [alchaincyf/huashu-design](https://github.com/alchaincyf/huashu-design) | 用户提出与现有设计 Skill 比较、吸收方法的参考 |
| oil-ui | [oil-oil/oil-ui](https://github.com/oil-oil/oil-ui) | 用户提出与现有设计 Skill 比较、吸收方法的参考 |

### 原文已收录的 17 个仓库

以下仓库的原始引用，以及对应的目录、SKILL.md、README 和固定版本文件链接，均继续保留在后文原位置。

| 仓库 | 完整链接 |
| --- | --- |
| ui-ux-agent-skill-system | [sergekostenchuk/ui-ux-agent-skill-system](https://github.com/sergekostenchuk/ui-ux-agent-skill-system) |
| ui-craft | [educlopez/ui-craft](https://github.com/educlopez/ui-craft) |
| open-design-skill | [sugarforever/open-design-skill](https://github.com/sugarforever/open-design-skill) |
| tasteful-ui-skill | [DonkeyKing01/tasteful-ui-skill](https://github.com/DonkeyKing01/tasteful-ui-skill) |
| ux-discovery-interviewer-skill | [JacobLinCool/ux-discovery-interviewer-skill](https://github.com/JacobLinCool/ux-discovery-interviewer-skill) |
| apple-design-skill | [dickwu/apple-design-skill](https://github.com/dickwu/apple-design-skill) |
| agent-skills | [uxuiprinciples/agent-skills](https://github.com/uxuiprinciples/agent-skills) |
| Figma-AI-Bridge | [renfei-design/Figma-AI-Bridge](https://github.com/renfei-design/Figma-AI-Bridge) |
| Figma-Context-MCP-Skill | [HowardTangOvO/Figma-Context-MCP-Skill](https://github.com/HowardTangOvO/Figma-Context-MCP-Skill) |
| agent-ready | [Owl-Listener/agent-ready](https://github.com/Owl-Listener/agent-ready) |
| impeccable | [pbakaus/impeccable](https://github.com/pbakaus/impeccable) |
| taste-skill | [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) |
| Anthropic skills | [anthropics/skills](https://github.com/anthropics/skills) |
| baoyu-design | [JimLiu/baoyu-design](https://github.com/JimLiu/baoyu-design) |
| no-slop-design | [agshinrajabov/no-slop-design](https://github.com/agshinrajabov/no-slop-design) |
| Emil Kowalski skills | [emilkowalski/skills](https://github.com/emilkowalski/skills) |
| ui-skills | [ibelick/ui-skills](https://github.com/ibelick/ui-skills) |

**项目方向提醒：**研究目标是精简、可复用的设计 Skill：从产品描述自主形成有辨识度的品牌及 HTML 表达。ComfyArt 是参考与试验对象，完善某一个官网不能代替验证设计能力。

**清理记录：**按用户要求，清除本项目生成的 `evals/`、`output/playwright/`、`.playwright-cli/` 测试产物，包括历轮样例、测试素材、截图、运行记录和汇总 HTML。研究文档、Skill 源文件及通用脚本保留；此前已提交的测试版本仍在 Git 历史中。本节只整理已有链接，没有进行新的仓库质量评估或链接可用性检查。

---

# 01 · UI/UX 设计原则

今天读了一个设计师的网站：[七个 UI/UX 设计原则](https://rar.design/posts/7-ui-ux-design-principles)。

> **我的收获：**他说的那些原则确实也存在，我也觉得很好。
> 

## 七个大原则 · 阅读摘记

| **原则** | **原笔记要点** |
| --- | --- |
| 格式塔法則 | 善用接近性、相似性、封閉性，讓大腦自動歸類你的設計元素 |
| 視覺層次 | 用大小、粗細、顏色三刀，讓重點自動浮出來 |
| Fitts' Law | 按鈕越大越近，使用者越容易點到 |
| Hick's Law | 選項越多決策越慢，幫使用者做減法 |
| Miller's Law | 人腦一次處理 7±2 個單位，資訊要分組 |
| F-Pattern | 使用者用 F 型掃描網頁，重點放左上、CTA 別藏右下 |
| 80/20 法則 | 把 80% 精力花在最重要的 20% 功能上 |

---

# 02 · 开源技能与 AI 设计方法

> **我的反思：**Kimi 提到的开源技能确实很不错，但是我以前都是胡乱拼凑的。
> 

[https://github.com/sergekostenchuk/ui-ux-agent-skill-system](https://github.com/sergekostenchuk/ui-ux-agent-skill-system)

[https://github.com/educlopez/ui-craft](https://github.com/educlopez/ui-craft)

[https://github.com/sugarforever/open-design-skill](https://github.com/sugarforever/open-design-skill)

[https://github.com/DonkeyKing01/tasteful-ui-skill](https://github.com/DonkeyKing01/tasteful-ui-skill)

[https://github.com/JacobLinCool/ux-discovery-interviewer-skill](https://github.com/JacobLinCool/ux-discovery-interviewer-skill)

[https://github.com/dickwu/apple-design-skill](https://github.com/dickwu/apple-design-skill)

[https://github.com/uxuiprinciples/agent-skills](https://github.com/uxuiprinciples/agent-skills)

[https://github.com/renfei-design/Figma-AI-Bridge](https://github.com/renfei-design/Figma-AI-Bridge)

[https://github.com/HowardTangOvO/Figma-Context-MCP-Skill](https://github.com/HowardTangOvO/Figma-Context-MCP-Skill)

[https://github.com/Owl-Listener/agent-ready](https://github.com/Owl-Listener/agent-ready)

[https://github.com/pbakaus/impeccable](https://github.com/pbakaus/impeccable)

[https://github.com/Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill)

https://github.com/anthropics/skills/tree/main/skills/canvas-design

https://github.com/anthropics/skills/tree/main/skills/frontend-design

## 六条使用技巧

1. **提供包含明确UX需求的详细提示词**
    
    清楚描述细节，包含目标使用者、平台、目标以及设计偏好。说明使用情境以及所需的特定的功能，有利于AI生成更加准确的线框图、使用者流程以及页面设计
    
2. **使用Ai快速生成并比较不同的设计版本**
    
    请Ai针对同一任务提出多种版面配置、导览方式与对应的界面设计。比较不同的版本，了解各自的优缺点，从而选出能带来最佳使用者体验的设计
    
3. **将AI生成的成功与使用者研究洞察结合**
    
    利用AI生成设计构思，但务必将其与真实的使用者研究和回馈进行比对。使用者洞察有助于确认设计是否真正解决了实际问题，这种做法让界面设计更加贴近实际需求、更以使用者为中心
    
4. **透过反复修改完善AI生成的线框图和原型**
    
    使用对应的figma以及对应的补充提示词进行小范围/小幅度的调整，改善AI生成的线框图。调整版面、间距、互动方式或者视觉元素，直到设计符合你的预期。反复改进有助于打造更完善的最终界面
    
5. **使用AI维持产品间的设计的一致性**
    
    利用AI建立可重复使用的组件，并在每一个界面遵守相同的设计系统。一致的色彩、字体、按钮与版面能提升使用者体验，同时也能减少重复性工作，加快设计流程
    
6. **审查AI设计的可用性与无障碍性**
    
    在任务中使用AI生成的设计之前，务必仔细检查。检查导览、回应性、易读性与无障碍性，确保设计对不同使用者都能良好运作。人工审查有助于打造更可靠、更友善的使用者的设计
    

---

# 03 · 从需求到可用性测试

来源：[UI/UX 设计流程](https://www.moon-d.com/blog/uiux-design.php?srsltid=AU7gw4W2gq7J1DsUcOI60-Mvwyk4CGt5CADNfOYe3N1cj7KQzV4RCRvn)

1. **了解需求**
    
    明白这一个产品要解决什么用户的什么问题。包含确认任务目标、目标受众、核心任务与成功指标。一定需要明白方向
    
2. **设计思考与分析（UX）**
    
    通过目标任务的想法、竞品分析与数据观察，建立使用者轮廓与旅程图，找出使用者在哪一步被卡住、情绪在哪里下滑
    
3. **功能地图与线框图 Wireframe（UX）**
    
    把需求转成页面结构。功能地图决定有哪些页面、页面之间怎么走；线框图则用灰阶方块排出每一个区块的位置与顺序，目前不谈颜色以及美感
    
4. **视觉稿 Mockup（UI）**
    
    套入品牌色、字体、图片与图示，做出完整的外观设计。这一个阶段会建立组件规范（按钮、表单、卡片），确保同一套界面在不同页面的一致性
    
5. **可互动原型 Prototype（UI/UX）**
    
    把静态画面串成可以点、可以跳转的模拟界面。原型让团队与客户实际走一遍流程、发现问题，比任何的纸上谈兵来得实际
    
6. **可用性测试以及优化**
    
    找一个完全不了解这一个产品、但是是这一个产品的目标人群来进行操作，观察他们在哪里迟疑、误解或放弃，再进行对应的设计订正。UI/UX 是循环而不是直线，测试后通常会回到前面的阶段再一次调整
    

## 六条实用可用性原则

1. **系统状态可视性：**使用者操作后要立即得到回馈。按了送出要有加入动画，成功要有对应的反馈提示，不能让使用者不知道现在发生什么事情
2. **与真实世界相符：**用使用者所熟悉的语言，不要使用内部术语。例如你的订单而不是交易实体记录
3. **使用者掌控自由：**提供复原与返回的路。填错资料可以改、走错页面可以退，别让人卡在死
4. **一致性与标准：**同样的功能使用同样的呈现方式。全站按钮长一样、术语用法一致，使用者才不用重新学习
5. **错误预防：**比起事后报错，不如一开始就避免使用者出错。例如日期用日历选择、格式即时检查
6. **辨识而并非回忆：**把选择直接show出来，不要逼使用者记住上一页的内容。多一点提示，少一点记忆负担

---

# 04 · 品牌设计

https://www.lovart.ai/zh/blog/ai-branding-design?srsltid=AU7gw4XZTMF91tnF1VeMpw9txQZ07-lHgToEKbitwxwZ6Xn6mSMYjn5r

---

# 05 · 前端研究精华

<aside>
💡

**最值得抽取的是一套能落到页面上的设计方法：先定义用户要做的决定，再用内容、视觉系统和交互状态帮助他完成，最后以真实页面验证。**

本节是对仓库方法的提炼与取舍，不是一次新完成的视觉对照实验，也不把“规则完整”当成“已经做出了优秀设计”。

</aside>

整理日期：2026年10月16日 · 原始研究材料的来源身份已脱敏

**来源范围：**本节提炼既有研究材料中的可复用设计方法，原始仓库、账号、版本及环境信息已移除。公开技能的上游链接见下方来源索引；改编方法与公开原版可能不同。

## 先看结论 · 六项最值得保留的方法

| **方法** | **值得保留的原因** | **最小落地成果** |
| --- | --- | --- |
| 定位先于风格 | 让视觉选择能解释为谁服务、帮助完成什么 | 一段设计方向与首个有效动作 |
| 参考拆解 | 借鉴信息组织与交互逻辑，减少拼贴 | 少量参考＋借鉴点＋不适用范围 |
| 品牌形成系统 | 把气质落实到文案、视觉、组件和真实资产 | 轻量品牌规范＋代表性页面 |
| 按问题选择技能 | 避免多套风格规则与工作流相互牵制 | 一个主方法＋必要的专项补充 |
| 状态与恢复设计 | 让界面覆盖真实使用中的等待、失败和退出 | 关键流程的状态与恢复路径 |
| 真实页面验收 | 把设计意图与用户实际看到、操作到的结果对照 | 当前版本截图＋真实操作记录 |

## 1. 定位先于风格：先回答用户来这里做什么

**仓库方法：**先明确主要用户、使用场景、第一次有价值的操作，以及做决定需要的信息，再确定语气、层级、构图和交互。现有产品应延续有效惯例；新项目也不必把“新奇”本身当目标。

**可迁移做法：**设计前写一段简短方向，例如：“面向第一次到访的用户，帮助他快速比较可选项并完成预约；首屏优先呈现差异、限制与下一步，气质清晰而可信。”随后再选择布局、字体与色彩。

**判断标准：**首屏有没有让用户更容易理解、比较和行动？Hero、大卡片、紧凑列表都只是手段，不能因为某种样式常见就一律禁止。

研究依据（来源已脱敏）：Frontend Design · Positioning / Content and composition

## 2. 研究参考：拆解决策逻辑，不只收集好看的截图

**仓库方法：**按产品任务和参考页面的实际范围选择少量案例，提取层级、内容组织和交互原则。营销首页不能证明登录后的工作流合理；文字分析也不能冒充真正看过页面。

**可迁移做法：**每个参考只记录三个问题：

- **借什么：**例如比较信息的顺序、主次操作的关系、长内容的排版。
- **为什么：**它如何降低理解成本，或强化产品需要表达的气质？
- **不借什么：**不适合本产品的品牌配色、业务假设与页面用途。

当用户需要选择真实地点、商品或人物时，图片应帮助识别实际对象。装饰性插画即使注明“示意”，也未必能满足辨认和比较的需求。

研究依据（来源已脱敏）：Frontend Design · References / Recognizable content · Visual Director · Imagery and user decisions

## 3. 品牌系统：把“整体感觉”落实到可重复使用的规则

**仓库方法：**Baoyu 的设计系统方法同时覆盖内容语气、字体与颜色、间距与层次、真实资产、可复用组件和完整页面示例；并要求记录素材来源、缺失与替代情况。

**我的提炼建议：**品牌研究先保留五层，不必一次建设庞大的组件库：

| **层次** | **需要说清楚的事** |
| --- | --- |
| 定位与语气 | 为谁服务；希望建立何种信任；文案怎么称呼用户、描述行动 |
| 视觉基础 | 字体层级、色彩语义、间距、边框、圆角和图标风格 |
| 内容与资产 | 哪些地方必须使用真实图片；图片裁切方式；Logo 与素材来源 |
| 组件与状态 | 按钮、表单、反馈与导航中实际复用的部分，以及必要状态 |
| 代表性页面 | 把上面规则放进真实内容与完整页面，确认组合后的效果 |

仓库工作流还规定颜色由统一的语义 token 管理。**可跨环境保留的是“一个主题来源、按用途命名”这一原则**；shadcn、OKLCH、特定检测命令属于原环境的具体实现，不应成为任何项目都必须使用的技术栈。

研究依据（来源已脱敏）：Create Design System · Frontend Workflow · Color has one source

## 4. 技能选择：一个主方法，必要时补专项能力

**仓库方法：**默认一个主设计方法，辅以零到两个与问题直接相关的技能；小修复不重启完整设计探索，也不为了套用技能更换已有框架。

| **当前任务** | **仓库中的选择** | **使用边界** |
| --- | --- | --- |
| 新页面、品牌站、显著重构 | frontend-design | 以定位、内容和实际渲染结果决定视觉方案 |
| 高保真稿、交互原型、设计系统 | [baoyu-design](https://github.com/JimLiu/baoyu-design/blob/main/skills/baoyu-design/SKILL.md) | 只读当前交付需要的方法，不强制所有任务先做原型 |
| 交互反馈与动效打磨 | [emil-design-eng](https://github.com/emilkowalski/skills/blob/main/skills/emil-design-eng/SKILL.md) | 针对具体交互问题补充 |
| 键盘、焦点、表单可访问性 | [fixing-accessibility](https://github.com/ibelick/ui-skills/blob/main/skills/fixing-accessibility/SKILL.md) | 围绕受影响的界面修复 |
| 动效卡顿、滚动与测量开销 | [fixing-motion-performance](https://github.com/ibelick/ui-skills/blob/main/skills/fixing-motion-performance/SKILL.md) | 围绕已观察到的性能问题排查 |
| 导航、核心流程、状态和响应式梳理 | ui-ux-design-audit | 可作设计前输入；自查不能自动充当独立验收 |

<aside>
🧭

**两套风格指导存在取向差异，应按场景选择。**

Baoyu 内置 frontend-design 面向没有既有品牌约束的设计，强调大胆方向、记忆点与独特字体；仓库定制的 frontend-design 则明确不以新奇为目标，不按样式家族一刀切。

**我的建议：**探索新品牌时用前者扩展候选方向；为具体产品定稿时，用用户任务、内容可信度和既有品牌约束做取舍。不要把“必须独特”和“必须克制”同时写成全局硬规则。

</aside>

研究依据（来源已脱敏）：Skill Routing · Frontend skill selection · Baoyu 的风格探索指导 · 改编版 Frontend Design

## 5. 完整交互：把等待、错误、取消与恢复一起设计

**仓库方法：**设计前梳理导航、核心流程、信息层级、组件选择、适用状态、响应式行为和恢复方式；只覆盖该流程实际需要的状态。

**可迁移做法：**围绕主动作记录“触发 → 系统反馈 → 结果 → 下一步”。例如预约提交：

- **等待：**明确正在提交，合理处理重复点击。
- **失败：**说明哪里失败，以及重试、修改或退出的可用路径。
- **成功：**确认实际完成的动作，给出后续入口。
- **对话框：**检查焦点进入、Tab 范围、Escape 关闭、关闭后焦点返回与滚动恢复。

按钮文字必须对应实际结果，视觉隐喻不能改变业务含义：做成票券形状的推荐卡，不应让人误以为已经获得一张真实票券。

研究依据（来源已脱敏）：UI UX Design and Audit · Frontend Workflow · Affected-state acceptance · Frontend Design · Words describe the actual product

## 6. 真实页面验收：能运行、看起来好、用起来顺要分别判断

**仓库方法：**先用有代表性的真实内容检查宽屏与窄屏，再推广布局。覆盖长文案、内容较多的页面、固定导航占位，以及与主任务相关的已登录界面。

**最值得保留的证据边界：**

- 截图证明可见状态；键盘操作、动画和失败恢复需要实际操作证据。
- 设计文档记录实现意图，不能替代原始需求；改文档不能消除未满足的用户目标。
- 功能通过与视觉、表达问题可以同时存在；token 一致、组件齐全、检测零报错都不等于设计优秀。
- 评审意见写清“位置、观察到的问题、用户后果、修复方向”，将必须修复的缺陷与审美偏好分开。
- 保存证据时标明版本、页面、视口和状态，避免用旧截图说明新版本；修复后检查受影响部分。

**我的判断：**这套方法最有价值的地方，是让“平平无奇”进一步落到可讨论的问题——字体层级是否弱、真实内容是否不足、构图是否缺乏节奏、关键动作是否淹没。它能提高迭代质量，但不能凭规则本身保证惊艳。

研究依据（来源已脱敏）：Frontend Design · Rendered experience · Visual Director · Review criteria · Frontend Workflow · Evidence

## 可以直接复用 · 一页设计任务卡

以下为本次根据仓库方法整理的轻量模板，并非仓库原文。

<aside>
✍️

**目标用户与场景：**谁在什么情况下使用？

**核心任务：**这一次需要完成什么？首次有效动作是什么？

**决策信息：**用户行动前必须看懂哪些差异、限制和证据？

**品牌方向：**气质、文案语气与需要延续的已有规则。

**参考依据：**少量参考；分别说明借鉴点和不适用范围。

**内容与资产：**真实文案、图片、长内容与缺失素材的处理。

**必要状态：**正常、空、等待、错误、成功及适用的取消／恢复。

**验收证据：**代表性宽窄屏截图、关键操作、版本与视口记录。

</aside>

## 抽取边界 · 保留方法，按项目决定实现

**优先保留：**定位与参考拆解、品牌与内容系统、技能选择原则、状态与恢复、真实页面评审。

**按需迁移：**主题 token、可复用组件、动效与无障碍检查，适配目标项目已有技术栈。

**不作为通用前端研究照搬：**OMP 模型别名、代理角色、checkpoint／receipt、特定目录路径和强制多阶段审批。仓库本身已提醒：历史工作流不能给 lean 路径增加额外关卡。

## 技能源仓库与原文入口

核对日期：2026年10月16日。上游链接用于查阅公开原项目与当前文档；原始研究材料的来源身份已脱敏。上游后续更新可能与本次研究采用的内容不同。

| **技能** | **原仓库** | **技能原文／入口** | **与本文的关系** |
| --- | --- | --- | --- |
| baoyu-design | [JimLiu/baoyu-design](https://github.com/JimLiu/baoyu-design) | [SKILL.md](https://github.com/JimLiu/baoyu-design/blob/main/skills/baoyu-design/SKILL.md) · [技能目录](https://github.com/JimLiu/baoyu-design/tree/main/skills/baoyu-design) | 高保真设计、交互原型与设计系统；本节引用的 Baoyu 方法来自这一项目。 |
| frontend-design | [anthropics/skills](https://github.com/anthropics/skills) | [Anthropic 官方 SKILL.md](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md) | 官方同名技能入口。本文“定位先于风格”等分析采用经过改编的研究材料，其来源已脱敏，与官方原版内容不同。 |
| emil-design-eng | [emilkowalski/skills](https://github.com/emilkowalski/skills) | [SKILL.md](https://github.com/emilkowalski/skills/blob/main/skills/emil-design-eng/SKILL.md) | Emil Kowalski 的设计工程与交互打磨方法。 |
| fixing-accessibility | [ibelick/ui-skills](https://github.com/ibelick/ui-skills) | [SKILL.md](https://github.com/ibelick/ui-skills/blob/main/skills/fixing-accessibility/SKILL.md) | 可访问名称、键盘操作、焦点、表单和对比度检查。 |
| fixing-motion-performance | [ibelick/ui-skills](https://github.com/ibelick/ui-skills) | [SKILL.md](https://github.com/ibelick/ui-skills/blob/main/skills/fixing-motion-performance/SKILL.md) | 动效性能、布局读写、滚动、合成层与渲染开销检查。 |
| ui-ux-design-audit | 本地改编，未确认公开上游 | 改编技能及来源说明（原始链接已移除） | 本地改编方法，未确认公开上游；原始文件与个人来源信息已移除。 |

### Baoyu · 按用途直接阅读

- **项目说明：**[中文 README](https://github.com/JimLiu/baoyu-design/blob/main/README.zh-CN.md)。
- **总入口与完整方法：**[SKILL.md](https://github.com/JimLiu/baoyu-design/blob/main/skills/baoyu-design/SKILL.md) · [system-prompt.md](https://github.com/JimLiu/baoyu-design/blob/main/skills/baoyu-design/system-prompt.md)。
- **品牌与设计系统：**[create-design-system.md](https://github.com/JimLiu/baoyu-design/blob/main/skills/baoyu-design/built-in-skills/create-design-system.md)。
- **无既有品牌约束时的风格探索：**[frontend-design.md](https://github.com/JimLiu/baoyu-design/blob/main/skills/baoyu-design/built-in-skills/frontend-design.md)。
- **其他内置方法：**[built-in-skills 目录](https://github.com/JimLiu/baoyu-design/tree/main/skills/baoyu-design/built-in-skills)。

**补充方法：**本文引用的技能路由、前端工作流和视觉评审规则来自既有研究材料，来源已脱敏；这些改编方法不应直接归属于同名公开技能。

- 研究材料阅读顺序（来源已脱敏）
    1. Frontend Design：定位、参考、内容与渲染评审
    2. Create Design System：品牌语气、资产、组件与完整页面
    3. Skill Routing：按任务选择方法
    4. UI UX Design and Audit：流程、状态与问题卡
    5. Visual Director：面向用户目标的视觉评审
    6. Frontend Workflow：状态、主题与证据边界
    7. Baoyu Frontend Design：无既有品牌约束时的风格探索
    8. 公开技能入口见上方来源表；原始配置与版本信息已移除。

---

# 06 · 品牌方法深化：把定位变成界面决策

<aside>
🧭

**本轮最值得保留的思想：品牌应同时影响“说什么、展示什么、如何行动”，并允许同一个产品在不同任务中有不同的表达强度。**

新增内容分为：品牌方法 → 四个真实案例 → 技能筛选 → 八步执行流程 → 假想项目演练。原文观点、来源事实与本次建议分别标明。

</aside>

研究日期：2026年10月16日。通过 Exa 从品牌方法、产品改版案例、开源设计技能三个方向检索，累计检查 34 条候选结果（含重复），再对入选的一手规范、团队复盘及技能源码定向阅读。案例分析依据公开文字与规范，不是本轮完成的页面截图测评；技能评价依据源码，尚未进行同题生成对照。

## 1. 从用户的替代方案找定位，再定义品牌表达

April Dunford 的方法先问“没有这个产品，客户会怎么做”，再分析差异能力、客户价值、最适合的客户和市场类别。它提供的是产品定位方法，不能直接替代品牌视觉设计。

**本次建议：**用它给品牌设计准备可信输入。先弄清楚为什么用户选择你，再决定页面要突出什么。

| **问题** | **必须留下的答案** | **会影响哪些界面决策** |
| --- | --- | --- |
| 没有我们，用户怎么办？ | 现有工具、人工流程或什么都不做 | 首屏应解释哪种改变，比较什么 |
| 我们真正不同在哪里？ | 可展示的能力与证据；假设单独标记 | 演示内容、案例、功能优先级 |
| 这种差异对谁最有用？ | 具体人群、使用场景与顾虑 | 信息密度、语言、信任线索 |
| 用户因此获得什么？ | 能感知的结果，避免空泛价值词 | 标题、流程顺序、行动按钮 |
| 怎样让用户迅速理解类别？ | 让目标用户产生正确预期的描述 | 导航名称、功能命名、页面叙事 |

**停止条件：**已有足够事实支持当前设计时就进入下一步；不要为了一张设置页重做整套品牌战略。

来源：[April Dunford · A Quickstart Guide to Positioning](https://www.aprildunford.com/post/a-quickstart-guide-to-positioning)

## 2. 给品牌原则配“界面动作”和“边界”

“专业、温暖、有创造力”只能指方向。要让实现者作出一致选择，还需要说明这些词在界面上意味着什么。

以下是**本次整理的转译方法**，不是某一品牌的原规范：

| **品牌原则** | **可观察的界面行为** | **不应推导出的做法** |
| --- | --- | --- |
| 可信 | 标明证据与来源；结果、限制、费用和失败原因能被找到 | 把全站染成蓝色，或编造客户 Logo |
| 温暖 | 用熟悉的语言解释下一步；保留用户输入；恢复路径清楚 | 错误时开玩笑，或每个角落都放吉祥物 |
| 大胆 | 让主张、关键素材与重要行动有足够视觉分量 | 每个元素同时放大、加动画或抢占注意 |
| 高效 | 减少无关信息；常用操作稳定；高频动作反馈及时 | 删掉必要解释，或把所有内容挤成小字 |
| 有文化气质 | 从真实对象、材料、语言与背景中选择素材 | 给任何行业套上同一套复古衬线字体 |

**实用检验：**删掉 Logo 后，用户是否还能从内容、版式与交互认出这个产品？再把名字换成竞争者：如果几乎无需改动，方向可能仍停留在行业模板。这个检验只用于找问题，不是独特性的量化证明。

## 3. 固定品牌身份，按任务调整表达

可以稳定保留品牌语气、核心色彩角色、字体系谱、图标语言和素材原则；同时让标题尺度、内容密度、动效强度随用户任务变化。

**本次综合：**同一个品牌可以有以下四种页面任务，不需要整站只有一种“响度”：

| **页面任务** | **用户此刻需要什么** | **设计重点** |
| --- | --- | --- |
| 了解并决定 | 理解价值、判断是否适合、采取行动 | 清楚主张、实际证据、视觉记忆点 |
| 操作 | 快速准确地完成工作 | 稳定布局、可扫描的信息、完整状态 |
| 阅读 | 建立理解、定位内容、回查依据 | 标题层级、行长、目录、引用 |
| 欣赏作品 | 直接看到作品并感受其特点 | 作品占据主导，界面适度退后 |

这个区分与 Impeccable 的 Persuade／Operate／Read／Experience 模式，以及 Carbon 的 productive／expressive 思路相呼应。它们是设计判断框架，不能替代用户研究。

来源：[Impeccable · Modes](https://github.com/pbakaus/impeccable/blob/6af45ac9a5eb8792f033d3242f52e99812fd91fa/plugin/skills/impeccable/SKILL.md) · [Carbon · Typography strategies](https://www.carbondesignsystem.com/building-blocks/foundations/typography/style-strategies)

## 4. 先让代表性页面成立，再提炼设计系统

**本次建议：**先选一个能体现品牌的页面和一个能暴露使用问题的页面，以真实内容验证方向。之后再提取主题、组件和状态规则，减少把尚未成熟的设计过早标准化。

设计系统至少要回答：哪类内容用哪种层级；图片如何选与裁；主要、次要、危险操作如何区分；错误与成功怎么说；宽窄屏如何调整。色板和组件清单只是其中一部分。

参考：[Baoyu · Create design system](https://github.com/JimLiu/baoyu-design/blob/main/skills/baoyu-design/built-in-skills/create-design-system.md) · [Linear 改版复盘](https://linear.app/now/how-we-redesigned-the-linear-ui)

---

# 07 · 四个真实案例：借鉴决策，不照搬外观

| **案例** | **最值得借鉴的决策** | **适用问题** |
| --- | --- | --- |
| Wise | 常规阅读与品牌高光使用不同字体表达 | 想有记忆点，又不能妨碍操作 |
| Mailchimp | 品牌声音稳定，语气随用户情绪调整 | 文案有个性，但错误反馈不合时宜 |
| IBM Carbon | productive 与 expressive 按任务组合 | 品牌站与复杂工具难以共用一套尺度 |
| Linear | 在多类真实视图中验证改版方向 | 首页好看，进入产品后层级和密度失控 |
- 案例 A · Wise：把个性放在有意义的时刻
    
    **官方规范：**大多数标题、正文和产品内容使用 Inter；Wise Sans 用于更有表现力的标题，以及成功、进度、功能介绍等关键时刻。国际字形需节制使用，避免损害可读性。
    
    **值得借鉴：**区分日常操作和品牌高光，让个性有出现的位置与频率。独特性来自组合与使用方式，不是某一个字体名称。
    
    **本次应用示例：**操作表单采用清楚稳定的正文系统；完成重要任务后，再用品牌标题和适量动效确认成就。普通保存不必每次庆祝。
    
    **不能照搬：**Wise 的字体、绿色和国际字形属于它的身份；应借鉴角色分配，不复制资产。
    
    来源：[Wise Typography](https://wise.design/foundations/typography) · [Wise Motion](https://wise.design/foundations/motion-system)
    
- 案例 B · Mailchimp：同一个品牌，不用同一种语气应对所有状态
    
    **官方规范：**voice 相对稳定，tone 随情境和读者情绪变化；清楚比好笑更重要，不必强行幽默。
    
    **值得借鉴：**把语气规范写到实际状态中，而不只列“友好、活泼”两个形容词。
    
    **本次自拟示例：**成功时说“已发布，可以分享了”；等待时说“正在上传，完成后会通知你”；失败时说“上传未完成，已保留你的内容，可以重试”。这些不是 Mailchimp 原文，具体承诺必须与真实功能一致。
    
    **不能照搬：**不能把品牌幽默套进付款失败、数据丢失等让用户紧张的时刻。
    
    来源：[Mailchimp · Voice and Tone](https://styleguide.mailchimp.com/voice-and-tone/)
    
- 案例 C · IBM Carbon：任务模式比“统一大小”更重要
    
    **官方规范：**productive 字体服务输入、表单、控制等专注任务；expressive 字体服务阅读、探索和编辑式页面。两者可以在同一页面中形成对比，但一个独立任务区内部的层级应保持一致。动效也区分效率型与表达型。
    
    **值得借鉴：**官网可以表达充分，官网内的复杂配置器仍可采用紧凑清楚的操作样式；产品首页也可以留出较有表达力的欢迎区域。
    
    **本次应用示例：**研究报告的大标题和案例图负责引导阅读；旁边的筛选器采用稳定的小尺度，不与内容争夺视觉重心。
    
    **不能照搬：**不是把所有页面切成“14px／16px”两档，也不是越小越高效。
    
    来源：[Carbon Typography](https://www.carbondesignsystem.com/building-blocks/foundations/typography/style-strategies) · [Carbon Motion](https://www.carbondesignsystem.com/building-blocks/foundations/motion/overview)
    
- 案例 D · Linear：让设计方向经受真实内容的压力
    
    **团队复盘：**2024 年改版围绕应用框架、对齐、层级和导航密度展开；团队在多种环境、主题及列表／看板等视图中测试方向，再逐步实施。其标题使用 Inter Display，其他文字继续使用 Inter。
    
    **值得借鉴：**选最容易暴露问题的页面验证方向，而不仅展示内容最少、最整齐的首屏。品牌一致性也来自长期稳定的操作秩序与细节。
    
    **本次应用示例：**在扩展设计前，用长中文标题、多筛选项、空数据和大量结果检查排版；对照旧版观察哪些任务变好、哪些受到影响。
    
    **不能照搬：**这是团队过程的公开复盘，不是本次验证过的转化率或效率提升结论。
    
    来源：[How we redesigned the Linear UI · 2024-03-28](https://linear.app/now/how-we-redesigned-the-linear-ui)
    

<aside>
💡

**对“反 AI 模板规则”的修正：**Wise 与 Linear 都给出了继续使用 Inter 的具体理由。因此“禁用 Inter、卡片、渐变”等可以作为某个技能的风格偏好或提醒，但不能直接升级为所有品牌的质量标准。评审仍应回到用户任务、品牌约束和实际画面。

</aside>

---

# 08 · 新增技能筛选：哪些值得试，哪些要改造

**筛选依据：**是否解释设计选择、是否能使用真实内容与参考、是否尊重现有品牌、是否检查渲染结果、是否明确适用范围和代价。没有按星数排名。

**阅读结论：**优先研究 Impeccable 的任务分型与评审方法、no-slop-design 的研究与决策记录。Taste Skill 适合作为独立的品牌站探索候选；brandkit 是视觉方向图工具。原有 Baoyu 继续承担设计系统与原型方法的位置。

| **技能** | **值得借鉴** | **适用边界与本次取舍** |
| --- | --- | --- |
| [Impeccable](https://github.com/pbakaus/impeccable/blob/6af45ac9a5eb8792f033d3242f52e99812fd91fa/plugin/skills/impeccable/SKILL.md) | 产品事实与视觉方向分开；页面任务分型；设计评审和技术检查分开 | 适合定向改进与评审。完整工作流含工具、确认与评审编排，不能把它看成一段轻量提示词。 |
| [no-slop-design](https://github.com/agshinrajabov/no-slop-design/blob/ae2ecc20970ff982a7f2cc7b145d859e1df9ef21/SKILL.md) | 市场与语言研究、带注释参考、从依据追溯设计选择 | 适合系统探索。部分强制数量、交互与 token 规定较重，迁移时按任务裁剪。 |
| [Taste Skill](https://github.com/Leonxlnx/taste-skill/blob/f624f37a8c650b9cc550253104925efe4c8de246/skills/taste-skill/SKILL.md) | 从项目特有材料找概念；让概念贯穿首屏、内容段落和收尾 | 默认技能明确面向公开页面，不用于后台。固定图片与动画下限不适合所有场景。 |
| [brandkit](https://github.com/Leonxlnx/taste-skill/blob/f624f37a8c650b9cc550253104925efe4c8de246/skills/brandkit/SKILL.md) | 把品牌想法放到多种应用场景中观看 | 产物是品牌概览图，不能代替可实现的设计系统或真实产品验证。 |
| [Baoyu](https://github.com/JimLiu/baoyu-design/blob/main/skills/baoyu-design/SKILL.md) | 把品牌语气、资产、基础样式、组件和完整页面连起来 | 沿用前文分析；适合已有材料的系统化整理，不把全套工具链变成每次必做项。 |
- 深入看 · Impeccable：最值得拿出的是判断结构
    
    **源码中值得保留的部分：**`PRODUCT.md` 记录稳定产品事实，`DESIGN.md` 记录视觉系统；按页面任务选模式；`critique` 做设计判断，`audit` 做技术检查。
    
    **“更大胆”的具体含义：**它的 `bolder` 方法强调在现有系统内加强目标区块的表达，强化一个决定性变化，并让周边退后，而不是继续堆效果。
    
    **迁移代价：**本次读到的入口版本为 4.6.0，完整评审包含独立评估与检测工具流程，init 也包含确认步骤。轻量项目可以提炼方法，但若裁剪执行流程，应标明是适配版，不宣称完整执行了原技能。
    
    [原仓库](https://github.com/pbakaus/impeccable) · [本次入口](https://github.com/pbakaus/impeccable/blob/6af45ac9a5eb8792f033d3242f52e99812fd91fa/plugin/skills/impeccable/SKILL.md) · [init](https://github.com/pbakaus/impeccable/blob/6af45ac9a5eb8792f033d3242f52e99812fd91fa/plugin/skills/impeccable/reference/init.md) · [critique](https://github.com/pbakaus/impeccable/blob/6af45ac9a5eb8792f033d3242f52e99812fd91fa/plugin/skills/impeccable/reference/critique.md) · [bolder](https://github.com/pbakaus/impeccable/blob/6af45ac9a5eb8792f033d3242f52e99812fd91fa/plugin/skills/impeccable/reference/bolder.md)
    
- 深入看 · no-slop-design：让每项视觉选择能追溯到理由
    
    **源码中值得保留的部分：**先确认市场、语言与已有品牌；参考需要写出具体借鉴点；区分表达强度与交互深度；把版式、字体、素材选择连回简报。
    
    **值得警惕的部分：**原文包含每个方向的参考数量、说服型页面的标志性交互、token 与检查流程等硬约束。这些是该技能的工作方式，不是普遍证明过的最优解。
    
    **本次取舍：**优先抽取“依据 → 决策 → 可见结果”的记录方式；不把必须做一个特别交互作为所有页面的验收门槛。作者发布的跨行业试验属于作者报告，本次没有独立复现其评分。
    
    [原仓库](https://github.com/agshinrajabov/no-slop-design) · [本次 SKILL.md](https://github.com/agshinrajabov/no-slop-design/blob/ae2ecc20970ff982a7f2cc7b145d859e1df9ef21/SKILL.md) · [方法与作者试验说明](https://github.com/agshinrajabov/no-slop-design/blob/ae2ecc20970ff982a7f2cc7b145d859e1df9ef21/README.md)
    
- 深入看 · Taste Skill：能扩展方向，也带着强烈的作者风格
    
    **源码中值得保留的部分：**从真实主体、地点、材料、历史或动作中找概念；检查这个概念换成竞争者后是否仍成立；浏览器截图后继续修正。删掉模板装饰以后，还要补上真实内容与有分量的构图。
    
    **重要限制：**默认 v2 明确不面向后台和应用屏幕。源码规定至少四张真实图片，并以至少八个移动元素作为动效检查下限；还包含无渐变等强烈风格规则。这些数量是它的实现约束，不是设计质量定律。
    
    **本次取舍：**可用于营销站／作品集的独立实验组。保留“主体概念”和“真实素材”的思想；用于通用产品设计时，需要重新判断数量与风格要求。
    
    [原仓库](https://github.com/Leonxlnx/taste-skill) · [本次 SKILL.md](https://github.com/Leonxlnx/taste-skill/blob/f624f37a8c650b9cc550253104925efe4c8de246/skills/taste-skill/SKILL.md)
    
- 深入看 · brandkit：适合展示方向，不等于完成品牌系统
    
    **源码定位：**生成一张品牌概览图，组合 Logo、字体、颜色、数字界面和实体应用等场景；已有品牌应保留已提供的身份元素。
    
    **本次判断：**用于早期比较方向很有帮助，但默认“高端、精致”的倾向未必适合所有受众。看起来完整的品牌板，仍缺少可读性、交互状态、组件行为与素材可交付性的验证。
    
    **使用位置：**方向探索时可选；选定方向后仍需把它转译成真实文字、资产、token 和页面。若只要修复表单，不必额外生成品牌板。
    
    [所属原仓库](https://github.com/Leonxlnx/taste-skill) · [本次 brandkit SKILL.md](https://github.com/Leonxlnx/taste-skill/blob/f624f37a8c650b9cc550253104925efe4c8de246/skills/brandkit/SKILL.md)
    

## 推荐的组合方式

- **已有产品，局部显得平：**保持现有身份，选具体区块，用定向布局／字体／表达调整解决问题，再做真实页面评审。
- **从零做品牌站：**把 no-slop-design 或 Taste Skill 选作主探索方法；品牌事实与验收要求保持清楚，不同时加载多套互相冲突的风格规则。
- **建设品牌系统：**先确认定位、已有资产与产品场景，再用 Baoyu 的系统整理方法；brandkit 可辅助看方向。
- **要比较技能谁更有效：**各自独立一组；固定简报、内容、模型与预算，记录实际加载的版本、截图和修改轮次。本轮只完成研究与整理，没有产生新的实验结果。

---

# 09 · 可执行流程：从品牌定位到真实页面

以下是**本次综合建议**，不是任何一个技能的原样流程。用于新品牌站或较大改版；局部维护只执行受影响的步骤。

| **步骤** | **具体动作** | **留下什么** | **何时可以进入下一步** |
| --- | --- | --- | --- |
| 1 · 确认事实 | 整理目标用户、主任务、替代方案、差异能力、已有身份与可用素材 | 一页简报；事实、假设、缺失项分开 | 影响方向的未知已补足，或明确标为待验证 |
| 2 · 定义品牌行为 | 将 3–5 条原则转译为信息、语气、视觉和交互选择 | 原则 → 界面动作 → 边界表 | 每条原则都有实际例子 |
| 3 · 拆解参考 | 找与任务有关的参考，记录页面范围、借鉴点、不借鉴点 | 带注释参考清单 | 能解释为什么参考适合，而不只是喜欢颜色 |
| 4 · 探索方向 | 用同一份内容做 2–3 个结构与表达明显不同的方向 | 首屏＋一个关键内容段＋窄屏示意 | 差异体现在构图、内容叙事与素材使用，不只是换配色 |
| 5 · 实现代表页 | 把选定方向放入真实长文案、主操作和必要状态 | 一个可操作的代表页面 | 主要任务可完成；方向在宽窄屏都成立 |
| 6 · 提炼系统 | 提取确实复用的语义颜色、字体层级、间距、组件与状态 | 轻量设计规则与可复用实现 | 其他页面能够复用，而无需逐页发明例外 |
| 7 · 双线检查 | 一条看任务与视觉表达；一条检查操作、响应式与可访问性 | 问题、位置、后果、修复建议及截图／操作证据 | 重要缺陷已修复；审美建议单独记录 |
| 8 · 验证与沉淀 | 让目标用户完成关键任务；记录修改理由和有效规则 | 验证记录、最终画面、下次可用的简报 | 证据足够支持当前交付；不为追求评分无限打磨 |

**控制工作量：**先做代表性页面，再批量扩展。每轮集中修正最影响任务或视觉表达的少数问题；小改动不重新做定位、参考和整套设计系统。没有目标用户参与时，标记为专家走查，不写成“已通过用户测试”。

## 最小交付清单

- [ ]  **定位可说明：**谁用、为什么选、有哪些真实证据。
- [ ]  **品牌可执行：**原则对应具体界面行为，不能只剩形容词。
- [ ]  **方向有差异：**候选之间的结构、素材或叙事确实不同。
- [ ]  **页面有内容：**真实信息可用；假想或样例内容已标记。
- [ ]  **操作有闭环：**主动作、反馈、错误与恢复按实际需求覆盖。
- [ ]  **视觉有证据：**保存当前版本的代表性宽窄屏截图，说明页与状态。
- [ ]  **结论有边界：**区分视觉判断、功能检查、用户验证与未经测试的假设。
- 可复制提示词 · 品牌到界面的设计简报
    
    下面是本次编写的通用任务模板，不是已执行的指令。
    
    ```
    项目：[名称与具体用途]
    用户：[谁，在什么情境下使用]
    主要任务：[这次必须完成的动作]
    替代方案：[没有我们，用户会如何做]
    真实差异与证据：[能力、素材、案例；没有证据的项标为假设]
    已有品牌约束：[名称、字体、颜色、Logo、语气、不可改动部分]
    页面任务：[了解并决定 / 操作 / 阅读 / 欣赏作品]
    可用内容：[文案、图片、数据、已实现功能]
    技术与范围：[已有栈、目标页面、允许修改的部分]
    
    请先将品牌原则转译成具体的界面动作和边界。
    为同一份内容提出 2–3 个实质不同的方向，解释构图、素材、
    叙事和主操作的区别；不要只换配色。
    选择方向后先实现代表性页面，再提炼实际复用的规则。
    使用真实内容覆盖适用状态，检查宽窄屏、键盘和恢复路径。
    每轮指出最影响用户任务或视觉表达的问题，并保留截图与版本。
    不要编造客户、评价、数据或业务承诺。
    只声明实际执行过的检查；说明未验证的假设。
    ```
    

---

# 10 · 假想演练：前端技能研究平台

**场景说明：**下面是贴合本研究主题的假想示例，用于展示方法怎么落地；不代表已经创建该产品，也不引用尚未完成的实验结果。

## 从定位写到品牌原则

**目标用户：**想选择和验证前端设计技能的工程师。

**常见替代方案：**收藏 GitHub 仓库、看宣传截图、逐个复制提示词试用。

**拟提供的差异：**把技能来源、版本、固定任务、生成截图和评价依据放在同一个比较流程中。这是产品设想，尚不是已具备的能力。

**品牌方向：**像一本能复查证据的设计实验记录：视觉上有判断，内容上可追溯，操作上能直接比较。

| **原则** | **具体设计动作** |
| --- | --- |
| 判断要有依据 | 结论旁边展示截图、任务与适用范围；区分作者观点和实测结果 |
| 差异应该看得见 | 首页以真实页面片段呈现方向差异；比较页支持同一视口和状态对照 |
| 过程可以复查 | 版本、输入条件、耗时与修改轮次有稳定入口；缺失信息明确显示 |
| 鼓励探索 | 给有差异的方向足够展示面积；不要用统一卡片外壳抹平作品特点 |

## 三个方向，不只是三个配色

| **方向** | **构图与内容组织** | **适合什么场景** |
| --- | --- | --- |
| 设计档案馆 | 真实截图大幅展示；按设计问题组织案例；说明文字像清楚的图注 | 浏览风格与寻找参考 |
| 实验工作台 | 两组结果并排；条件固定在侧栏；差异与证据可快速切换 | 认真选择技能与核对实验 |
| 视觉编辑部 | 围绕一个问题展开叙事；大案例图、重点批注和结论交替 | 阅读研究过程与理解设计取舍 |

**本次建议：**首页可承担“设计档案馆”的发现任务，比较页采用“实验工作台”的操作结构，长报告采用“视觉编辑部”的阅读节奏。它们共用身份、语气和基础组件，但不必共用一套版式。

**优先做的代表页：**一个展示真实结果的入口页＋一个可切换相同视口的比较页。先验证“能否看出差异、能否理解评价依据”，再扩展排行榜、收藏等功能。

**反例：**如果没有可比实验，就不显示“最佳技能”排名；如果只看过源码，就标记“方法分析”，而不是“效果已验证”。

- 本轮新增来源 · 原文、技能与固定版本
    
    **品牌与产品方法**
    
    - [April Dunford · 定位方法](https://www.aprildunford.com/post/a-quickstart-guide-to-positioning)
    - [Wise · 字体](https://wise.design/foundations/typography) · [动效](https://wise.design/foundations/motion-system)
    - [Mailchimp · Voice and Tone](https://styleguide.mailchimp.com/voice-and-tone/)
    - [IBM Carbon · 字体使用策略](https://www.carbondesignsystem.com/building-blocks/foundations/typography/style-strategies) · [动效](https://www.carbondesignsystem.com/building-blocks/foundations/motion/overview)
    - [Linear · 2024 年产品界面改版复盘](https://linear.app/now/how-we-redesigned-the-linear-ui)
    
    **技能源码**
    
    - [Impeccable 原仓库](https://github.com/pbakaus/impeccable) · 本次快照 `6af45ac` · [入口](https://github.com/pbakaus/impeccable/blob/6af45ac9a5eb8792f033d3242f52e99812fd91fa/plugin/skills/impeccable/SKILL.md)
    - [no-slop-design 原仓库](https://github.com/agshinrajabov/no-slop-design) · 本次快照 `ae2ecc2` · [入口](https://github.com/agshinrajabov/no-slop-design/blob/ae2ecc20970ff982a7f2cc7b145d859e1df9ef21/SKILL.md)
    - [Taste Skill 原仓库](https://github.com/Leonxlnx/taste-skill) · 本次快照 `f624f37` · [默认技能](https://github.com/Leonxlnx/taste-skill/blob/f624f37a8c650b9cc550253104925efe4c8de246/skills/taste-skill/SKILL.md) · [brandkit](https://github.com/Leonxlnx/taste-skill/blob/f624f37a8c650b9cc550253104925efe4c8de246/skills/brandkit/SKILL.md)
    - [Baoyu 原仓库](https://github.com/JimLiu/baoyu-design) · [设计系统方法](https://github.com/JimLiu/baoyu-design/blob/main/skills/baoyu-design/built-in-skills/create-design-system.md)
    
    **证据限制：**仓库中的研究、盲评、自评分或性能描述属于作者提供的材料；本轮没有复现其测试。不将候选技能的流行度、规则数量或生成示例当作对你的项目有效的证明。
