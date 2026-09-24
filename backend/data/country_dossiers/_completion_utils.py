"""Compatibility helpers for incremental country-dossier completion layers.

Older dossiers store reader-facing collections directly as lists, while newer
ones group them under keys such as ``themes`` or ``items``. Completion passes
must preserve the published legacy shape because API consumers and historical
tests still rely on it.
"""


def collection_for(dossier, key, nested_key="themes"):
    """Return a mutable collection without replacing an existing legacy list."""
    current = dossier.get(key)
    if isinstance(current, list):
        # Enrichment records have a different contract from many historical
        # list entries. Keep both shapes intact and let the frontend adapter
        # combine them for presentation.
        return dossier.setdefault(f"{key}_{nested_key}", [])
    if current is None:
        current = {}
        dossier[key] = current
    if not isinstance(current, dict):
        raise TypeError(f"{key} must be a list or mapping, got {type(current).__name__}")
    return current.setdefault(nested_key, [])


def merge_unique(target, incoming):
    """Append records once, using the best stable editorial identifier."""
    existing = {
        item.get("id") or item.get("name") or item.get("title") or item.get("topic")
        for item in target
        if isinstance(item, dict)
    }
    target.extend(
        item
        for item in incoming
        if (item.get("id") or item.get("name") or item.get("title") or item.get("topic")) not in existing
    )
