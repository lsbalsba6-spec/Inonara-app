"""Validation for migration-registry JSON records."""

from .schema import (
    CONFIDENCE_LEVELS,
    MIGRATION_TYPES,
    PERIODS,
    ROUTE_REVIEW_STATUSES,
    SOURCE_CATEGORIES,
)


def validate_registry(registry):
    errors = []
    if registry.get("schemaVersion") != "1.0":
        errors.append("schemaVersion must be '1.0'")

    source_ids = set()
    for source in registry.get("sources", []):
        sid = source.get("id")
        if not sid:
            errors.append("source without id")
            continue
        if sid in source_ids:
            errors.append(f"duplicate source id: {sid}")
        source_ids.add(sid)
        if source.get("category") not in SOURCE_CATEGORIES:
            errors.append(f"source {sid}: invalid category")

    migration_ids = set()
    route_ids = set()
    for migration in registry.get("migrations", []):
        mid = migration.get("id")
        if not mid:
            errors.append("migration without id")
            continue
        if mid in migration_ids:
            errors.append(f"duplicate migration id: {mid}")
        migration_ids.add(mid)

        if migration.get("migrationType") not in MIGRATION_TYPES:
            errors.append(f"migration {mid}: invalid migrationType")
        if migration.get("periodTag") not in PERIODS:
            errors.append(f"migration {mid}: invalid periodTag")
        if migration.get("confidence") not in CONFIDENCE_LEVELS:
            errors.append(f"migration {mid}: invalid confidence")

        start = migration.get("startYear")
        end = migration.get("endYear")
        if isinstance(start, (int, float)) and isinstance(end, (int, float)) and start > end:
            errors.append(f"migration {mid}: startYear after endYear")

        refs = migration.get("sourceIds", [])
        if not refs:
            errors.append(f"migration {mid}: no sourceIds")
        for ref in refs:
            if ref not in source_ids:
                errors.append(f"migration {mid}: missing source {ref}")

        for route in migration.get("routeCandidates", []):
            rid = route.get("id")
            if not rid:
                errors.append(f"migration {mid}: route without id")
                continue
            if rid in route_ids:
                errors.append(f"duplicate route id: {rid}")
            route_ids.add(rid)
            if route.get("reviewStatus") not in ROUTE_REVIEW_STATUSES:
                errors.append(f"route {rid}: invalid reviewStatus")
            if route.get("migrationType") not in MIGRATION_TYPES:
                errors.append(f"route {rid}: invalid migrationType")
            if route.get("migrationType") == "mixed" and route.get("reviewStatus") == "ready":
                errors.append(f"route {rid}: mixed route cannot be ready without explicit review")
            if route.get("reviewStatus") == "split-required" and route.get("migrationType") != "mixed":
                errors.append(f"route {rid}: split-required must retain legacy mixed type")
            route_start = route.get("startYear")
            route_end = route.get("endYear")
            if (
                isinstance(route_start, (int, float))
                and isinstance(route_end, (int, float))
                and route_start > route_end
                and route.get("reviewStatus") != "data-error"
            ):
                errors.append(f"route {rid}: startYear after endYear without data-error status")
            if not route.get("originText"):
                errors.append(f"route {rid}: missing originText")
            if not route.get("destinationName"):
                errors.append(f"route {rid}: missing destinationName")

    return errors
