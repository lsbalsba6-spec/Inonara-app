#!/usr/bin/env python3
from pathlib import Path
import re
import sys

ROOT = Path.cwd()
pattern = re.compile(
    r"/illustrations/south-africa-v(?:17|18|20|21|22|23)/[^'\"\s]+\.svg",
    re.IGNORECASE,
)
extensions = {".py", ".json", ".js", ".jsx", ".ts", ".tsx", ".md", ".txt"}
problems = []

for base in (ROOT / "backend", ROOT / "frontend" / "src"):
    if not base.exists():
        continue
    for path in base.rglob("*"):
        if path.is_file() and path.suffix.lower() in extensions:
            try:
                text = path.read_text(encoding="utf-8")
            except UnicodeDecodeError:
                continue
            if pattern.search(text):
                problems.append(str(path.relative_to(ROOT)))

illustrations = ROOT / "frontend" / "public" / "illustrations"
if illustrations.exists():
    problems.extend(
        str(path.relative_to(ROOT))
        for path in illustrations.glob("south-africa-v*/**/*.svg")
    )

if problems:
    print("ÉCHEC: éléments SVG temporaires encore présents:")
    for item in sorted(set(problems)):
        print("-", item)
    sys.exit(1)

print("OK: aucun SVG temporaire Afrique du Sud V17–V23 ni référence associée.")
