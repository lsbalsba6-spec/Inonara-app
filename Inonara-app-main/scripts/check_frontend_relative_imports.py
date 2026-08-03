#!/usr/bin/env python3
"""Fail when a JavaScript/TypeScript relative import points to a missing file."""
from __future__ import annotations

import os
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / "frontend" / "src"
EXTENSIONS = (".js", ".jsx", ".ts", ".tsx")
PATTERN = re.compile(
    r"(?:import[^\n]*?from\s*|import\s*)[\"']([^\"']+)[\"']"
    r"|require\([\"']([^\"']+)[\"']\)"
)


def resolves(source: Path, specifier: str) -> bool:
    base = (source.parent / specifier).resolve()
    candidates = [base]
    candidates.extend(Path(f"{base}{extension}") for extension in EXTENSIONS)
    candidates.extend(base / f"index{extension}" for extension in EXTENSIONS)
    return any(candidate.exists() for candidate in candidates)


def main() -> int:
    missing: list[tuple[Path, str]] = []
    for source in ROOT.rglob("*"):
        if not source.is_file() or source.suffix not in EXTENSIONS:
            continue
        text = source.read_text(encoding="utf-8")
        for match in PATTERN.finditer(text):
            specifier = match.group(1) or match.group(2)
            if specifier.startswith(".") and not resolves(source, specifier):
                missing.append((source.relative_to(ROOT.parent.parent), specifier))

    if missing:
        print("Imports relatifs introuvables :")
        for source, specifier in missing:
            print(f"- {source}: {specifier}")
        return 1

    print("OK : tous les imports relatifs frontend pointent vers un fichier existant.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
