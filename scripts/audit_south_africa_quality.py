#!/usr/bin/env python3
from pathlib import Path
import re
import sys

ROOT = Path.cwd()
FRONTEND = ROOT / "frontend" / "src"
COMPONENTS = FRONTEND / "components"
DOSSIER_VIEW = COMPONENTS / "CountryDossierView.jsx"

errors = []
warnings = []

required_components = [
    "SouthAfricaOverview.jsx",
    "SouthAfricaHistory.jsx",
    "SouthAfricaMigrations.jsx",
    "SouthAfricaCulture.jsx",
    "SouthAfricaHeritage.jsx",
    "SouthAfricaFigures.jsx",
    "SouthAfricaPeoples.jsx",
    "SouthAfricaLanguagesReligions.jsx",
    "SouthAfricaSourcesQuality.jsx",
    "SouthAfricaSocietyQuality.jsx",
    "SouthAfricaEducationHealthQuality.jsx",
    "SouthAfricaEconomyQuality.jsx",
    "SouthAfricaSymbolsQuality.jsx",
    "SouthAfricaInternationalQuality.jsx",
    "SouthAfricaMediaGallery.jsx",
    "SouthAfricaProvincesCities.jsx",
    "SouthAfricaSportMedia.jsx",
    "SouthAfricaLawMemory.jsx",
]

if not DOSSIER_VIEW.exists():
    errors.append(f"Fichier introuvable: {DOSSIER_VIEW}")
    dossier_text = ""
else:
    dossier_text = DOSSIER_VIEW.read_text(encoding="utf-8")

for filename in required_components:
    component_path = COMPONENTS / filename
    if not component_path.exists():
        errors.append(f"Composant manquant: {component_path}")
        continue

    component_name = filename.removesuffix(".jsx")
    if dossier_text and component_name not in dossier_text:
        warnings.append(
            f"{filename} existe mais son nom n'apparait pas dans CountryDossierView.jsx"
        )

placeholders = [
    "À compléter",
    "Recherche en cours",
    "À nuancer",
    "TODO",
    "FIXME",
    "Lorem ipsum",
]

for placeholder in placeholders:
    count = dossier_text.lower().count(placeholder.lower())
    if count:
        warnings.append(
            f"Texte interne detecte dans CountryDossierView.jsx: {placeholder} ({count} occurrence(s))"
        )

extensions = ["", ".js", ".jsx", ".ts", ".tsx", "/index.js", "/index.jsx", "/index.ts", "/index.tsx"]
import_pattern = re.compile(r"(?:from\s+|import\s*\()\s*[\"'](\.[^\"']+)[\"']")

for path in FRONTEND.rglob("*"):
    if not path.is_file() or path.suffix not in {".js", ".jsx", ".ts", ".tsx"}:
        continue

    text = path.read_text(encoding="utf-8", errors="replace")
    imports = import_pattern.findall(text)

    for relative in imports:
        base = path.parent / relative
        if not any(Path(str(base) + ext).exists() for ext in extensions):
            errors.append(f"Import relatif cassé: {path} -> {relative}")

south_components = sorted(COMPONENTS.glob("SouthAfrica*.jsx"))
for path in south_components:
    stem = path.stem
    if dossier_text and stem not in dossier_text and stem not in {
        "SouthAfricaTimelineEconomy",
        "SouthAfricaSocietyState",
    }:
        warnings.append(f"Composant potentiellement non branché: {path.name}")

print("\n=== AUDIT QUALITÉ AFRIQUE DU SUD ===\n")
print(f"Composants contrôlés : {len(required_components)}")
print(f"Erreurs : {len(errors)}")
print(f"Avertissements : {len(warnings)}\n")

if errors:
    print("ERREURS BLOQUANTES")
    for item in errors:
        print(f"  - {item}")
    print()

if warnings:
    print("AVERTISSEMENTS")
    for item in warnings:
        print(f"  - {item}")
    print()

if errors:
    print("ECHEC: corrige les erreurs avant le prochain sprint.")
    sys.exit(1)

print("OK: aucune erreur bloquante détectée.")
if warnings:
    print("NOTE: les avertissements doivent être revus, mais ils ne bloquent pas le build.")
