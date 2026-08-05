#!/usr/bin/env python3
from pathlib import Path
import re,sys
root=Path.cwd()
pat=re.compile(r'/illustrations/south-africa(?:-v(?:17|18|20|21|22|23))?/[^\'"\s]+\.svg',re.I)
bad=[]
for p in (root/'backend/data/country_dossiers').glob('south_africa*.py'):
    t=p.read_text(encoding='utf-8')
    if pat.search(t) or 'Illustration originale Inonara' in t or "'visual_type': 'illustration'" in t:
        bad.append(str(p.relative_to(root)))
ill=root/'frontend/public/illustrations'
if ill.exists():
    bad += [str(p.relative_to(root)) for p in ill.glob('south-africa*/**/*.svg')]
if bad:
    print('ÉCHEC: éléments visuels indésirables restants')
    print('\n'.join(sorted(set(bad))))
    sys.exit(1)
print('OK: aucune illustration géométrique Afrique du Sud restante.')
