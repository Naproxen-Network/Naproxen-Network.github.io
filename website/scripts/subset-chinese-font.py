#!/usr/bin/env python3
"""Build a compact, self-hosted Chinese serif font for this site's current copy.

Requires fonttools[woff] (including Brotli). Download the source from the
Google Fonts Noto Serif SC directory and retain its OFL.txt beside the output.

Usage (from project root):
  python scripts/subset-chinese-font.py '/path/to/NotoSerifSC[wght].ttf'
  python scripts/subset-chinese-font.py FONT --project-root PATH --output FILE

Run again after introducing Chinese characters that are not yet in the site.
The font keeps a continuous variable weight range of 400–700.
"""
from __future__ import annotations

import argparse
from pathlib import Path
import json
from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

EXTRA_TEXT = (
    '人工智能 大模型智能体 网络科学与工程 其他事情 游泳 我喜欢游泳 '
    '学习经历 清华大学 山东大学 国家奖学金 关于我 最新动态 学术论文 荣誉奖励 '
    '首页 联系我 中文 深色 浅色 模式 博士 本科生 即将加入 第一作者 已录用 '
    '论文 代码 研究兴趣 放大配图 关闭配图 电子工程系 计算机科学与技术 '
    '谷炳桥 李栋 教授 导师 年 月 日 获得 连续三年 '
    '，。；：！？、（）【】《》“”‘’—…·–'
)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('font', type=Path, help='Official Noto Serif SC variable TTF')
    parser.add_argument('--project-root', type=Path, default=Path.cwd())
    parser.add_argument('--output', type=Path)
    args = parser.parse_args()
    project = args.project_root.resolve()
    if not (project / 'src').is_dir():
        parser.error('--project-root must contain src/')
    output = args.output or project / 'public/fonts/noto-serif-sc-subset.woff2'
    source_files = sorted(p for p in (project / 'src').rglob('*') if p.suffix in {'.ts', '.tsx', '.css'})
    text = EXTRA_TEXT + ''.join(p.read_text(encoding='utf-8') for p in source_files)
    # Keep ASCII and typographic punctuation so the font can render independently.
    codepoints = set(map(ord, text)) | set(range(0x20, 0x7F))
    font = TTFont(args.font)
    cmap = font.getBestCmap()
    supported = codepoints & set(cmap)
    missing_cjk = sorted(cp for cp in codepoints if 0x3400 <= cp <= 0x9FFF and cp not in cmap)
    if missing_cjk:
        raise RuntimeError(f'Source font lacks CJK characters: {missing_cjk}')
    options = subset.Options()
    options.name_IDs = ['*']
    options.name_legacy = True
    options.name_languages = ['*']
    options.layout_features = ['*']
    subsetter = subset.Subsetter(options=options)
    subsetter.populate(unicodes=supported)
    subsetter.subset(font)
    # Subset first to avoid instantiating tens of thousands of unused glyphs.
    instantiateVariableFont(font, {'wght': (400, 700)}, inplace=True)
    font.flavor = 'woff2'
    output.parent.mkdir(parents=True, exist_ok=True)
    font.save(output)
    with TTFont(output) as check:
        actual = check.getBestCmap()
        assert supported <= set(actual), 'Subset lost required glyphs'
        axes = {a.axisTag: [a.minValue, a.maxValue] for a in check['fvar'].axes}
    print(json.dumps({
        'file': str(output), 'bytes': output.stat().st_size,
        'characters': len(supported), 'cjk_characters': sum(0x3400 <= c <= 0x9FFF for c in supported),
        'weights': axes, 'source_files': len(source_files),
    }, ensure_ascii=False))


if __name__ == '__main__':
    main()
