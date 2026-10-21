// scripts/blind-pack.mjs  用法:
//   node scripts/blind-pack.mjs pack    [--force]   为每个简报独立随机分配 X/Y/Z 并复制匿名包
//   node scripts/blind-pack.mjs verify              仅校验匿名包与原件哈希一致
// 说明: 映射关系只写入 blind/<brief>/mapping.json；本脚本终端输出不含任何「标签->运行」对应关系。
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const mode = process.argv[2];
const briefs = {
  '01': ['r1-01-A', 'r1-01-B', 'r1-01-C'],
  '07': ['r1-07-A', 'r1-07-B', 'r1-07-C'],
};
const LABELS = ['X', 'Y', 'Z'];
const sha256 = (p) => crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = crypto.randomInt(0, i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function copyTree(srcDir, dstDir) {
  fs.mkdirSync(dstDir, { recursive: true });
  for (const f of fs.readdirSync(srcDir)) {
    fs.copyFileSync(path.join(srcDir, f), path.join(dstDir, f));
  }
}

function pack() {
  const forced = process.argv.includes('--force');
  for (const [brief, runs] of Object.entries(briefs)) {
    const blindDir = path.join('blind', brief);
    const mappingPath = path.join(blindDir, 'mapping.json');
    if (fs.existsSync(mappingPath) && !forced) {
      console.log(`blind/${brief}: mapping.json 已存在，跳过（用 --force 重打包）`);
      continue;
    }
    fs.rmSync(blindDir, { recursive: true, force: true });
    const labels = shuffle(LABELS);
    const mapping = { brief, labels: {} };
    runs.forEach((run, i) => {
      const label = labels[i];
      mapping.labels[label] = run;
      const dst = path.join(blindDir, label);
      const outHtml = path.join('runs', run, 'output', 'index.html');
      if (!fs.existsSync(outHtml)) {
        // 未交付：仅放 UNAVAILABLE.md，不伪造 output/HTML/截图
        fs.mkdirSync(dst, { recursive: true });
        fs.writeFileSync(
          path.join(dst, 'UNAVAILABLE.md'),
          '# 该作品未在限时内交付\n\n对应的生成运行未在规定时间上限内交付可浏览的产物，没有可评审的 HTML 或截图，也未为其伪造任何占位成品。\n'
        );
        return;
      }
      copyTree(path.join('runs', run, 'shots'), path.join(dst, 'shots'));
      fs.mkdirSync(path.join(dst, 'output'), { recursive: true });
      fs.copyFileSync(outHtml, path.join(dst, 'output', 'index.html'));
    });
    fs.writeFileSync(mappingPath, JSON.stringify(mapping, null, 2));
    console.log(`blind/${brief}: 已随机分配 ${LABELS.join('/')} 并复制（细节见 blind/${brief}/mapping.json）`);
  }
}

function verify() {
  let fail = 0, checked = 0;
  for (const [brief, runs] of Object.entries(briefs)) {
    const mapping = JSON.parse(fs.readFileSync(path.join('blind', brief, 'mapping.json'), 'utf8'));
    for (const run of runs) {
      const label = Object.keys(mapping.labels).find((l) => mapping.labels[l] === run);
      const dst = path.join('blind', brief, label);
      const outHtml = path.join('runs', run, 'output', 'index.html');
      if (!fs.existsSync(outHtml)) {
        const ok = fs.existsSync(path.join(dst, 'UNAVAILABLE.md')) && !fs.existsSync(path.join(dst, 'output')) && !fs.existsSync(path.join(dst, 'shots'));
        console.log(`blind/${brief}: 未交付标签目录检查 -> ${ok ? 'OK（仅 UNAVAILABLE.md）' : 'FAIL'}`);
        if (!ok) fail++;
        continue;
      }
      // 逐文件哈希比对（HTML + shots 下全部文件），只输出结果，不输出标签对应关系
      const pairs = [[outHtml, path.join(dst, 'output', 'index.html')]];
      for (const f of fs.readdirSync(path.join('runs', run, 'shots'))) {
        pairs.push([path.join('runs', run, 'shots', f), path.join(dst, 'shots', f)]);
      }
      for (const [src, cp] of pairs) {
        checked++;
        if (!fs.existsSync(cp) || sha256(src) !== sha256(cp)) { fail++; }
      }
      const runLogLeak = fs.existsSync(path.join(dst, 'run-log.md'));
      if (runLogLeak) { fail++; }
    }
  }
  console.log(`复制件哈希校验: 比对文件 ${checked} 个, 失败 ${fail} 个 -> ${fail === 0 ? '全部一致(成功)' : '存在不一致(失败)'}`);
  if (fail > 0) process.exit(1);
}

if (mode === 'pack') pack();
else if (mode === 'verify') verify();
else {
  console.error('用法: node scripts/blind-pack.mjs pack [--force] | verify');
  process.exit(1);
}
