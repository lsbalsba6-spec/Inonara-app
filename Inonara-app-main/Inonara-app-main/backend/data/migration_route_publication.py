"""Publication policy for Atlas migration routes.

Only curated macro-routes and route-level reviewed diaspora movements are
public. Automatically-derived diaspora candidates are preserved separately for
editorial review because a diaspora card's lifespan is not evidence that one
migration route remained active for the same period.
"""
from __future__ import annotations

import json
from pathlib import Path

from . import MIGRATION_ROUTES

_DATA_DIR = Path(__file__).resolve().parent


def load_reviewed_diaspora_routes() -> list[dict]:
    path = _DATA_DIR / "reviewed_diaspora_routes.json"
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except FileNotFoundError:
        return []


def get_public_migration_routes() -> list[dict]:
    return list(MIGRATION_ROUTES) + load_reviewed_diaspora_routes()
