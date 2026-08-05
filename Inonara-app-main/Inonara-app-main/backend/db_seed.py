"""Idempotent MongoDB content mirror.

Mirrors the in-memory AfroAtlas content (CIVILIZATIONS, DIASPORA, PLACES,
FIGURES, STORIES, CULTURE_ITEMS, ETHNIC_GROUPS) into MongoDB collections.

Why this exists:
- Until now content lived only in Python memory (fragmented across 5 seed_*.py).
- This mirror makes the content queryable from outside Python (admin panel,
  backups, BI), and prepares the path for future user-editable content.

Reads remain served from in-memory data for latency. The mirror is write-only
on startup and is fully idempotent (upsert by id).
"""

import logging
from data import (
    CIVILIZATIONS,
    DIASPORA_COMMUNITIES,
    PLACES,
    FIGURES,
    STORIES,
    CULTURE_ITEMS,
    ETHNIC_GROUPS,
)

log = logging.getLogger("afroatlas.seed")


_COLLECTIONS = (
    ("civilizations", CIVILIZATIONS),
    ("diaspora_communities", DIASPORA_COMMUNITIES),
    ("places", PLACES),
    ("figures", FIGURES),
    ("stories", STORIES),
    ("culture_items", CULTURE_ITEMS),
    ("ethnic_groups", ETHNIC_GROUPS),
)


async def mirror_content_to_mongo(db) -> dict:
    """Upsert each content item by `id`. Returns a per-collection count.

    Safe to call on every app startup — pure idempotent upsert.
    """
    counts: dict = {}
    for coll_name, items in _COLLECTIONS:
        if not items:
            counts[coll_name] = 0
            continue
        coll = db[coll_name]
        # Ensure unique index on `id` (created once; idempotent).
        try:
            await coll.create_index("id", unique=True)
        except Exception as e:
            log.warning("Could not create unique index on %s.id: %s", coll_name, e)
        # Upsert each document
        ok = 0
        for item in items:
            doc_id = item.get("id")
            if not doc_id:
                continue
            # Do NOT spread/copy — pymongo will mutate to inject _id otherwise.
            await coll.update_one(
                {"id": doc_id},
                {"$set": {k: v for k, v in item.items() if k != "_id"}},
                upsert=True,
            )
            ok += 1
        counts[coll_name] = ok
        log.info("mirrored %d items into %s", ok, coll_name)
    return counts
