#!/usr/bin/env python3
"""Idempotently wire South Africa deep history into the current repository."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
INIT = ROOT / "backend/data/country_dossiers/__init__.py"
VIEW = ROOT / "frontend/src/components/CountryDossierView.jsx"


def patch_backend():
    text = INIT.read_text(encoding="utf-8")
    import_line = "from .south_africa_deep_history import enrich_south_africa_dossier\n"
    if import_line not in text:
        anchor = "from .south_africa import SOUTH_AFRICA_DOSSIER\n"
        if anchor not in text:
            raise RuntimeError("Import SOUTH_AFRICA_DOSSIER introuvable dans country_dossiers/__init__.py")
        text = text.replace(anchor, anchor + import_line)

    enrich_line = "SOUTH_AFRICA_DOSSIER = enrich_south_africa_dossier(SOUTH_AFRICA_DOSSIER)\n\n"
    if enrich_line not in text:
        anchor = "COUNTRY_DOSSIERS = {\n"
        if anchor not in text:
            raise RuntimeError("COUNTRY_DOSSIERS introuvable dans country_dossiers/__init__.py")
        text = text.replace(anchor, enrich_line + anchor)
    INIT.write_text(text, encoding="utf-8")


def patch_frontend():
    text = VIEW.read_text(encoding="utf-8")
    import_line = 'import SouthAfricaDeepHistory from "./SouthAfricaDeepHistory";\n'
    if import_line not in text:
        lines = text.splitlines(keepends=True)
        insert_at = 0
        while insert_at < len(lines) and lines[insert_at].startswith("import "):
            insert_at += 1
        lines.insert(insert_at, import_line)
        text = "".join(lines)

    if '["deep-history", "Avant 1652"]' not in text:
        candidates = [
            '["overview", "Présentation"], ["timeline", "Histoire"],',
            '["overview", "Présentation"],\n',
        ]
        for anchor in candidates:
            if anchor in text:
                if "timeline" in anchor:
                    text = text.replace(anchor, '["overview", "Présentation"], ["deep-history", "Avant 1652"], ["timeline", "Histoire"],', 1)
                else:
                    text = text.replace(anchor, anchor + '    ["deep-history", "Avant 1652"],\n', 1)
                break
        else:
            raise RuntimeError("Tableau tabs introuvable dans CountryDossierView.jsx")

    render_line = '{active === "deep-history" && <SouthAfricaDeepHistory data={dossier.deep_history} sourceMap={sourceMap} />}\n'
    if render_line.strip() not in text:
        anchors = [
            '{active === "timeline" &&',
            '{active === "peoples" &&',
        ]
        for anchor in anchors:
            idx = text.find(anchor)
            if idx != -1:
                line_start = text.rfind("\n", 0, idx) + 1
                indent = text[line_start:idx]
                text = text[:line_start] + indent + render_line + text[line_start:]
                break
        else:
            raise RuntimeError("Point de rendu des onglets introuvable dans CountryDossierView.jsx")

    VIEW.write_text(text, encoding="utf-8")


if __name__ == "__main__":
    patch_backend()
    patch_frontend()
    print("Afrique du Sud partie 6.1 appliquée avec succès.")
