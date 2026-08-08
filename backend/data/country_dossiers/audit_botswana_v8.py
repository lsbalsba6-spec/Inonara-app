#!/usr/bin/env python3
"""Lightweight audit for Botswana V8 source references."""
import importlib.util
from pathlib import Path

path = Path(__file__).with_name("botswana_territory_v8.py")
spec = importlib.util.spec_from_file_location("bw8", path)
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)
d = mod.BOTSWANA_TERRITORY_V8
sources = {s["id"]: s for s in d["sources"]}
missing = []
for section in d["sections"]:
    for sid in section.get("sources", []):
        if sid not in sources:
            missing.append((section["id"], sid))
for place in d["places"]:
    for sid in place.get("sources", []):
        if sid not in sources:
            missing.append((place["id"], sid))
print(f"sections={len(d['sections'])} places={len(d['places'])} sources={len(sources)}")
if missing:
    print("MISSING_SOURCE_IDS")
    for item in missing:
        print(item)
    raise SystemExit(1)
print("SOURCE_AUDIT_OK")
