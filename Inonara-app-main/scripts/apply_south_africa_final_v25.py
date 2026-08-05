#!/usr/bin/env python3
from pathlib import Path
import shutil, re, sys
root=Path.cwd()
if not (root/'backend/data/country_dossiers').exists():
    raise SystemExit('Lance ce script depuis ~/inonara-app')
illustrations=root/'frontend/public/illustrations'
for name in ('south-africa','south-africa-v17','south-africa-v18','south-africa-v20','south-africa-v21','south-africa-v22','south-africa-v23'):
    shutil.rmtree(illustrations/name, ignore_errors=True)
for pattern in ('*.v24.bak','*.v25.bak'):
    for p in root.rglob(pattern):
        p.unlink(missing_ok=True)
print('OK: anciennes illustrations géométriques Afrique du Sud supprimées.')
