// scripts/summarize.mjs  从 runs/<id>/shots/report.json 复算 runs/summary.csv
// 用法: node scripts/summarize.mjs
// 说明: 前七列纯机械来自 report.json（可复算）；「run-log技能读取」列是依据
//       runs/<id>/run-log.md 的人工判定（判定依据见 runs/evidence-report.md），
//       r1-07-C 无作者日志，写「未知(无run-log)」，不可测指标一律写「未测(原因)」，不写 0。
import fs from 'node:fs';
import path from 'node:path';

const RUNS = [
  { id: 'r1-01-A', brief: '01', group: 'A' },
  { id: 'r1-01-B', brief: '01', group: 'B' },
  { id: 'r1-01-C', brief: '01', group: 'C' },
  { id: 'r1-07-A', brief: '07', group: 'A' },
  { id: 'r1-07-B', brief: '07', group: 'B' },
  { id: 'r1-07-C', brief: '07', group: 'C' }, // 未交付：无 report.json，见 failure.json
];

// 依据各 run-log.md 人工判定（证据见 runs/evidence-report.md 第 5 节）
const SKILL_READ = {
  'r1-01-A': '是(未读取任何设计技能，符合A组要求)',
  'r1-01-B': '是(仅读取 test/baseline-skills/frontend-design/SKILL.md)',
  'r1-01-C': '是(仅读取 skill/uiux-design/SKILL.md 及4份参考)',
  'r1-07-A': '是(未读取任何设计技能，符合A组要求)',
  'r1-07-B': '是(仅读取 test/baseline-skills/frontend-design/SKILL.md)',
  'r1-07-C': '未知(无run-log)',
};

// 人工备注（可核验的实测事实，非评分）
const NOTES = {
  'r1-07-A': '窄屏启发式为否，但 html/body 均为 overflow:hidden：body.scrollWidth=561>390，narrow-full.png 实宽561px，内容被裁剪（详见 evidence-report）',
  'r1-07-C': '限时内未交付：无HTML/无作者日志/无生成提交；截图命令实际尝试并失败(net::ERR_FILE_NOT_FOUND)，见 runs/r1-07-C/failure.json 与 shot-attempt.log',
};

const esc = (v) => {
  const s = String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

const rows = [['运行ID', '简报', '组', '窄屏横向溢出', '控制台错误数', '外部请求数', 'Tab停留元素数', '有可见焦点样式的比例', 'run-log是否显示读取了正确的技能文件', '备注']];
for (const r of RUNS) {
  const reportPath = path.join('runs', r.id, 'shots', 'report.json');
  if (!fs.existsSync(reportPath)) {
    rows.push([r.id, r.brief, r.group, '未测(产物未交付，无HTML)', '未测(无HTML)', '未测(无HTML)', '未测(无HTML)', '未测(无HTML)', SKILL_READ[r.id], NOTES[r.id] || '']);
    continue;
  }
  const rep = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
  const n = rep.tabStops.length;
  const focused = rep.tabStops.filter((t) => t.visibleFocusStyle).length;
  const overflow = rep.viewports.narrow ? String(rep.viewports.narrow.horizontalOverflow) : '未测';
  rows.push([
    r.id, r.brief, r.group,
    overflow,
    rep.consoleErrors.length,
    rep.externalRequests.length,
    n,
    `${focused}/${n}(${n ? ((focused / n) * 100).toFixed(1) : '0'}%)`,
    SKILL_READ[r.id],
    NOTES[r.id] || '',
  ]);
}
fs.writeFileSync('runs/summary.csv', rows.map((row) => row.map(esc).join(',')).join('\r\n') + '\r\n', 'utf8');
console.log('runs/summary.csv 已生成（' + (rows.length - 1) + ' 行数据）');
