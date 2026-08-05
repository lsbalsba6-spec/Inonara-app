#!/usr/bin/env python3
from pathlib import Path
import re

BASE = Path("frontend/src/components")

RULES = {
    "SouthAfricaCulture.jsx": [
        ("culture", "dossier"),
    ],
    "SouthAfricaFigures.jsx": [
        ("figures", "dossier"),
    ],
    "SouthAfricaHeritage.jsx": [
        ("items", "dossier"),
    ],
    "SouthAfricaHistory.jsx": [
        ("chapters", "dossier"),
    ],
    "SouthAfricaLanguagesReligions.jsx": [
        ("household", "languages"),
        ("census", "religions"),
    ],
    "SouthAfricaMigrations.jsx": [
        ("routes", "dossier"),
    ],
    "SouthAfricaPeoples.jsx": [
        ("peoples", "dossier"),
    ],
    "SouthAfricaPolities.jsx": [
        ("polities", "dossier"),
    ],
}

def memoize_assignment(text: str, variable: str, dependency: str) -> tuple[str, bool]:
    # Match a simple one-line declaration such as:
    # const routes = dossier.migrations || [];
    pattern = re.compile(
        rf"(?m)^(?P<indent>\s*)const\s+{re.escape(variable)}\s*=\s*(?!useMemo\()(?P<expr>[^;\n]+);"
    )
    match = pattern.search(text)
    if not match:
        return text, False

    indent = match.group("indent")
    expr = match.group("expr").strip()
    replacement = (
        f"{indent}const {variable} = useMemo(\n"
        f"{indent}  () => {expr},\n"
        f"{indent}  [{dependency}],\n"
        f"{indent});"
    )
    return text[:match.start()] + replacement + text[match.end():], True

changed_files = []

for filename, rules in RULES.items():
    path = BASE / filename
    if not path.exists():
        raise SystemExit(f"ERREUR: fichier introuvable: {path}")

    text = path.read_text(encoding="utf-8")
    original = text

    for variable, dependency in rules:
        text, _ = memoize_assignment(text, variable, dependency)

    if text != original:
        path.write_text(text, encoding="utf-8")
        changed_files.append(str(path))

# Correction spécifique de SouthAfricaSocietyQuality.jsx
society_path = BASE / "SouthAfricaSocietyQuality.jsx"
if not society_path.exists():
    raise SystemExit(f"ERREUR: fichier introuvable: {society_path}")

text = society_path.read_text(encoding="utf-8")
original = text

# Stabilise d'abord la valeur source "items" si elle existe sous forme d'expression.
text, _ = memoize_assignment(text, "items", "dossier")

# Puis stabilise normalizedItems.
pattern = re.compile(
    r"(?m)^(?P<indent>\s*)const\s+normalizedItems\s*=\s*(?!useMemo\()(?P<expr>[^;\n]+);"
)
match = pattern.search(text)
if match:
    indent = match.group("indent")
    expr = match.group("expr").strip()
    replacement = (
        f"{indent}const normalizedItems = useMemo(\n"
        f"{indent}  () => {expr},\n"
        f"{indent}  [items],\n"
        f"{indent});"
    )
    text = text[:match.start()] + replacement + text[match.end():]

if text != original:
    society_path.write_text(text, encoding="utf-8")
    changed_files.append(str(society_path))

# Vérification : aucune déclaration ciblée ne doit rester instable.
remaining = []
targets = {
    **{k: [v for v, _ in vals] for k, vals in RULES.items()},
    "SouthAfricaSocietyQuality.jsx": ["items", "normalizedItems"],
}
for filename, variables in targets.items():
    path = BASE / filename
    content = path.read_text(encoding="utf-8")
    for variable in variables:
        unstable = re.search(
            rf"(?m)^\s*const\s+{re.escape(variable)}\s*=\s*(?!useMemo\()",
            content,
        )
        if unstable:
            remaining.append(f"{filename}: {variable}")

if remaining:
    raise SystemExit(
        "ERREUR: déclarations encore instables:\n- " + "\n- ".join(remaining)
    )

print("OK: warnings react-hooks/exhaustive-deps corrigés dans:")
for item in changed_files:
    print(f"  - {item}")
