#!/usr/bin/env python3
"""Builds ONE self-contained file (CSS, JS and images embedded):  python3 tools/build.py  ->  dist/reze-single.html"""
import base64
import json
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / 'dist' / 'reze-single.html'
MIME = {'.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp',
        '.avif': 'image/avif', '.gif': 'image/gif'}


def read(path, inline=True):
    """File text. Code that gets inlined must not contain a closing tag, it would end the <script>/<style> early."""
    text = (ROOT / path).read_text(encoding='utf-8')
    if inline:
        for closing in ('</script', '</style'):
            assert closing not in text.lower(), f'{path} contains "{closing}", it would break the single file'
    return text


def embedded_images():
    """assets/ path -> data: URL. Folders starting with "_" (e.g. arts/_unused) are not embedded."""
    assets = ROOT / 'assets'
    images = {}
    for file in sorted(assets.rglob('*')):
        rel = file.relative_to(assets)
        if file.suffix.lower() in MIME and not any(part.startswith('_') for part in rel.parts):
            images[rel.as_posix()] = f'data:{MIME[file.suffix.lower()]};base64,' + base64.b64encode(file.read_bytes()).decode()
    return images


def inline_script(match):
    script = f'<script>{read(match[1])}</script>'
    if match[1] == 'js/config.js':  # the images go right after the settings
        data = json.dumps(embedded_images()).replace('</', '<\\/')
        script += f'<script>REZE.data={data}</script>'
    return script


html = read('index.html', inline=False)
html = re.sub(r'<link rel="stylesheet" href="([^"]+)">', lambda m: f'<style>{read(m[1])}</style>', html)
html = re.sub(r'<script src="([^"]+)"></script>', inline_script, html)
OUT.parent.mkdir(exist_ok=True)
OUT.write_text(html, encoding='utf-8')
print(f'{OUT.relative_to(ROOT)}: {OUT.stat().st_size // 1024} KB')
