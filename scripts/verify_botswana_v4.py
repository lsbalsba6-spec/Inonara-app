#!/usr/bin/env python3
import sys
from pathlib import Path
sys.path.insert(0, str(Path.cwd() / 'backend'))
from data.country_dossiers import COUNTRY_DOSSIERS, country_dossier_index
bw=COUNTRY_DOSSIERS.get('botswana')
if not bw: raise SystemExit('Botswana absent')
required=['slug','name','region','status','presentation','languages','religions','polities','migrations','law_memory','national_symbols','international_role','interactive_timeline','scientific_library','historiography','research_gaps','map_visuals']
missing=[k for k in required if not bw.get(k)]
if missing: raise SystemExit('Sections V4 manquantes: '+', '.join(missing))
idx=[x for x in country_dossier_index() if x['iso2']=='BW']
if not idx or idx[0]['slug']!='botswana': raise SystemExit('Index Botswana incorrect')
if len(bw.get('overview',{}).get('history_chapters',[]))<5: raise SystemExit('Récit historique incomplet')
print('OK Botswana V4')
for k in required: print('-',k,': OK')
print('- figures:',len(bw.get('figures',[])))
print('- peoples:',len(bw.get('peoples',[])))
print('- culture:',len(bw.get('culture',[])))
print('- heritage:',len(bw.get('heritage',[])))
