"""Idempotently connect South Africa part 13 to the existing application."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
INIT = ROOT / "backend/data/country_dossiers/__init__.py"
VIEW = ROOT / "frontend/src/components/CountryDossierView.jsx"


def patch_backend() -> None:
    text = INIT.read_text(encoding="utf-8")
    import_line = "from .south_africa_law_memory import SOUTH_AFRICA_LAW_MEMORY"
    if import_line not in text:
        lines = text.splitlines()
        last_import = max(i for i, line in enumerate(lines) if line.startswith("from ."))
        lines.insert(last_import + 1, import_line)
        text = "\n".join(lines) + "\n"

    marker = 'SOUTH_AFRICA_DOSSIER["provinces_cities"] = SOUTH_AFRICA_PROVINCES_CITIES\n'
    block = (
        '\nSOUTH_AFRICA_DOSSIER["law_memory"] = SOUTH_AFRICA_LAW_MEMORY["law_memory"]\n'
        '_existing_source_ids = {item["id"] for item in SOUTH_AFRICA_DOSSIER.get("sources", [])}\n'
        'SOUTH_AFRICA_DOSSIER.setdefault("sources", []).extend(\n'
        '    item for item in SOUTH_AFRICA_LAW_MEMORY["additionalSources"] if item["id"] not in _existing_source_ids\n'
        ')\n'
    )
    if 'SOUTH_AFRICA_DOSSIER["law_memory"]' not in text:
        if marker not in text:
            raise RuntimeError("Could not find provinces_cities assignment")
        text = text.replace(marker, marker + block, 1)
    INIT.write_text(text, encoding="utf-8")


def patch_frontend() -> None:
    text = VIEW.read_text(encoding="utf-8")
    import_line = 'import { SouthAfricaLawMemory } from "./SouthAfricaLawMemory";\n'
    if import_line not in text:
        text = import_line + text

    tab_marker = '["sport-media", "Sports & médias"],'
    if '["law-memory", "Droit & mémoire"]' not in text:
        if tab_marker not in text:
            tab_marker = '["international", "Monde"],'
        if tab_marker not in text:
            raise RuntimeError("Could not find tab insertion marker")
        text = text.replace(tab_marker, tab_marker + ' ["law-memory", "Droit & mémoire"],', 1)

    render_marker = '{active === "sport-media" && <SouthAfricaSportMedia dossier={dossier} sourceMap={sourceMap} />}'
    if render_marker not in text:
        render_marker = '{active === "international" && <SouthAfricaInternationalRole dossier={dossier} sourceMap={sourceMap} />}'
    render_line = '{active === "law-memory" && <SouthAfricaLawMemory dossier={dossier} sourceMap={sourceMap} />}'
    if render_line not in text:
        if render_marker not in text:
            raise RuntimeError("Could not find render insertion marker")
        text = text.replace(render_marker, render_marker + "\n        " + render_line, 1)
    VIEW.write_text(text, encoding="utf-8")


if __name__ == "__main__":
    patch_backend()
    patch_frontend()
    print("South Africa part 13 connected successfully.")
