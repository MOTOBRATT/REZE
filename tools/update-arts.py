#!/usr/bin/env python3
"""Syncs js/arts-list.js with the pictures in assets/arts/:  python3 tools/update-arts.py
New files get one line each at the end; lines of deleted files are removed; existing lines keep their options and order."""
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent
FOLDER = ROOT / 'assets' / 'arts'
LIST = ROOT / 'js' / 'arts-list.js'
EXTENSIONS = {'.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif'}


def natural(name):
    """photo2 before photo10"""
    return [int(t) if t.isdigit() else t.lower() for t in re.split(r'(\d+)', name)]


files = sorted((f.name for f in FOLDER.iterdir() if f.suffix.lower() in EXTENSIONS), key=natural)
source = LIST.read_text(encoding='utf-8')
block = re.search(r'REZE\.arts\s*=\s*\[(.*?)\n\];', source, re.S)
head = source[:block.start()] if block else source

existing = {}  # file name -> its line
for line in (block.group(1) if block else '').splitlines():
    found = re.search(r'file:\s*([\'"])(.+?)\1', line)  # single or double quotes
    if found:
        existing[found.group(2)] = line.rstrip()

lines = [line for name, line in existing.items() if name in files]
added = [name for name in files if name not in existing]
lines += [f"  {{ file: '{name}' }}," for name in added]

LIST.write_text(head + 'REZE.arts = [\n' + '\n'.join(lines) + '\n];\n', encoding='utf-8')
print('pictures in ARTS:', len(lines), '| added:', added or 'nothing new')
