#!/usr/bin/env python3
"""V26 — restauration de vraies photographies locales pour l'Afrique du Sud.

Le script :
1. télécharge six photographies libres depuis Wikimedia Commons ;
2. les enregistre localement dans frontend/public/images/south-africa-v26/ ;
3. ajoute des chemins locaux aux contenus sud-africains privés d'image ;
4. remplace toute ancienne référence d'illustration par une photographie ;
5. complète l'introduction générale du pays ;
6. vérifie que les fichiers existent réellement.
"""

from __future__ import annotations

import ast
import pprint
import re
import shutil
import sys
import urllib.request
from pathlib import Path
from typing import Any

ROOT = Path.cwd()
DOSSIER_DIR = ROOT / "backend" / "data" / "country_dossiers"
IMAGE_DIR = ROOT / "frontend" / "public" / "images" / "south-africa-v26"

if not DOSSIER_DIR.exists() or not (ROOT / "frontend").exists():
    raise SystemExit("Lance ce script depuis la racine du dépôt ~/inonara-app")

MEDIA = {
    "agriculture": {
        "filename": "agriculture-stellenbosch.jpg",
        "download_url": "https://upload.wikimedia.org/wikipedia/commons/1/18/Stellenbosch_Vineyard.jpg",
        "source_url": "https://commons.wikimedia.org/wiki/File:Stellenbosch_Vineyard.jpg",
        "credit": "Dfmalan — Wikimedia Commons — domaine public",
    },
    "education": {
        "filename": "education-uct-library.jpg",
        "download_url": "https://upload.wikimedia.org/wikipedia/commons/5/5e/University_of_Cape_Town_Library.jpg",
        "source_url": "https://commons.wikimedia.org/wiki/File:University_of_Cape_Town_Library.jpg",
        "credit": "Gogontsi — Wikimedia Commons — CC0 1.0",
    },
    "health": {
        "filename": "sante-groote-schuur.jpg",
        "download_url": "https://upload.wikimedia.org/wikipedia/commons/8/8f/Groote_Schuur_Hospital.jpg",
        "source_url": "https://commons.wikimedia.org/wiki/File:Groote_Schuur_Hospital.jpg",
        "credit": "Danie van der Merwe — Wikimedia Commons — CC BY 2.0",
    },
    "economy": {
        "filename": "economie-port-durban.jpg",
        "download_url": "https://upload.wikimedia.org/wikipedia/commons/0/03/Port_of_Durban_containers.jpg",
        "source_url": "https://commons.wikimedia.org/wiki/File:Port_of_Durban_containers.jpg",
        "credit": "Christophe Badoux — Wikimedia Commons — CC BY-SA 3.0",
    },
    "nature": {
        "filename": "nature-table-mountain.jpg",
        "download_url": "https://upload.wikimedia.org/wikipedia/commons/2/2d/Table_mountain%2C_Cape_Town.jpg",
        "source_url": "https://commons.wikimedia.org/wiki/File:Table_mountain,_Cape_Town.jpg",
        "credit": "ElmienJ — Wikimedia Commons — licence indiquée sur la page source",
    },
    "institutions": {
        "filename": "institutions-parlement-cap.jpg",
        "download_url": "https://upload.wikimedia.org/wikipedia/commons/8/88/Parliament%2C_Cape_Town_2023.jpg",
        "source_url": "https://commons.wikimedia.org/wiki/File:Parliament,_Cape_Town_2023.jpg",
        "credit": "Discott — Wikimedia Commons — CC BY-SA 4.0",
    },
}

OLD_SVG_RE = re.compile(
    r"/illustrations/south-africa(?:-v\d+)?/[^'\"\s]+\.svg",
    re.IGNORECASE,
)

IDENTITY_KEYS = ("id", "title", "name", "topic", "category", "summary", "text", "note", "field")

def download_photo(category: str, meta: dict[str, str]) -> None:
    IMAGE_DIR.mkdir(parents=True, exist_ok=True)
    target = IMAGE_DIR / meta["filename"]

    # Ne pas retélécharger un fichier JPEG déjà valide.
    if target.exists() and target.stat().st_size > 10_000:
        with target.open("rb") as handle:
            if handle.read(2) == b"\xff\xd8":
                print(f"DÉJÀ PRÉSENTE : {target.relative_to(ROOT)}")
                return

    request = urllib.request.Request(
        meta["download_url"],
        headers={
            "User-Agent": "Inonara/1.0 (educational cultural platform; Wikimedia media integration)",
            "Accept": "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
        },
    )

    print(f"TÉLÉCHARGEMENT : {category}")
    try:
        with urllib.request.urlopen(request, timeout=120) as response:
            data = response.read()
    except Exception as exc:
        raise SystemExit(
            f"Échec du téléchargement de {category}: {exc}\n"
            "Vérifie la connexion Internet puis relance exactement la même commande."
        )

    if len(data) < 10_000 or not data.startswith(b"\xff\xd8"):
        raise SystemExit(
            f"Le fichier reçu pour {category} n'est pas une photographie JPEG valide "
            f"({len(data)} octets)."
        )

    target.write_bytes(data)
    print(f"INSTALLÉE : {target.relative_to(ROOT)} ({len(data) // 1024} Ko)")

def category_for(item: dict[str, Any]) -> str:
    text = " ".join(str(item.get(key, "")) for key in IDENTITY_KEYS).lower()

    if any(word in text for word in (
        "agric", "farm", "ferme", "élevage", "elevage", "alimentaire",
        "vigne", "vin", "maïs", "mais", "rural"
    )):
        return "agriculture"

    if any(word in text for word in (
        "éduc", "educ", "école", "ecole", "universit", "biblioth",
        "livre", "lecture", "oralité", "oralite", "langue", "archive",
        "science", "recherche", "tvet", "formation"
    )):
        return "education"

    if any(word in text for word in (
        "santé", "sante", "health", "hôpital", "hopital", "hospital",
        "matern", "médical", "medical", "soin", "vih", "tubercul",
        "médecin", "medecin"
    )):
        return "health"

    if any(word in text for word in (
        "nature", "biodivers", "climat", "eau", "environnement",
        "paysage", "faune", "flore", "parc", "océan", "ocean",
        "marin", "montagne", "conservation"
    )):
        return "nature"

    if any(word in text for word in (
        "institution", "parlement", "justice", "droit", "constitution",
        "gouvernement", "province", "égalité", "egalite", "commission",
        "tribunal", "cour "
    )):
        return "institutions"

    return "economy"

def photo_fields(category: str) -> dict[str, str]:
    meta = MEDIA[category]
    return {
        "image_url": f"/images/south-africa-v26/{meta['filename']}",
        "image_source_url": meta["source_url"],
        "image_credit": meta["credit"],
        "visual_type": "photograph",
    }

def should_receive_photo(item: dict[str, Any]) -> bool:
    if not any(item.get(key) for key in ("id", "title", "name", "topic")):
        return False

    image_url = str(item.get("image_url", ""))
    credit = str(item.get("image_credit", ""))
    visual_type = str(item.get("visual_type", "")).lower()

    return (
        not image_url
        or bool(OLD_SVG_RE.search(image_url))
        or visual_type == "illustration"
        or "illustration originale inonara" in credit.lower()
    )

def transform(value: Any) -> tuple[Any, int]:
    if isinstance(value, list):
        output = []
        total = 0
        for child in value:
            new_child, count = transform(child)
            output.append(new_child)
            total += count
        return output, total

    if isinstance(value, dict):
        output: dict[str, Any] = {}
        total = 0

        for key, child in value.items():
            new_child, count = transform(child)
            output[key] = new_child
            total += count

        if should_receive_photo(output):
            category = category_for(output)
            output.update(photo_fields(category))

            # Compatibilité avec les objets de galerie.
            if "caption" in output or "author" in output or "license" in output:
                output["source_page"] = output["image_source_url"]
                output["author"] = output["image_credit"]
                output["license"] = "Réutilisation selon la licence indiquée sur Wikimedia Commons."

            total += 1

        return output, total

    return value, 0

def rewrite_literal_file(path: Path) -> int:
    text = path.read_text(encoding="utf-8")
    match = re.search(r"(?m)^([A-Z][A-Z0-9_]+)\s*=\s*", text)
    if not match:
        return 0

    variable_name = match.group(1)
    literal = text[match.end():].strip()

    try:
        data = ast.literal_eval(literal)
    except (SyntaxError, ValueError):
        return 0

    cleaned, count = transform(data)
    if not count:
        return 0

    backup = path.with_suffix(path.suffix + ".v26.bak")
    if not backup.exists():
        shutil.copy2(path, backup)

    new_text = (
        text[:match.start()]
        + f"{variable_name} = "
        + pprint.pformat(cleaned, width=120, sort_dicts=False)
        + "\n"
    )
    path.write_text(new_text, encoding="utf-8")
    print(f"DONNÉES : {path.relative_to(ROOT)} — {count} fiches photographiées")
    return count

def update_country_intro() -> bool:
    path = DOSSIER_DIR / "south_africa.py"
    if not path.exists():
        return False

    text = path.read_text(encoding="utf-8")
    match = re.search(
        r'("overview"\s*:\s*\{\s*"summary"\s*:\s*)"([^"]*)"',
        text,
        flags=re.S,
    )
    if not match:
        return False

    summary = (
        "L’Afrique du Sud est un État situé à l’extrémité australe du continent africain, "
        "bordé par les océans Atlantique et Indien et entourant entièrement le Lesotho. "
        "Son territoire associe hauts plateaux, savanes, chaînes montagneuses, régions "
        "semi-arides, littoraux et écosystèmes d’une biodiversité exceptionnelle. Pretoria, "
        "Le Cap et Bloemfontein exercent différentes fonctions de capitale, tandis que "
        "Johannesburg constitue son principal centre économique. Le pays joue un rôle majeur "
        "dans les échanges, l’industrie, la recherche, les arts, la diplomatie et les "
        "institutions d’Afrique australe. Son histoire humaine remonte à des périodes très "
        "anciennes et rassemble sociétés khoesan, communautés agricoles de langues bantoues, "
        "royaumes et chefferies, colonisations néerlandaise et britannique, esclavage au Cap, "
        "industrialisation minière, apartheid et transition vers la démocratie constitutionnelle "
        "à partir de 1994. Sa société contemporaine est diverse par ses langues, ses religions, "
        "ses territoires, ses appartenances et ses mémoires. Ce dossier présente donc le pays "
        "dans son ensemble — géographie, population, institutions, économie, société, "
        "environnement et rôle régional — tout en approfondissant ses peuples, ses trajectoires "
        "historiques, ses figures, son patrimoine et ses cultures."
    )

    escaped = summary.replace("\\", "\\\\").replace('"', '\\"')
    updated = text[:match.start(2)] + escaped + text[match.end(2):]
    if updated == text:
        return False

    backup = path.with_suffix(path.suffix + ".v26.bak")
    if not backup.exists():
        shutil.copy2(path, backup)
    path.write_text(updated, encoding="utf-8")
    print("INTRODUCTION : présentation générale de l’Afrique du Sud complétée")
    return True

def verify() -> None:
    missing = []
    invalid = []

    for meta in MEDIA.values():
        path = IMAGE_DIR / meta["filename"]
        if not path.exists():
            missing.append(str(path.relative_to(ROOT)))
            continue
        if path.stat().st_size < 10_000 or path.read_bytes()[:2] != b"\xff\xd8":
            invalid.append(str(path.relative_to(ROOT)))

    references = 0
    for path in DOSSIER_DIR.glob("south_africa*.py"):
        text = path.read_text(encoding="utf-8")
        references += text.count("/images/south-africa-v26/")
        if OLD_SVG_RE.search(text):
            invalid.append(f"ancienne référence SVG dans {path.relative_to(ROOT)}")

    if missing or invalid:
        if missing:
            print("PHOTOS MANQUANTES :")
            for item in missing:
                print("-", item)
        if invalid:
            print("ÉLÉMENTS INVALIDES :")
            for item in invalid:
                print("-", item)
        raise SystemExit(1)

    if references == 0:
        raise SystemExit("Aucune référence locale V26 n’a été ajoutée aux données.")

    print(f"VÉRIFICATION : six photos locales valides et {references} références dans les données.")

def main() -> None:
    for category, meta in MEDIA.items():
        download_photo(category, meta)

    changed = 0
    for path in sorted(DOSSIER_DIR.glob("south_africa*.py")):
        if ".bak" not in path.name:
            changed += rewrite_literal_file(path)

    intro_changed = update_country_intro()
    verify()

    print()
    print("BILAN V26")
    print(f"- Fiches reliées à de vraies photos locales : {changed}")
    print(f"- Introduction générale modifiée : {'oui' if intro_changed else 'déjà à jour'}")
    print("- Anciennes illustrations SVG : non réintroduites")
    print("- Photos : stockées localement dans frontend/public/images/south-africa-v26/")
    print("OK : restauration photographique Afrique du Sud terminée.")

if __name__ == "__main__":
    main()
