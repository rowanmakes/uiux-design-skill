# uiux-design-skill

我自己的 UI/UX 设计 Skill：从产品描述出发，做出留白、干净、简约、大气、干练，而且一眼不像 AI 模板的界面。

**当前状态：v0.7。官网电影感方向已得到用户正面评价（实验 E2），其余部分仍待测试。** 下一步是跑基线对照（见 `docs/playbook.md`）。

## 目录

```
skill/uiux-design/          Skill 本体，整个目录复制到 agent 的 skills 文件夹即可
  SKILL.md                  主流程
  references/
    research.md             先问清楚、找同类与跨品类参考
    taste.md                品味：把"高级感"写成参数、骨架、素材、中文规则和自检
    app.md                  手机 App 与桌面客户端：平台规范、手感、状态、跨平台取舍
    workbench.md            桌面工作台：面板系统、画布、键盘、密度、持久化
    ai.md                   AI 界面：等待、掌控、对话、生图、智能体、信任
    interaction.md          交互、反馈与 UX：流程、反馈、状态、导航、表单、出错与撤销、文案、可访问性
    brand-to-interface.md   定位、品牌原则转界面、案例
    review-and-evidence.md  双线评审、问题卡、证据边界
    skill-landscape.md      外部设计技能清单与评估状态
evals/evals.json            7 个测试简报（网页 4 个、手机 1 个、桌面工作台 1 个、AI 智能体 1 个）
docs/playbook.md            本地 agent 测试与迭代手册（含提示词）
docs/research/              原始笔记与外部技能调研
scripts/shot.mjs            宽窄屏截图与机检脚本（Playwright）
scripts/ref-shot.mjs        参考网站截图脚本
docs/coverage.md            覆盖矩阵：哪些场景有证据、哪些只写了规则
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

- 一次只改一处，先有证据再改。
- 结论只写"初步信号"，样本足够、可复现之前不说"更强"。
- 留出简报 05 不参与调参，只在最后验证用一次。
