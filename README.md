# uiux-design-skill

我自己的 UI/UX 设计 Skill：从产品描述出发，做出留白、干净、简约、大气、干练，而且一眼不像 AI 模板的界面。

**当前状态：v0.13。** 有证据的只有一个场景：消费品牌官网首页（实验 E2，用户评价"确实可以"）。其余见 `docs/coverage.md`。下一步是实验 E3（`docs/tests/e3-plan.md`）。

## 目录

```
skill/uiux-design/          Skill 本体，整个目录复制到 agent 的 skills 文件夹即可
  SKILL.md                  主流程（8 步）
  references/
    research.md             先问清楚、找同类与跨品类参考
    design-md.md            DESIGN.md 模板、种子起步、用户确认清单
    taste.md                官网品味：电影感、滚动叙事、形式疲劳、中文规则
    workbench.md            桌面工作台：极客感
    app.md                  手机 App 与桌面客户端
    ai.md                   AI 界面
    interaction.md          交互、反馈与 UX，含结账与定价清单
    review-and-evidence.md  评审、独立评审交接、证据边界
    brand-to-interface.md   品牌定位与品牌原则转界面
  scripts/
    design_lint.py          检查红灯与模板装饰、比较三个方向、外观账本（来自 huashu-design）
    honesty_check.py        检查诚实问题：日志、"实景"、样例标签、无依据的数值条
    shot.mjs                宽窄屏截图与机检
    ref-shot.mjs            参考网站截图
  THIRD_PARTY_NOTICES.md    第三方代码许可
evals/evals.json            测试简报
docs/playbook.md            Orca 测试手册与通用提示词
docs/tests/                 每次实验的记录与 E3 计划
docs/retro-2026-10-21.md    复盘与参考仓库重读
docs/coverage.md            覆盖矩阵
docs/ablation-plan.md       哪些内容待验证是否多余、怎么测
docs/research/              原始笔记与外部技能调研
library/                    参考库：用户的品味参考、按品类沉淀的参考网站
CHANGELOG.md                每次改动的现象、假设、改动与结果
```

## 安装

```bash
# Claude Code
cp -r skill/uiux-design ~/.claude/skills/uiux-design
# Codex
cp -r skill/uiux-design ~/.codex/skills/uiux-design
```

测试时注意隔离：跑"无技能"基线时，用户级技能目录里不能有它。

## 工作原则

- 先测试，再加规则；测试结果出来之前不扩充 Skill。
- 用户是裁判；评审 agent 的分数只作参考。
- 反复出现的问题做成检查脚本，而不是再写一句"注意"。
- 结论只写"初步信号"，样本足够、可复现之前不说"更强"。
- 留出简报 05 不参与调参，只在最后验证用一次。
