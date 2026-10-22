# 测试手册（Orca 编排）

用本地 agent 测试和迭代这个 Skill 的固定做法。旧版手册（三组对照、单 agent）已按测试经验重写。

## 角色

| 角色 | 谁 | 做什么 |
| --- | --- | --- |
| 协调者 | Codex（Orca 主编排） | 拆任务、派工、汇总，不自己改代码 |
| 生图 | Codex worker | 用内置生图生成场景候选和后续画面 |
| 建页 | Antigravity；需要模型对比时再加一个 Codex worker | 按 Skill 做页面 |
| 准备、截图、整理 | OMP | 环境、录屏、对比页、匿名包 |
| 独立评审 | 另一个 Codex worker | 只看网址、截图、录屏、DESIGN.md 和简报 |
| 裁判 | 用户 | 最终判断"可以 / 不行 / 差在哪" |

## 开跑前检查

- **无人值守时，Codex worker 必须免授权启动。** E2 的 3 个 Codex 建页任务就是卡在授权请求上。Codex 命令行一般用审批方式加沙箱两项设置，例如 `--ask-for-approval never --sandbox workspace-write`（以 `codex --help` 为准），并在 Orca 的 worker 设置里传入。先在人在场时试一次，确认 worker 启动后能直接开工。不要用完全绕过沙箱的选项。
- 每个子 worktree 能运行截图脚本：Node 18 以上、`npm i -D playwright`、Python 3 加 `pip install playwright pillow`、Chromium。
- 生成阶段的 agent 只读 `skill/uiux-design/` 和本次的简报、素材；不读 `docs/`、`runs/`、其他运行的产物。

## 固定流程

1. **准备（OMP）：** 简报和固定素材写进 `test/`；确认截图与录屏脚本能跑。
2. **生成（按 Skill 的 8 步）：** 第 1–5 步结束时停下，把参考板、三个方向的截图和方向卡给用户。
3. **用户确认：** 感觉对不对、有没有漏掉喜欢的、有没有加入不喜欢的（`references/design-md.md` 的确认清单）。
4. **深化与检查：** 写 DESIGN.md → 深化 → 第 8 步三层检查（含两个脚本）。
5. **整理（OMP）：** 宽屏和窄屏录屏、对比页、匿名包；结果推到 `test/<实验名>` 分支，不动 main。
6. **用户评判，记进 `docs/tests/<实验名>.md`，** 有新的喜欢或不喜欢就补进 `taste.md` 和确认清单。

## 记录要求

- 每个运行写 `run-log.md`：实际读了哪些文件、每步做了什么决定、看截图发现了什么、改了什么、没验证的、耗时。没写完不能报告完成。
- 运行结束跑 `python3 skill/uiux-design/scripts/honesty_check.py <页面目录> --run-log <日志> [--generated-images]`，红灯就退回。
- 记录模型和思考强度。

## 通用提示词

### 建页（发给 Antigravity 或 Codex worker）

```
开始前阅读 skill/uiux-design/SKILL.md，按它的流程和它要求的参考文件工作。$SKILL 指 skill/uiux-design。
任务：{简报}。素材只用 {素材文件}，不编造评价、销量、合作方。
{阶段说明：例如"做到第 5 步停下"或"用户已选定方向 X，从第 6 步开始"}
产物写到 runs/{运行ID}/，只提交这个目录。结束时写 runs/{运行ID}/run-log.md。时间上限 {N} 分钟。
```

### 独立评审（发给另一个 Codex worker）

```
你是设计评审，不知道这些页面是怎么做出来的，也不要猜。
读：{网址或 HTML}、{截图和录屏}、{DESIGN.md}、{简报}。不要读源代码以外的制作记录、日志或之前的评分。
1. 打开页面，从头滚到底再滚回来，对照 DESIGN.md 检查视觉层级、间距、移动端适配、各页面之间的一致性。
2. 跑 python3 skill/uiux-design/scripts/design_lint.py check {页面} 和 honesty_check.py，把结果附上。
3. 按 skill/uiux-design/references/review-and-evidence.md 的问题卡格式写问题，分"必须修复"和"审美建议"。
4. 写一句：这个设计换成同类另一个品牌是否也成立。
5. 写明无法判断的部分。结果写到 reviews/{名字}.md。
```

## 下一个实验：E3 完整流程

见 `docs/tests/e3-plan.md`。
