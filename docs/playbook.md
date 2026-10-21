# uiux-design Skill · 本地 Agent 测试与开发手册

目标：用本地 agent 把 `uiux-design` 从 v0.1 迭代到"有证据证明比基线好"。
原则：每一步都留下可复查的东西（版本、截图、日志、评分），没有证据就不下结论。

---

## 0. 总览

```
搭环境 → 烟测(1次) → 第1轮(小规模对照) → 盲评 → 改 Skill(一次只改一处) → 回归 → …
        → 触发测试 → 留出集验证(只用一次) → 结论报告
```

| 阶段 | 做什么 | 产出 |
| --- | --- | --- |
| A 搭环境 | 目录、简报、截图脚本、技能隔离 | 可复现的实验场 |
| B 烟测 | 只跑 1 个简报 × 候选 Skill × 1 次 | 确认技能被加载、流水线跑通 |
| C 对照轮 | 3 组（无技能 / 对照技能 / 候选）× 简报 | runs/ 下的产物与截图 |
| D 盲评 | 匿名后由另一个会话 + 你本人评分 | scoreboard.md、问题卡 |
| E 改 Skill | 从失败模式出发，一次一处改动 | CHANGELOG.md |
| F 回归 | 只重跑受影响简报 + 1 个回归简报 | 对比结果 |
| G 触发测试 | 检查 description 该触发时触发、不该时不触发 | 触发率表 |
| H 留出集验证 | 用从未参与调参的新简报跑一次 | 最终报告 |

### 轮次与规模（先小后大）

- 烟测：1 简报 × 候选组 × 1 次 = **1 次运行**
- 第 1 轮：简报 01、02 × 3 组 × 1 次 = **6 次运行**
- 稳定后全量：4 简报 × 3 组 × 2 次 = **24 次运行**（同一组同一简报跑 2 次，是为了看波动）
- 留出集：1 简报 × 3 组 × 2 次 = **6 次运行**，只跑一次

### 两个 agent 怎么分工

如果你手上两边额度不对称（比如一边大额度、一边小额度），建议这样分：

- **大批量构建运行**放在额度大的那一边，每次运行设相同上限（如 30 分钟或固定轮数），超限就停并记录。
- **盲评法官用另一家的模型**，减少模型偏爱自己风格输出的偏差。法官只负责出评分和问题卡，最终判断以你本人为准。
- **最终验证必须在你真正要长期使用这个 Skill 的那个 agent 上做。** 在一个模型上调好的 Skill 换到另一个模型上表现可能不同。

---

## A. 搭环境

### A1. 目录结构

```
uiux-lab/
├─ skills/
│  └─ uiux-design/              # 候选 Skill（SKILL.md + references/）
├─ skills-baseline/
│  └─ frontend-design/          # 对照技能（Anthropic 官方或你现用的）
├─ briefs/
│  ├─ 01-coffee-roaster.md
│  ├─ 02-logistics-dashboard.md
│  ├─ 03-photographer-portfolio.md
│  ├─ 04-pricing-page-improve.md
│  └─ 05-holdout.md             # 留出集：调参期间不许看、不许用
├─ runs/                        # <日期>-<简报>-<组>-<序号>/{output, shots, run-log.md}
├─ blind/                       # 匿名后的评审材料 + mapping.json(评审结束前不给法官看)
├─ reviews/                     # 法官评分与你的评分
├─ scripts/shot.mjs             # 截图与机检脚本（见附录）
├─ scoreboard.md
└─ CHANGELOG.md
```

建议 `.gitignore` 掉 `runs/` 里的大文件（截图、HTML），只提交 `run-log.md`、`scoreboard.md`、`CHANGELOG.md`。你之前清理过测试产物，这样可以避免再次堆满仓库。

### A2. 三组实验的隔离（最容易出错的一步）

| 组 | 加载什么 | 必须确认 |
| --- | --- | --- |
| A 基线 | 不加载任何设计技能 | 用户级和项目级技能目录里都没有 uiux-design 或 frontend-design |
| B 对照 | 只加载 frontend-design | 同上，没有候选技能 |
| C 候选 | 只加载 uiux-design | 没有 frontend-design |

- 每次运行开一个**全新会话、全新工作目录**，不带历史。
- Claude Code 的项目级技能放在 `.claude/skills/<名字>/SKILL.md`；用户级技能对所有项目生效，会污染基线，务必检查。
- 其他 agent 若没有技能机制，就把 SKILL.md 内容当作 AGENTS.md / 系统指令加载，references 放进工作目录并在指令里说明路径。**无论哪种，都在 run-log 里记录实际加载方式。**
- 让 agent 在运行开始时报告"当前加载了哪些技能"，对不上就作废这次运行。

### A3. 固定的实验条件（写进每份 run-log）

同一轮内：同一模型、同一思考档位、同一时间/轮数上限、同一工具权限、同一份简报文本与素材。条件不一致的运行不进入对比。

### A4. 让 agent 搭好环境的提示词（P1）

```
你在一个空目录 uiux-lab/ 里工作。请只做环境搭建，不要设计任何页面。

1. 按下面结构创建目录与空文件：
   skills/uiux-design/  skills-baseline/frontend-design/  briefs/  runs/  blind/  reviews/  scripts/
   scoreboard.md  CHANGELOG.md  .gitignore（忽略 runs/*/shots、runs/*/output 的大文件，保留 run-log.md）
2. 把我提供的 SKILL.md 和 references/ 复制到 skills/uiux-design/。
3. 在 scripts/ 里创建 shot.mjs（内容我会粘贴），并执行：
   npm init -y && npm i -D playwright && npx playwright install chromium
4. 用一个最小的测试 HTML 验证 shot.mjs 能跑通，输出 wide/narrow 两个视口的截图和 report.json。
5. 创建 briefs/ 下 4 个简报文件（内容我稍后给你）。

完成后列出：创建了哪些文件、命令的实际输出、任何失败。不要编造执行结果。
```

### A5. 四个简报（放进 briefs/，内容需固定，不要每轮改写）

写简报时把"素材与约束"也固定下来，否则对比不公平。每份简报用同一模板：

```
# 简报 <编号> · <名称>

## 任务
<用户原话，来自 evals.json>

## 固定素材（所有组使用同一份）
<文案、产品信息、数据、品牌约束；没有的素材明确写"无照片/无Logo">

## 交付要求（所有组一致）
- 一个自包含的 HTML 文件，放在 output/index.html，不依赖外部网络资源（字体用系统字体或内联）
- 同一目录下写 run-log.md，按"执行者报告模板"填写
- 不得编造客户、评价、数据；样例内容必须标记
```

`uiux-design-evals.json` 里的四条 prompt 直接作为"任务"一节；"固定素材"你来补，比如简报 01 要把三款豆子的名称、产地、风味、价格写死。

---

## B. 单次运行：执行者提示词（P2）

三组使用**同一段**，只替换 `{技能说明}` 一行。这样差异只来自技能。

```
你是一名设计师兼前端工程师。请完成 briefs/{简报文件} 中的任务。

开始前：
- 用一句话报告你当前加载了哪些技能（没有就写"无"）。
{技能说明}   # A组：不加这行。B组："本次可使用 frontend-design 技能。" C组："本次请使用 uiux-design 技能。"

要求：
- 产物只写到 runs/{运行ID}/output/，主文件 index.html，自包含，不引用外部网络资源。
- 全程不要读取 briefs/ 以外的其他简报、其他运行的产物或 reviews/。
- 时间上限 {N} 分钟，到点停止并如实说明完成到哪一步。
- 不要自行运行截图脚本以外的评分或自评打分。

结束时写 runs/{运行ID}/run-log.md，包含：
1. 加载的技能与版本/加载方式
2. 你做的关键决策与理由（不超过 10 条）
3. 你的假设（简报没给、你自己补的）
4. 你实际检查了什么（只写真的做了的：例如是否在窄屏看过、是否用键盘走过）
5. 你没有验证的
6. 耗时与大致轮数
不要夸大。没做过的检查不要写成做过。
```

运行 ID 约定：`2026-10-21-01-coffee-C-1`（日期-简报-组-序号）。

### 烟测先跑这一条

简报 01、C 组、1 次。检查四件事：技能真的被加载了吗；流程是否按你写的步骤走；产物是否落在正确目录；run-log 是否诚实。任何一项不对，先修环境，不要进入对照轮。

---

## C. 截图与机检（P3）

对每个运行的产物跑：

```
cd uiux-lab
node scripts/shot.mjs runs/{运行ID}/output/index.html runs/{运行ID}/shots
```

产出：`wide-fold.png`、`wide-full.png`、`narrow-fold.png`、`narrow-full.png`、`report.json`。
`report.json` 里要看：窄屏是否横向溢出、是否有控制台错误、是否有外部请求（违反"不依赖外部网络"则标记）、前 40 次 Tab 落在哪里。

让 agent 批量执行的提示词：

```
对 runs/ 下每个尚未生成 shots/ 的运行，执行 scripts/shot.mjs。
然后生成 runs/summary.csv，列：运行ID, 简报, 组, 窄屏横向溢出(是/否), 控制台错误数, 外部请求数, Tab停留元素数, 有可见焦点样式的比例。
只汇总脚本实际输出的数据，失败的运行标注失败原因，不要补数。
```

注意：脚本只做机检和截图，不能代替你实际操作页面。键盘、动画、失败恢复要自己点一遍。

---

## D. 盲评（P4）

### D1. 匿名化（由构建 agent 做，法官不参与）

```
为简报 {编号} 做匿名评审包：
1. 取该简报下所有组的运行，随机分配标签 X、Y、Z（同一组两次运行用不同标签）。
2. 复制各运行的 shots/ 和 output/index.html 到 blind/{简报}/{标签}/，只保留这些，删除 run-log.md 和任何能暴露所用技能的文字。
3. 在 blind/{简报}/mapping.json 记录 标签 → 运行ID 的对应，这个文件不得放进给法官的目录。
4. 检查 HTML 注释和页面里有无 "uiux-design"、"frontend-design"、"skill" 等字样，有就报告，不要擅自改产物。
```

### D2. 评分维度（法官和你用同一张表，1–5 分）

| 维度 | 1 分 | 3 分 | 5 分 |
| --- | --- | --- | --- |
| 任务清晰度 | 看不出让用户做什么 | 能懂但主次不清 | 首屏就能理解、比较并知道下一步 |
| 品牌辨识度 | 换成竞争者名字毫无违和 | 有风格但偏行业模板 | 内容、版式、交互共同指向这个产品 |
| 构图与节奏 | 区块等权堆叠 | 有层次但单调 | 张弛有度，视觉重心明确 |
| 内容真实性 | 编造客户/数据/承诺 | 样例内容未标记 | 内容与简报一致，占位已标记 |
| 状态与交互 | 只有静态正常态 | 覆盖部分状态 | 覆盖该流程需要的状态，恢复路径清楚 |
| 响应式 | 窄屏破版 | 可用但粗糙 | 窄屏重新组织而非简单缩小 |
| 可访问性基础 | 无焦点、对比不足 | 部分满足 | 键盘可用、焦点清楚、对比达标 |

操作型简报（02）的"品牌辨识度"权重降低，"状态与交互"权重提高。

### D3. 法官提示词（新会话，建议换另一家模型）

```
你是设计评审。下面是同一份设计简报的 3 份匿名作品（X、Y、Z），每份有宽屏、窄屏截图和 HTML 文件。
你不知道它们是怎么做出来的，也不要猜测。

请完成：
1. 先阅读简报 briefs/{简报}.md。
2. 对每份作品按下列 7 个维度打 1–5 分，每个分数必须附一句依据，依据要指向截图或代码中的具体位置：
   任务清晰度 / 品牌辨识度 / 构图与节奏 / 内容真实性 / 状态与交互 / 响应式 / 可访问性基础
3. 对每份作品写问题卡，每条包含：位置、观察、用户后果、修复方向，并标注「必须修复」或「审美建议」。
4. 最后给出三者的排序，并写出排序最关键的两个理由。
5. 明确写出你无法判断的部分（例如没有实际操作过页面、没法看动画）。

规则：
- 不因为"更复杂、更炫"就给高分。
- 不要因为作品长就偏高。
- 只依据你实际看到的内容评价，不确定就写不确定。
```

### D4. 你自己的评分

法官只是辅助。你对每个简报独立盲评一遍，再对照法官意见。你和法官分歧大的地方，往往就是 Skill 评审标准需要澄清的地方，值得单独记一笔。

### D5. 汇总提示词（P5）

```
读取 reviews/ 下法官评分和我的评分，以及 blind/{简报}/mapping.json（评审结束后才允许读）。
生成 scoreboard.md：
- 每个简报一张表：行=组(A/B/C)，列=7个维度，单元格=法官分/我的分
- 每个简报下方列出：C组相对A、B组的优势项、劣势项
- 汇总各维度跨简报的平均，并标出波动大的维度（同组两次运行差 ≥2 分）
- 用一句话区分"事实"（分数、机检数据）与"解读"
不要给出"更强""更好"的整体结论，样本量太小。只写"初步信号"。
```

---

## E. 改 Skill（P6）

### E1. 先找失败模式，不要凭感觉改

看 C 组输出里反复出现的问题，分类：

- **流程没被执行**（该做参考拆解却跳过）→ 步骤写得不够清楚，或太重
- **步骤做了但没带来改善**（原则表写了，页面没体现）→ 缺"怎么落到画面"的指导
- **过度**（小改动也重走全流程）→ 第 0 步分流不够强
- **模型自己的坏习惯**（每个页面都是三列卡片、编造评价）→ 需要说明原因的具体提醒

### E2. 改动规则

- **一次迭代只改一处**，否则分不清是哪次改动起了作用。
- 不为了修某一个简报的问题加规则，那会过拟合。问自己：这条规则换个行业还成立吗？
- 优先解释"为什么"，少写绝对化的"必须/禁止"。
- 删除没触发过的规则，保持 SKILL.md 精简（现在 95 行，超过 150 行就要警惕）。
- 每次改动写入 CHANGELOG：

```
## v0.2 · {日期}
- 现象：{引用 runs/ 中的运行ID 与截图}
- 假设：{为什么会这样}
- 改动：{SKILL.md 或 references 里具体改了哪一处}
- 预期：{哪个维度会变好，哪个可能受损}
- 结果：{回归后填写}
```

### E3. 让 agent 起草改动的提示词

```
读取 scoreboard.md、reviews/ 下的问题卡，以及 skills/uiux-design/ 当前内容。
请只提出一处最值得做的改动：
1. 指出 C 组最频繁出现、最影响评分的一个失败模式，引用具体运行ID作为证据。
2. 判断根因：是流程没被执行、步骤没带来改善、过度，还是模型自己的坏习惯。
3. 给出最小改动方案（改哪个文件、哪几行），并预测可能的副作用。
4. 说明这条改动换到其他行业是否仍成立，以及如何检验它没有只修好了这个简报。
先不要改文件。等我确认后再改，并写 CHANGELOG。
```

### F. 回归

改完后只重跑：①受影响的简报；②1 个回归简报（上一轮表现好的，用来确认没被改坏）。回归必须**同条件**：同模型、同上限、同简报文本。然后重复 C→D。

---

## G. 触发测试

检查 description 能否在该触发时触发。**简单、一步就能做完的请求即使描述匹配也可能不触发**，所以测试请求要足够实质。

### G1. 测试请求（每条在 C 组环境新会话里问，各跑 3 次，记录是否加载了技能）

应该触发：
1. "帮我为一家做手冲咖啡器具的小公司设计官网首页，要有品牌感"
2. "这个后台的订单列表页太乱了，帮我重新设计，表格有很多筛选条件"
3. "我的落地页看起来像 AI 模板，怎么改得有辨识度？"
4. "对下面这个注册流程做一次 UX 评审，列出必须修复的问题"
5. "帮我把品牌的「温暖、可信」落实成具体的界面设计规则"

不应该触发（相近但无关）：
6. "帮我写一个 Python 脚本批量重命名文件"
7. "解释一下 CSS Grid 和 Flexbox 的区别"
8. "帮我修这个按钮点击后没反应的 JS bug"
9. "给我的品牌起 10 个中文名字"
10. "总结一下这篇关于用户增长的文章"

### G2. 记录与调整

| 请求 | 应触发？ | 第1次 | 第2次 | 第3次 |
| --- | --- | --- | --- | --- |

触发率低就让 description 更"主动"地列出触发情境；误触发多就收窄。调 description 一次只改一处，改后同样跑 3 次。

---

## H. 留出集验证（只做一次）

留出简报 05 从头到尾不参与调参：不看、不测、不据此改 Skill。选一个与前四个明显不同的任务（例如：医疗预约流程、儿童教育产品、B2B 数据工具、或你自己的真实项目）。

```
按 {版本} 的 uiux-design、frontend-design、无技能三组，对简报 05 各跑 2 次。
流程与前面完全一致：隔离、固定条件、截图机检、匿名、盲评（法官 + 我本人）。
评审完成后才读取 mapping.json 并汇总。
最后写 reports/final.md，包含：
1. 实验条件（模型、上限、技能版本）
2. 各组各维度得分
3. C 组相比 A、B 的优势与劣势，附具体运行ID
4. 与前几轮相比是否有退步
5. 明确的局限：样本量、法官偏差、未做的验证
6. 下一步建议
结论只写"初步信号"，不写"更强"，除非证据明显且可复现。
```

### 判断"够好了"的标准

- C 组在盲评中胜过 A 和 B 的简报数 ≥ 3/5（含留出集），且在操作型简报上没有退步；
- 或者连续两轮没有显著进步 → 停，这时问题可能已经不在 Skill 而在模型本身。

---

## 常见坑

1. **基线被污染：** 用户级技能目录里还留着候选技能。
2. **条件不一致：** 一轮内换了模型或上限。
3. **自评自：** 构建 agent 给自己的作品打分。分数只能来自盲评。
4. **把简报当成训练集：** 在同四个简报上反复调，最终只对这四个有效。所以才要留出集。
5. **看颜色不看结构：** 对比时先看构图、叙事、素材、状态，再看配色。
6. **相信 run-log 的自述：** run-log 里"检查过窄屏"需要用截图和机检数据印证。
7. **用 LLM 法官的结论当最终结论：** 法官倾向喜欢更复杂、更长的东西，你的判断必须压过它。

---

## 附录：scripts/shot.mjs

安装：`npm i -D playwright && npx playwright install chromium`
（我检查过语法，但这个脚本没有在真实浏览器里运行过，第一次用请先用一个测试 HTML 跑通。）

```js
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
```
