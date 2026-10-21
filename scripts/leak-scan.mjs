// scripts/leak-scan.mjs  匿名化泄漏扫描
// 用法: node scripts/leak-scan.mjs <文件或目录>...
// 输出: 每个命中 <文件>:<行号>: <模式> | <片段>；目录会递归扫描文本文件。
import fs from 'node:fs';
import path from 'node:path';

const PATTERNS = [
  ['skill-name-uiux', /uiux[\s_-]*design/i],
  ['skill-name-frontend', /frontend[\s_-]*design/i],
  ['word-skill', /\bskills?\b/i],
  ['run-id-r1', /r1[\s_-]*0[17]/i],
  ['abs-path', /C:\\+Users|C:\/+Users|file:\/\//i],
  ['workspaces-path', /orca[\s_-]*workspaces|workspaces[\s_-]*FrontDesign/i],
  ['baseline-skills-path', /baseline[\s_-]*skills?/i],
];

function scanFile(p, root) {
  const hits = [];
  let content;
  try {
    content = fs.readFileSync(p, 'utf8');
  } catch {
    return hits; // 二进制(PNG 等)跳过
  }
  const rel = path.relative(root, p) || p;
  content.split(/\r?\n/).forEach((line, i) => {
    for (const [name, re] of PATTERNS) {
      if (re.test(line)) hits.push(`${rel}:${i + 1}: [${name}] ${line.trim().slice(0, 160)}`);
    }
  });
  return hits;
}

function walk(p) {
  const stat = fs.statSync(p);
  if (stat.isFile()) return [p];
  if (stat.isDirectory()) {
    return fs.readdirSync(p).flatMap((f) => walk(path.join(p, f)));
  }
  return [];
}

const roots = process.argv.slice(2);
let total = 0;
for (const root of roots) {
  for (const f of walk(root).sort()) {
    const hits = scanFile(f, root);
    for (const h of hits) { console.log(h); total++; }
  }
}
console.log(`TOTAL_HITS=${total}`);
