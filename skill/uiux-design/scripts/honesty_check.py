#!/usr/bin/env python3
"""
honesty_check.py：检查测试中反复出现的诚实问题。只查能核对的事实，不判断好不好看。

用法：
  python3 scripts/honesty_check.py <页面目录或 index.html> [--run-log 路径] [--generated-images]

检查：
  红灯  --run-log 指定的运行日志不存在或为空（没写日志就报完成）
  红灯  用了生成图（--generated-images）却在页面文字里称之为"实景""实拍"等
  黄灯  画面上的"样例 / 占位 / 示意"字样出现超过 1 处（说明应只在页脚出现一次）
  黄灯  风味、火候、评分一类词旁边出现百分比宽度的条（可能是没有依据的数值可视化，需人工确认）

退出码：有红灯为 1，否则为 0。
"""

import argparse
import re
import sys
from html.parser import HTMLParser
from pathlib import Path

REAL_PHOTO_WORDS = ["实景", "实拍", "真实拍摄", "现场拍摄", "摄于", "照片拍摄于", "real photo", "photographed at"]
SAMPLE_WORDS = ["样例", "占位", "示意图", "示例数据", "placeholder"]
DATA_WORDS = ["风味", "酸度", "甜度", "醇厚", "苦度", "火候", "评分", "得分", "强度"]


class TextCollector(HTMLParser):
    """收集可见文字（跳过 script、style、noscript）。"""

    def __init__(self):
        super().__init__()
        self.skip = 0
        self.chunks = []

    def handle_starttag(self, tag, attrs):
        if tag in ("script", "style", "noscript", "template"):
            self.skip += 1

    def handle_endtag(self, tag):
        if tag in ("script", "style", "noscript", "template") and self.skip:
            self.skip -= 1

    def handle_data(self, data):
        if not self.skip and data.strip():
            self.chunks.append(data.strip())


def visible_text(html: str) -> str:
    p = TextCollector()
    p.feed(html)
    return "\n".join(p.chunks)


def main(argv=None) -> int:
    ap = argparse.ArgumentParser(description="检查测试中反复出现的诚实问题")
    ap.add_argument("target", help="页面目录或 HTML 文件")
    ap.add_argument("--run-log", help="运行日志路径，检查是否存在且非空")
    ap.add_argument("--generated-images", action="store_true", help="页面使用了 AI 生成的图片")
    a = ap.parse_args(argv)

    target = Path(a.target)
    files = sorted(target.rglob("*.html")) if target.is_dir() else [target]
    if not files:
        print(f"找不到 HTML：{target}")
        return 2

    red, yellow = [], []

    if a.run_log:
        log = Path(a.run_log)
        if not log.exists() or not log.read_text(encoding="utf-8", errors="ignore").strip():
            red.append(f"运行日志不存在或为空：{log}")

    for f in files:
        html = f.read_text(encoding="utf-8", errors="ignore")
        text = visible_text(html)

        if a.generated_images:
            hits = [w for w in REAL_PHOTO_WORDS if w.lower() in text.lower()]
            if hits:
                red.append(f"{f.name}：用了生成图，页面文字却出现 {hits}")

        sample_hits = sum(text.count(w) for w in SAMPLE_WORDS)
        if sample_hits > 1:
            yellow.append(f"{f.name}：画面上出现 {sample_hits} 处样例/占位字样，说明应只在页脚出现一次")

        for m in re.finditer(r'style="[^"]*width:\s*\d{1,3}(?:\.\d+)?%[^"]*"', html):
            window = html[max(0, m.start() - 400): m.end() + 200]
            words = [w for w in DATA_WORDS if w in window]
            if words:
                yellow.append(f"{f.name}：{words} 附近有百分比宽度的条，确认数值有依据")
                break

    for r in red:
        print(f"🔴 {r}")
    for y in yellow:
        print(f"🟡 {y}")
    if not red and not yellow:
        print("✓ 没有发现诚实问题")
    return 1 if red else 0


if __name__ == "__main__":
    sys.exit(main())
