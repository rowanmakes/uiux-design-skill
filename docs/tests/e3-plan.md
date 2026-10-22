# 实验 E3 计划：首页 → 产品页 → 订单页 完整流程

## 要回答的问题

1. 完整的 8 步流程（先问清楚、找同类、生图、三份种子出三个方向、用户确认、DESIGN.md、深化、三层检查）能不能稳定产出用户认可的页面？
2. 电影感能不能延伸到产品页和订单页：质感保留、音量降低、切换连贯，而且订单页清楚好用？
3. 两个建页模型（Antigravity、Codex）在同样素材和流程下差别多大？
4. 三个方向会不会又趋同（用 `design_lint.py compare` 量）？

## 条件

- Skill 版本：做实验时 main 上的最新版本，记录提交号。
- 简报：咖啡订阅官网（简报 01）扩展为三页：首页、单款豆子的产品页、订阅下单页（含付款失败状态）。
- 素材：沿用 `test/materials/01.md`；可用 Codex 生成图片。
- 两套完全独立：Antigravity 一套、Codex 一套，各自从第 1 步做起。
- 需要用户在场两次：第 5 步挑方向、最后评判。

## 发给协调者的提示词（第一段：做到挑方向为止）

```
今天的需求：实验 E3，用 skill/uiux-design 的完整流程做"半山烘焙"的首页、产品页、订阅下单页，比较 Antigravity 和 Codex 两套。计划见 docs/tests/e3-plan.md，测试规则见 docs/playbook.md。先确认 Codex worker 已经设为免授权启动。

阶段 1（OMP）：
- 把简报写成 test/briefs/03-full.md：在 test/briefs/01.md 基础上，交付三页：首页、单款豆子的产品页（以云雾水洗为例）、订阅下单页（含付款失败和提交中状态）。素材沿用 test/materials/01.md。
- 确认每个 worktree 能运行 skill/uiux-design/scripts/ 下的 shot.mjs、ref-shot.mjs、design_lint.py、honesty_check.py。
- 完成后合入主 worktree。

阶段 2（并行两个 Task：一个派给 Antigravity，一个启动 Codex worker；生图都由各自调用 Codex 生图 worker 完成，或在汇报中说明谁生成的）：
---
开始前阅读 skill/uiux-design/SKILL.md，按它的流程和要求的参考文件工作。$SKILL 指 skill/uiux-design。
任务：test/briefs/03-full.md，素材只用 test/materials/01.md。
本阶段做 Skill 的第 1–5 步：
- 第 1 步的问题不要真的问我，写成"假设"放进 research.md；
- 第 2 步做参考板（按 references/research.md 的来源和挑法，拿真实截图）；
- 第 3 步生成主视觉候选；
- 第 4 步用三份不同的 DESIGN.md 种子做三个首屏方向，运行 design_lint.py compare 和 ledger check；
- 第 5 步停下：把参考板、三个方向的截图、方向卡、compare 结果整理好，不要自己选。
产物写到 runs/e3-{agy|codex}/，只提交这个目录；写 run-log.md。时间上限 90 分钟。
---

阶段 3（OMP）：做一个对比页 runs/e3-directions.html，按"甲套 / 乙套"分两组（不写模型名），每组展示参考板和三个方向的宽窄屏截图与方向卡；对应关系写在 runs/e3-mapping.json。推送到分支 test/exp-e3，然后停下来等我挑方向。
```

## 第二段提示词（用户挑完之后）

```
用户的选择：甲套选 {方向}，意见：{…}；乙套选 {方向}，意见：{…}。
请各自继续 Skill 的第 5 步后半到第 8 步：写 DESIGN.md（先不改代码，写完直接继续，不用等我）→ 深化三个页面 → 第 8 步三层检查（独立评审派一个新的 Codex worker，按 docs/playbook.md 的评审提示词）。
产物继续写在 runs/e3-{agy|codex}/。最后 OMP 用录屏脚本录三页的宽屏和窄屏，做对比页 runs/e3-compare.html（甲乙不写模型名），推送到 test/exp-e3，汇报每个 Task 是否成功、耗时、检查脚本结果。
```

## 用户评判时看什么

- 首页有没有打动你；三页是不是同一个世界。
- 产品页和订单页：质感还在吗？信息清楚吗？下单顺不顺？付款失败时体验如何？
- 页面之间的切换。
- 甲乙两套哪个更好，差在哪。
