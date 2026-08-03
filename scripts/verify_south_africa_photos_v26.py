#!/usr/bin/env python3
from pathlib import Path
import re
import sys

root = Path.cwd()
image_dir = root / "frontend" / "public" / "images" / "south-africa-v26"
dossier_dir = root / "backend" / "data" / "country_dossiers"

expected = {
    "agriculture-stellenbosch.jpg",
    "education-uct-library.jpg",
    "sante-groote-schuur.jpg",
    "economie-port-durban.jpg",
    "nature-table-mountain.jpg",
    "institutions-parlement-cap.jpg",
}

errors = []
for filename in expected:
    path = image_dir / filename
    if not path.exists():
        errors.append(f"photo absente : {path}")
    elif path.stat().st_size < 10_000:
        errors.append(f"photo trop petite ou invalide : {path}")
    elif path.read_bytes()[:2] != b"\xff\xd8":
        errors.append(f"fichier non JPEG : {path}")

svg_pattern = re.compile(
    r"/illustrations/south-africa(?:-v\d+)?/[^'\"\s]+\.svg",
    re.I,
)

references = 0
for path in dossier_dir.glob("south_africa*.py"):
    if ".bak" in path.name:
        continue
    text = path.read_text(encoding="utf-8")
    references += text.count("/images/south-africa-v26/")
    if svg_pattern.search(text):
        errors.append(f"ancienne référence SVG : {path}")

if references == 0:
    errors.append("aucune référence vers les photos locales V26")

if errors:
    print("ÉCHEC V26")
    for error in errors:
        print("-", error)
    sys.exit(1)

print(f"OK V26 : 6 photographies locales et {references} références visuelles.")
