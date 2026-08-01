#!/usr/bin/env python3
from pathlib import Path

path = Path("frontend/src/components/SouthAfricaLanguagesReligions.jsx")
if not path.exists():
    raise SystemExit("ERREUR: lance le script depuis ~/inonara-app")

text = path.read_text(encoding="utf-8")

replacements = {
    "const languages = dossier.languages || {};": """const languages = useMemo(
    () => dossier.languages || {},
    [dossier.languages],
  );""",
    "const religions = dossier.religions || {};": """const religions = useMemo(
    () => dossier.religions || {},
    [dossier.religions],
  );""",
}

changed = False
for old, new in replacements.items():
    if old in text:
        text = text.replace(old, new, 1)
        changed = True
    elif new not in text:
        raise SystemExit(f"ERREUR: ligne introuvable: {old}")

path.write_text(text, encoding="utf-8")

if changed:
    print("OK: languages et religions stabilisés avec useMemo.")
else:
    print("OK: correction déjà appliquée.")
