# Round 1 取证报告（阶段 3：截图 / 真实机检 / 匿名取证）

- 取证 worktree：`C:\Users\12296\orca\workspaces\FrontDesign\r1-evidence`（分支 `LJC-god/r1-evidence`，本报告所在提交）
- 执行日期：2026-10-21（UTC）
- 结论先行：五份存在的产物全部完成真实浏览器截图与机检（07 简报含 2 个额外视口），六行 summary 齐备（含 r1-07-C 失败行），两个三标签匿名包哈希校验一致、未发现匿名目录内身份泄漏；r1-07-C 按实际失败处理，未重跑、未伪造。本报告不含评分或排名，也不含匿名标签对应关系。

---

## 1. 实际环境

| 项 | 值 |
|---|---|
| OS | Windows 10.0.26200 (x64) |
| Node | v24.17.0 |
| npm | 11.13.0 |
| 依赖安装 | `npm ci`（严格按 `package-lock.json`，新增 2 包，无偏差安装） |
| playwright | 1.64.1（lockfile 锁定） |
| 浏览器 | chromium 1248（`%LOCALAPPDATA%\ms-playwright\chromium-1248\chrome-win64\chrome.exe`，本机既有缓存，未另行下载） |

## 2. 实际执行的命令

```sh
npm ci
# 冒烟回归（验证脚本改动向后兼容，产物写入临时目录后已删除）
node scripts/shot.mjs test/smoke/index.html test/smoke-shots-check
# 01 简报三运行（默认视口 wide=1440x900, narrow=390x844）
node scripts/shot.mjs runs/r1-01-A/output/index.html runs/r1-01-A/shots
node scripts/shot.mjs runs/r1-01-B/output/index.html runs/r1-01-B/shots
node scripts/shot.mjs runs/r1-01-C/output/index.html runs/r1-01-C/shots
# 07 简报两运行（默认两视口 + 新增 1280x800 与 900x600）
node scripts/shot.mjs runs/r1-07-A/output/index.html runs/r1-07-A/shots --viewports=wide,narrow,1280x800,900x600
node scripts/shot.mjs runs/r1-07-B/output/index.html runs/r1-07-B/shots --viewports=wide,narrow,1280x800,900x600
# r1-07-C（无 HTML，实际尝试，预期失败并留档）
node scripts/shot.mjs runs/r1-07-C/output/index.html runs/r1-07-C/shots
# 匿名打包 / 校验 / 泄漏扫描 / summary 复算
node scripts/blind-pack.mjs pack        # 后因输出事故重打包，见 §7
node scripts/blind-pack.mjs pack --force
node scripts/blind-pack.mjs verify
node scripts/leak-scan.mjs blind        # 汇总结果见 §8（终端只打印计数）
node scripts/summarize.mjs
# Orca 元数据核验
orca orchestration worker-show --dispatch <六个 dispatch 逐一见 §9>
orca orchestration dispatch-show --task task_81f13a9e8ab4
```

r1-07-C 的截图命令实际退出码 1，报 `page.goto: net::ERR_FILE_NOT_FOUND at file:///.../runs/r1-07-C/output/index.html`，完整 stderr 保留在 `runs/r1-07-C/shot-attempt.log`。

## 3. 脚本修改（均在 `scripts/`，可复现）

### 3.1 `scripts/shot.mjs`（修改，逐条原因）

1. **新增可选参数 `--viewports=wide,narrow,1280x800,...`**：07 简报要求额外 1280x800、900x600 两视口；预设 `wide`/`narrow` 名称与尺寸不变，缺省仍为 `wide,narrow`（对 01 简报调用与原脚本完全一致，向后兼容）。自定义视口以 `宽x高` 书写，报告与 PNG 文件名直接使用该规格串（如 `1280x800-fold.png`）。
2. **`report.file` 一律写 HTML 基本名（本批全部为 `index.html`）**：原脚本写完整入参路径，会使 `shots/report.json` 通过 `file` 字段暴露运行 ID；实际源路径由 `runs/<id>/shots/report.json` 的目录定位。全部六个运行一致。
3. **新增 `pageErrors` 字段**：单独记录 `pageerror`（页面未捕获异常），**不并入 `consoleErrors`**，口径独立。本批六个（五实测+一失败）该字段均为 0（r1-07-C 无数据）。
4. **本页 `file://` 绝对路径脱敏**：console/pageerror/请求文本中出现本页 URL 时替换为 `index.html`，避免报告经由报错文本携带绝对路径。本批 consoleErrors 全为空，该逻辑未被触发。
5. `report.viewports` 各项补充记录 `width/height`，便于复算视口口径；截图（fold=视口高、full=整页）、800ms 等待、前 40 次 Tab 巡检（仅 wide 视口）等行为与原脚本一致。

向后兼容验证：对 `test/smoke` 重跑，`tabStops` 与既有 `test/smoke/shots/report.json` 逐字节等值（27 条、27 条可见焦点），`consoleErrors/externalRequests` 同为 0。

### 3.2 新增脚本

- `scripts/blind-pack.mjs`：`pack [--force]` / `verify`。用 `crypto.randomInt` Fisher–Yates 对每个简报**独立**随机分配 X/Y/Z；复制 `runs/<id>/shots/` 与 `output/index.html` 到 `blind/<brief>/<label>/`，**不复制 run-log**；对应关系只写 `blind/<brief>/mapping.json`。未交付运行的目标标签目录只放 `UNAVAILABLE.md`。`verify` 对 HTML+shots 逐文件做 SHA-256 比对，并检查匿名目录内无 `run-log.md`。
- `scripts/leak-scan.mjs`：按模式扫描文本文件（HTML/JSON/MD），输出 `文件:行号: [模式] 片段`。
- `scripts/summarize.mjs`：从各 `runs/<id>/shots/report.json` 机械复算 `runs/summary.csv`（见 §10 口径）。

## 4. 截图与机检结果（真实执行）

| 运行 | 视口（溢出判定） | PNG 数 | consoleErrors | pageErrors | externalRequests | Tab停留/可见焦点 |
|---|---|---|---|---|---|---|
| r1-01-A | wide:false, narrow:false | 4 | 0 | 0 | 0 | 39 / 39 |
| r1-01-B | wide:false, narrow:false | 4 | 0 | 0 | 0 | 39 / 39 |
| r1-01-C | wide:false, narrow:false | 4 | 0 | 0 | 0 | 39 / 39 |
| r1-07-A | wide:false, narrow:false, 1280x800:false, 900x600:false | 8 | 0 | 0 | 0 | 39 / 1 |
| r1-07-B | wide:false, narrow:false, 1280x800:false, 900x600:false | 8 | 0 | 0 | 0 | 40 / 40 |
| r1-07-C | 未测（无 HTML） | 0 | 未测 | 未测 | 未测 | 未测 |

- PNG 尺寸逐一用 IHDR 字节核验：fold 图宽度=视口宽、高度=视口高；full 图宽度=视口宽、高度≥视口高。唯一例外见下条。
- **r1-07-A 窄屏发现（真实不一致）**：`narrow-full.png` 实宽 561px > 视口 390px。探查确认其 `html` 与 `body` 均为 `overflow:hidden`，`documentElement.scrollWidth(390)=clientWidth(390)` 故脚本启发式判 `false`，但 `body.scrollWidth=561`，队列表格（`.queue-table`，宽 593px）在 390px 视口下被裁剪。即：**启发式口径为“否”，页面实际存在超宽被裁剪内容**。此不一致已如实记入 summary 备注列，不改产物、不改日志。r1-07-A 的 run-log 自述“全屏桌面布局（100vw×100vh、overflow:hidden、分区独立滚动）”，与该证据吻合，不构成日志矛盾。
- 焦点启发式（`outlineStyle!=='none'&&outlineWidth>0` 或 `boxShadow!=='none'`）仅为脚本判定，**不构成 WCAG 合规结论**，仍需人工看截图。r1-07-A 仅 1/39 次停留命中启发式，是本批唯一的显著低值，如实记录，不作归因。

## 5. run-log 技能读取判定（按作者日志原文，未改任何日志）

判定规则：A 组不得读取两个设计技能（`skill/uiux-design` 与 `test/baseline-skills/frontend-design`）；B 组只允许 `test/baseline-skills/frontend-design`；C 组只允许 `skill/uiux-design` 及其参考文件。系统提示词自动注入的 CLI 内置技能摘要（`agy-customizations`、`antigravity-guide`，仅名称/路径/简介）两个方向都不计为“读取”。

| 运行 | 日志自述读取 | 判定 |
|---|---|---|
| r1-01-A | 仅简报/素材/自身产物；开工前删除 `skill/ docs/ evals/ test/baseline-skills/`，未读取 | 符合（A） |
| r1-01-B | 另读 `test/baseline-skills/frontend-design/SKILL.md`；删除 `skill/ docs/ evals/` | 符合（B） |
| r1-01-C | 另读 `skill/uiux-design/SKILL.md` + 4 份参考（taste / brand-to-interface / interaction / review-and-evidence）；删除 `docs/ evals/ test/baseline-skills/` | 符合（C） |
| r1-07-A | 仅简报/素材；删除 `skill/ docs/ evals/ test/baseline-skills/`，未读取 | 符合（A） |
| r1-07-B | 另读 `test/baseline-skills/frontend-design/SKILL.md`；删除 `skill/ docs/ evals/` | 符合（B） |
| r1-07-C | 无作者日志 | 未知 |

日志与证据一致性抽核：各日志自述“零外部链接/零外部请求”，机检 `externalRequests=0` 与之相符；r1-01-C 日志自述“未安装 playwright、msedge 无头截图未产出 PNG”，与该产物此前无截图目录相符。未发现日志与证据矛盾之处；r1-07-A 的 overflow 口径差异属启发式局限而非日志不实（见 §4）。

## 6. r1-07-C 失败事实（不重跑、不代写日志）

- Task `task_81f13a9e8ab4` / Dispatch `ctx_44626c62dca7`；input_accepted 2026-10-21 12:01:44 UTC，停止确认约 12:31:57 UTC。结算延迟约 13 秒来自工具执行，**不写作精确 30 分钟**。
- Orca 实测核验：`worker-show --dispatch ctx_44626c62dca7` → `[stopped] stage=process_stopped`（Agent liveness: exited）；`dispatch-show --task task_81f13a9e8ab4` → `[failed]`。
- 事实：无 `runs/r1-07-C/output/index.html`、无作者 run-log、无生成提交。已创建 `runs/r1-07-C/failure.json`（取证元数据，非作者日志）与 `shot-attempt.log`（实际失败输出）。summary 中其一切不可测指标写“未测(原因)”、“未知(无run-log)”，绝不写 0。匿名包中对应标签目录仅 `UNAVAILABLE.md`（只说明限时内未交付、无图可评，不含运行 ID/组别/模型/技能名/映射）。未创建任何 output/index.html 或假截图。

## 7. 匿名化方法与复制校验

- 每个简报独立以 `crypto.randomInt` Fisher–Yates 将 X/Y/Z 分配给该简报三个运行；复制 `shots/`（全部 PNG + report.json）与 `output/index.html` 到 `blind/<brief>/<label>/`，不复制 run-log。对应关系只存在于 `blind/01/mapping.json` 与 `blind/07/mapping.json`。
- **过程事故与处置（如实记录）**：首次对 `blind/` 跑泄漏扫描时，掩码管道（sed）在原始输出之后执行，导致那一刻的 `mapping.json` 内容被回显到终端。处置：立即 `pack --force` 用全新随机分配重打包并重新全量校验，此前回显的对应关系对最终匿名包**已失效**；此后所有对 blind 的扫描仅在终端输出计数与“是否位于 mapping.json”的汇总。最终 mapping.json 未在任何消息、报告或终端输出中再次出现。
- 复制校验结果：`blind-pack.mjs verify` 对 HTML + shots 共 **38 个文件逐一 SHA-256 比对，全部一致（成功，0 失败）**；匿名目录内确认无 `run-log.md`；未交付标签目录确认仅含 `UNAVAILABLE.md`（无 output/、无 shots/）。匿名件与原件字节一致，未做任何事后修改。
- report.json 匿名化元数据调整：`file` 字段统一为 `index.html`（§3.1 第 2 条），本批 report.json 不含任何运行/组路径。

## 8. 泄漏检测

- 扫描模式（大小写不敏感）：`uiux*design`、`frontend*design`、单词 `skill(s)`、`r1*01/r1*07` 运行标识、`C:\Users`/`C:/Users`/`file://` 绝对路径、`workspaces/FrontDesign`、`baseline-skills`。
- 原件（`runs/<id>/output/index.html` + `runs/<id>/shots/report.json`，五个存在运行）：**0 命中**。
- 匿名包（`blind/` 全树）：共 6 命中，**全部位于两个 `mapping.json`（设计指定的唯一映射存放处），标签目录内 0 命中**。由于复制件与原件哈希一致，对原件的扫描即等价于对匿名件内容（HTML/报告）的扫描。
- 局限：PNG 像素内容未做 OCR 文字扫描；但页面可见文字均出自 HTML 源（已扫描），故该局限影响有限。本报告不含发现文件以外的泄漏清单副本，也未在 `blind/` 内放置任何发现报告。

## 9. 模型与调度元数据（六行，来自 Coordinator 逐一确认的 terminal footer + 各 run-log + Orca 实测）

六个生成 worker 均确认为 **Gemini 4 Argon · Medium（思考档 Medium，EFFORT LEVEL 0.20）**；**底层精确 API model ID 未知**（运行环境未暴露，不作猜测）。

| 运行 | Task | Dispatch | 状态（Orca 实测） |
|---|---|---|---|
| r1-01-A | task_3750ec806cae | ctx_4a879447eed5 | succeeded / settled |
| r1-01-B | task_db1edf21fe42 | ctx_167dfbb81366 | succeeded / settled |
| r1-01-C | task_c9e3a998e5d3 | ctx_be7d01e94e37 | succeeded / settled |
| r1-07-A | task_8eb7914d0c62 | ctx_0bc48ef35437 | succeeded / settled |
| r1-07-B | task_f2bc8d07a71c | ctx_c400d85669b8 | succeeded / settled |
| r1-07-C | task_81f13a9e8ab4 | ctx_44626c62dca7 | stopped / process_stopped（§6） |

交叉核验：r1-01-A / r1-01-C / r1-07-A 的 run-log 自述 Task ID 与 Orca 实测一致；r1-01-B、r1-07-B 日志未自述 Task ID，上表以 Orca 实测为准。

## 10. summary.csv 口径（可复算）

- 生成方式：`node scripts/summarize.mjs`，机械读取各 `runs/<id>/shots/report.json`；「run-log技能读取」列为依据 run-log 的人工判定（§5），r1-07-C 行按 §6 写未测/未知。CSV 用引号转义，UTF-8、CRLF。
- **窄屏横向溢出**＝`report.viewports.narrow.horizontalOverflow`（390x844 视口，`documentElement.scrollWidth>clientWidth`）。局限：对根元素 `overflow:hidden` 的页面会漏报被裁剪的超宽内容（r1-07-A 实例见 §4，已在备注列声明）。视口统计范围：01 简报两视口（1440x900、390x844）；07 简报四视口（另加 1280x800、900x600），四视口溢出判定全为 false。
- **控制台错误数**＝该运行全部视口 console error 事件合计（带 `[视口名]` 前缀，可在 report.json 复算）。
- **pageErrors**（页面未捕获异常）单独字段，不混入 consoleErrors；本批全 0，未入 CSV 列、此处记录口径。
- **外部请求数**＝非 `file:/data:/blob:` 协议请求合计（全视口）。
- **Tab停留元素数**＝wide(1440x900) 视口下前 40 次 Tab 中**非空停留记录条数**（`tabStops.length`），**不是去重后的唯一元素数**；同一元素多次停留会重复计数。
- **可见焦点比例**＝`tabStops` 中 `visibleFocusStyle=true` 的条数 / `tabStops.length`（分母即上一列）；启发式＝outline 或 box-shadow 计算样式（§4），**不构成 WCAG 合规结论**。
- r1-07-C 行：全部不可测指标写“未测(产物未交付，无HTML)”等明确原因，技能读取写“未知(无run-log)”，不写 0。

## 11. 烟测报告数字更正（只记录，不改原件）

`test/preparation-report.md` 第 77/124 行写 tabStops “30 次停留”，已提交的 `test/smoke/shots/report.json` 实际为 **27 条**（本轮重跑亦逐字节复现为 27/27 可见焦点）。按指示不修改原烟测报告与原作者日志，仅在此更正记录。

## 12. 行政记录（来自 Coordinator，如实转记）

1. 最初六份生成 Task 说明因 PowerShell 管道编码损坏，在任何 worker 派发前作废并重建，未造成重复生成。
2. 本次取证/评审 Task 调整了依赖以容纳真实的 r1-07-C 超时失败，属取证范围调整，不是生成重跑。

## 13. 基准无差异与未改动声明

- `git diff c3c6945 HEAD -- skill/ test/briefs test/materials test/baseline-skills docs/ evals/ README.md CHANGELOG.md package.json package-lock.json .gitignore` 为空：**固定素材、skill/、简报与基准技能与准备提交零差异**（`scripts/shot.mjs` 的改动是本任务获准范围，发生于本报告提交）。
- 五份存在产物 HTML 在取证前后 SHA-256 逐一比对**字节不变**：r1-01-A `33ab3a90…f50727`、r1-01-B `3d68b00e…7c174b1`、r1-01-C `85a9bcfd…eb69a01`、r1-07-A `aa6604c5…1b56d4ab`、r1-07-B `16d02be8…da22c0307`（完整值见下）。未改任何 `runs/<id>/output/index.html`、`run-log.md`、`skill/`、固定简报素材；未推送、未动 main。
- 未验证/局限汇总：PNG 未做 OCR 文字扫描（§8）；焦点样式为启发式（§4/§10）；r1-07-C 一切指标未测（§6）；盲评映射未经第三方复核（设计上仅存在于 mapping.json）。

HTML SHA-256（取证结束时）：

```
33ab3a9003cf19a4d29a5f861e9e292308c81cc806e06c77524ab0e505f50727  runs/r1-01-A/output/index.html
3d68b00eb3d17d9a72b48baa68af334968074a59a224ba6030dbf04fd7c174b1  runs/r1-01-B/output/index.html
85a9bcfda495137da45cb7d8bcc72ea519b5bea29ca94a388229974c9eb69a01  runs/r1-01-C/output/index.html
aa6604c58887537b2c59ddc0ac4e8ef3fcfc0a330f720bdd353db7221b56d4ab  runs/r1-07-A/output/index.html
16d02be89c953148157a3a14c8b593d8402fd281a1f93d89df7f9d6da22c0307  runs/r1-07-B/output/index.html
```
