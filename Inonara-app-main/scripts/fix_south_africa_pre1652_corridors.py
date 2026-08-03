#!/usr/bin/env python3
from pathlib import Path

path = Path("frontend/src/components/SouthAfricaPre1652Routes.jsx")
if not path.exists():
    raise SystemExit("ERREUR: lance ce script depuis ~/inonara-app")

text = path.read_text(encoding="utf-8")

old = '  const corridors = data?.corridors || [];'
new = '''  const corridors = useMemo(
    () => data?.corridors || [],
    [data?.corridors],
  );'''

if new in text:
    print("OK: correction déjà appliquée.")
elif old in text:
    path.write_text(text.replace(old, new, 1), encoding="utf-8")
    print("OK: corridors stabilisés dans SouthAfricaPre1652Routes.jsx.")
else:
    raise SystemExit("ERREUR: ligne corridors introuvable; aucun fichier modifié.")
