# recorder 冒烟 · scroll-record.mjs

对 `scripts/scroll-record.mjs`（滚动录像取证脚本）的最小冒烟：夹具 + 双视口实跑证据 + 验证记录。生成于 2026-10-21。

## CLI

```sh
npm ci                          # playwright 1.64.1（package-lock 已锁定）
npx playwright install chromium # 本机已有 chromium-1248 时秒过
node scripts/scroll-record.mjs <本地html> <输出目录> [--reduced-motion]
```

- 视口固定 1440x900 与 390x844，各录一段 webm（recordVideo 尺寸=视口尺寸）。
- 时间线（每视口约 25s，两视口共约 53s 墙钟，含浏览器启动）：加载 file:// 页面 → 等 load+字体+图片 → 顶部静置 3s（进视频）→ 匀速线性滚动 top→bottom 约 20s（页内 RAF 驱动，`performance.now()` 实测计时，每小步 `scrollTo({behavior:'instant'})`，站点 CSS `scroll-behavior:smooth` 不会与驱动打架）→ 底部静置 2s（进视频）→ 关 context 落盘。
- 滚动中在进度 1/3、2/3 处截图时会暂停驱动约 0.3s（暂停时长不计入 20s），保证截图与记录位置一致；视频里表现为两次极短停顿，无跳变。
- 输出：`<vp>-scroll.webm`、`<vp>-01-start/02-third/03-two-thirds/04-end.png`（文件名带视口宽度标签）、`report.json`（真实计时、轨迹采样、截图/视频路径与实际 scrollY、console/page 错误、失败请求、failures）。
- 退出码：0 全部成功；1 CLI 用法错误（缺参/多参/文件不存在）；2 部分或全部视口失败（report.json 仍写出）。
- 动态高度：驱动每帧重读 `scrollHeight`，页面长高/变矮都贴住真实底部；短页（无可滚动距离）如实记录 `shortPage:true` 并拍同位截图。
- 默认完整保留站点动画/CSS；`--reduced-motion` 仅在显式传入时向页面模拟 reduce（已单独实跑验证 exit 0，其输出不入库）。

## 夹具 fixture.html

自包含无外部资源：7×700px 带编号的位置标记节、粘性深色头（含持续脉冲动画点，证明未禁用动画）、右下角固定读数框 `scroll NNNNpx / MMMMpx`（位置唯一编码）。故意设置 `html{scroll-behavior:smooth}`，验证驱动每步显式 instant 不被站点 smooth 拖拽。载入 4s 后显示 LATE SECTION（约 +796px），实跑覆盖"页面动态高度"路径（实测 1440x900：5716→6512px）。

## 本次证据（evidence/）

- `1440x900-scroll.webm`（4.5MB，vp9，1440x900，25fps，25.12s）、`390x844-scroll.webm`（1.7MB，vp9，390x844，25fps，26.52s）
- 8 张截图：两视口各 4 张，记录位置 0 / ~1/3 / ~2/3 / 底（1440x900：0/1880/3760/5612；理论线性值 0/1870/3740/5612）
- `frames/`：两段视频各 5 张抽样帧（t=0.5/6/13/20/24s）
- `report.json`：本次运行完整报告（scrollActualMs=20001/20001，reachedBottom=true，0 console/page 错误）

## 验证方法与结果（如实标注：抽样帧 + 度量，非全片播放回看）

无视频视觉模型可用，采用 ffprobe 元数据 + ffmpeg 抽帧 + PSNR 模板匹配，属部分验证：

1. **容器/维度/时长**：ffprobe 通过，见上（尺寸与视口精确一致、非空、时长≈时间线）。
2. **首末锚点**：t=0.5s 帧对"顶部参考渲染"PSNR 41.5dB(宽)/36.4dB(窄)，t=24s 帧对"底部参考渲染" 40.6dB/34.2dB——开头 3s 顶部停留与结尾 2s 底部停留确实在视频里。
3. **中段匀速**：右下读数框区域模板匹配定位各帧实际位置：宽视口 t6/13/20 → 1250/3000/5000px（间隔 7s 位移 1750/2000px ≈ 280px/s，与 5612px/20s 吻合，单调递增）；窄视口 t13/t20 → 2750/4750px（≈286px/s）。窄视口 t6 帧因 vp9 压缩小字不可辨（16.2dB 并列），该帧定位失败，如实标注。
4. **截图差异**：同视口不同标签截图两两 PSNR 13.6–17.7dB（显著不同画面）；04-end 记录 scrollY=5612/5685=endMaxScroll（真到底）。
5. **CLI 错误路径**：缺参/多参/文件不存在均打印用法/原因并 exit 1。

## 局限

- 抽样帧验证，未逐帧全片回看；无人工视觉复核。
- 视频时长与时间线的差（25.12 vs 26.52s）来自各视口无头 RAF 首帧预热差异（驱动已从首帧起算 20s）。
- 滚动中两次 ~0.3s 截图停顿为设计行为（见 CLI 节）。
- webm 为 vp9/25fps，Playwright 录制默认码率，小字号在窄视口压缩后不可辨（见验证 3）。

## 复现

```sh
npm ci && npx playwright install chromium
node scripts/scroll-record.mjs test/e2/recorder-smoke/fixture.html test/e2/recorder-smoke/evidence
# 墙钟约 53s（每视口约 25.6s + 启动）；随后按上节 1–4 用 ffprobe/ffmpeg 复核
```
