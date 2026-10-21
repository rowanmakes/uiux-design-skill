# 阶段 1 准备报告（Round 1 · 取证准备）

- 日期：2026-10-21（当地时间 UTC-7）
- Worktree：`C:/Users/12296/orca/workspaces/FrontDesign/r1-preparation`（主仓库 `D:/code/CodeResearch/FrontDesign` 的子 worktree）
- 分支：`LJC-god/r1-preparation`
- 基准提交：`4e80c5ccdbd4d7b7ecca533a44ce10507eafb5f2`（v0.5 草稿）
- 约束遵守：未修改 `skill/` 任何文件；未推送；未改 main；只提交本任务范围（`test/`、`package.json`、`package-lock.json`、`.gitignore`；`scripts/shot.mjs` 无需修改即跑通）。

## 1. 简报（test/briefs/）

- 来源：`evals/evals.json`（仓库内，基线提交版本），只取 `id=1`（`new-brand-site-coffee-roaster`）与 `id=7`（`desktop-client-generation-queue`）的 `prompt` 字段原文。
- 写入方式：用 Node 脚本直接从 JSON 提取 `prompt` 字符串原样写盘（未手工重打），未包含 `expected_output`，未改写。
- 一致性验证：逐字节比较 `test/briefs/NN.md === evals.json 中 prompt + "\n"`，两者均 `true`。

| 文件 | SHA256 | 字节数 |
| --- | --- | --- |
| `test/briefs/01.md` | `ff4e598b56c9853df03b9f2256cc15473346b8d9011bb2e4bcd73e8dea6d6dca` | 238 |
| `test/briefs/07.md` | `d7ba9bcb4970ac87074ae9d1eb9333927454e71cec45b7df6ceddc9348e5a136` | 335 |

## 2. 固定素材（test/materials/）

- `01.md`：品牌名"半山烘焙"介绍两三句（固定文案）、三款豆子名称/产地/处理法/风味/价格（¥68/¥58/¥72 每 200g）、订阅价格档；明确"无照片、无 Logo、无客户评价、无销量数据，禁止编造"。
- `07.md`：项目名 3 个、提示词 3 条（含负面提示词）、种子值 20481/20482/20483 及 steps/尺寸参数、队列任务 4 条（生成中/排队/失败可重试/已完成各状态）；明确"无图片文件、无 Logo，一律占位并标注"。
- 两份均在文件头部显式标注"全部内容均为样例（虚构演示素材）"。**素材自本报告提交后固定，本轮内不再修改。**

| 文件 | SHA256 |
| --- | --- |
| `test/materials/01.md` | `d28c7be2448089cd0cccc57afd302e04444a0c12d78300db499b28358ad75b49` |
| `test/materials/07.md` | `2570d95d3380ed6562c14be5e79f58d8cea9b97417bf25564c75a3b7d009462d` |

哈希口径：上表 SHA256 均对 LF 行尾的原文字节计算（写入与 Git 库内 blob 均为 LF，已用 `git show :<path> | sha256sum` 复核一致）。本机 `core.autocrlf=true`，若日后重新检出使工作副本变为 CRLF，工作副本哈希会不同；校验时请以 `git show <commit>:<path>` 的字节为准。

## 3. 基线技能（test/baseline-skills/frontend-design/SKILL.md）

- 来源仓库：`github.com/anthropics/skills`，文件路径 `skills/frontend-design/SKILL.md`
- 源提交：`41bbe19d1a1a7eaab5e7bb9050a417e5c6cffc8f`（该文件最近一次改动："Update frontend-design skill to avoid generic design defaults (#1713)"，2026-09-03T16:37:13Z）
- 获取链接：`https://raw.githubusercontent.com/anthropics/skills/41bbe19d1a1a7eaab5e7bb9050a417e5c6cffc8f/skills/frontend-design/SKILL.md`
- 获取时间：2026-10-21T11:53:14Z（HTTP 200，9390 字节）
- 交叉验证：另经 `https://api.github.com/repos/anthropics/skills/contents/...?ref=<commit>`（`Accept: application/vnd.github.raw+json`）再次下载，两份字节完全一致（`Buffer.equals` = true），证明传输无损坏、原文保留。
- 文件为 LF 行尾、72 行，frontmatter `name: frontend-design` 完整保留。
- SHA256：`d91970639e9f5c37682ac7ab60094d35f1c7c1f38d731bd56396563aee10c1d3`

## 4. 烟测（test/smoke/）

环境与版本（实际运行时确认）：

| 工具 | 版本 |
| --- | --- |
| Node | v24.17.0 |
| npm | 11.13.0 |
| playwright（npm devDependency） | 1.64.1 |
| Chromium（playwright build） | Chrome for Testing 156.0.8078.4（chromium v1248），位于 `%LOCALAPPDATA%\ms-playwright\chromium-1248`（此前已安装，本次 `npx playwright install chromium` 确认就绪） |

实际执行的命令（在 worktree 根目录）：

```
npm init -y            # 后手工改 name/private/description（见 package.json）
npm i -D playwright    # added 2 packages in 5s
npx playwright install chromium
node scripts/shot.mjs test/smoke/index.html test/smoke/shots
```

说明：`scripts/shot.mjs`（基线提交原版，未修改）一次跑通，因此本任务没有动 `scripts/`。

烟测页面 `test/smoke/index.html`：自包含最小 HTML（半山烘焙占位卡片 ×3、两个可聚焦按钮、1600px 高占位段），无外部资源。

实际输出（`test/smoke/shots/`）与检查结果：

| 文件 | 尺寸 | 大小 |
| --- | --- | --- |
| `wide-fold.png` | 1440×900 | 42591 B |
| `wide-full.png` | 1440×2146 | 70824 B |
| `narrow-fold.png` | 390×844 | 33757 B |
| `narrow-full.png` | 390×2166 | 53435 B |
| `report.json` | — | 3128 B |

`report.json` 关键值：`viewports.wide.horizontalOverflow=false`、`viewports.narrow.horizontalOverflow=false`、`consoleErrors=[]`、`externalRequests=[]`、`tabStops` 记录到 30 次按钮停留且 `visibleFocusStyle=true`（两个按钮循环聚焦，符合页面只有两个可聚焦元素的情况）。PNG 尺寸用 Node 读取 PNG IHDR 字节核实，与脚本设定视口（1440×900 / 390×844）及整页高度一致，证明是真实浏览器渲染产物。

`node_modules/` 已被 `.gitignore` 忽略，不入库；`package.json` + `package-lock.json` 提交以便复现。

## 5. .gitignore 变更

- 删除：`runs/*/shots/`、`runs/*/output/`、`blind/`（按任务要求允许提交 runs/ 与 blind/ 下所有产物）。
- 保留：`node_modules/`、`.DS_Store`。
- 注意：这与 `docs/playbook.md` A1 中"建议忽略大文件"相反，属任务明确指定；若后续仓库体积失控需再议。

## 6. 用户级隔离检查（只读，未做任何更改）

检查方式：仅列目录名/文件名与针对"model"键的定向解析；未读取任何命中技能的正文（避免污染设计环境）；未读取任何凭据类内容。

| 目录 | 存在 | uiux-design / frontend-design 命中 |
| --- | --- | --- |
| `C:\Users\12296\.antigravity` | 否 | — |
| `C:\Users\12296\.gemini`（含 `antigravity/`、`antigravity-cli/`、`config/`） | 是 | 无 |
| `C:\Users\12296\.gemini\antigravity\builtin\skills`（Antigravity 内置技能） | 是 | 无（名单：agy-customizations、antigravity_guide、automation、generative_ui、migrate-workflows、permissioned-github、plugin、ui-plugin-navigation） |
| `C:\Users\12296\.gemini\antigravity\skills`（Antigravity 用户级技能位） | 否（目录不存在） | — |
| `C:\Users\12296\AppData\Roaming\Antigravity` | 是（应用缓存/状态，无技能目录） | 无 |
| `C:\Users\12296\AppData\Local\Antigravity` | 否 | — |
| `C:\Users\12296\.config\antigravity` | 否 | — |
| `C:\Users\12296\.claude`（无 `skills/` 子目录） | 是 | 无 |
| `C:\Users\12296\.codex\skills` | 是 | 无（名字相邻：taste-skill、prototype、codebase-design、archify、graphify，正文未读） |
| `C:\Users\12296\.codex\rules\default.rules`、`C:\Users\12296\.codex\AGENTS.md`（Codex 全局规则，会自动加载） | 是 | grep `uiux|frontend|design|设计|taste` 无命中行 |
| `C:\Users\12296\.agents\skills` | 是 | 无（全部为 lark-* 套件与 find-skills） |
| 主仓库与 worktree 的项目级 `.agent/`、`.claude/`、`.codex/` | 否（均不存在） | — |

结论：**用户级与项目级均未发现 `uiux-design` 或 `frontend-design` 技能，A 组（无技能基线）当前无已知污染源。**

隔离风险（按风险源列出）：

1. Antigravity 内置技能 `generative_ui`（名字与 UI 生成相关，正文未读）：内置、随客户端分发，无法用"删用户目录"方式隔离；若实验在 Antigravity 内跑且它被自动触发，可能污染 A/B 组。属"未知是否会自动加载"，每次运行须按 playbook 让 agent 开场报告已加载技能。
2. `~/.codex/skills` 中的 `taste-skill`、`prototype` 等名字相邻技能：Codex 是否自动触发未知；同上以运行开场报告为准。
3. Codex 全局 `AGENTS.md` / `rules/default.rules` 自动加载：已 grep 确认无设计相关内容，风险低，但后续若有人改动需重查。
4. Antigravity 的 knowledge/brain 目录未逐项排查（内容为会话数据），其中是否含历史设计指引：未知。

Antigravity 当前模型设置（非敏感配置，定向读取）：

- `C:\Users\12296\.gemini\antigravity-cli\settings.json` → `model = "Gemini 4 Argon (Medium)"`（准确记录原值）
- `C:\Users\12296\.gemini\antigravity\antigravity_state.pbtxt` → `last_selected_agent_model: MODEL_PLACEHOLDER_M401`（内部枚举值，原样记录；对应哪个公开模型名：未知，不猜）

## 7. 未验证 / 遗留事项

- 简报 01/07 以外的 evals（id=2,3,4,6,8）未提取，留待后续轮次按需处理。
- `generative_ui`、`taste-skill` 等相邻技能的实际触发行为未测试（避免读取正文；触发测试属后续阶段）。
- `report.json` 的 tabStops 只覆盖前 40 次 Tab 中的 30 条非 body 停留，焦点样式为启发式判定，仍需人工看截图。
- 烟测只验证了截图流水线，未验证任何设计产出质量。
- Playwright 浏览器二进制在用户级共享目录 `%LOCALAPPDATA%\ms-playwright`，复现实验的机器需同样执行 `npx playwright install chromium`。
