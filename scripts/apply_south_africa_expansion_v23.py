#!/usr/bin/env python3
from pathlib import Path
ROOT=Path.cwd(); d=ROOT/'backend/data/country_dossiers/__init__.py'; g=ROOT/'backend/data/__init__.py'
if not d.exists() or not g.exists(): raise SystemExit('Lance ce script depuis ~/inonara-app')
t=d.read_text(encoding='utf-8'); imp='from .south_africa_expansion_v23 import SOUTH_AFRICA_EXPANSION_V23\n'; anchor='from .south_africa_deep_history import DEEP_HISTORY, DEEP_HISTORY_SOURCES\n'
if imp not in t:
    if anchor not in t: raise SystemExit('Point insertion dossier introuvable')
    t=t.replace(anchor,anchor+imp,1)
block="""
# South Africa expansion V23
_v23=SOUTH_AFRICA_EXPANSION_V23
def _merge_v23(target,incoming):
    existing={i.get('id') or i.get('title') or i.get('name') or i.get('topic') for i in target}
    target.extend(i for i in incoming if (i.get('id') or i.get('title') or i.get('name') or i.get('topic')) not in existing)
_merge_v23(SOUTH_AFRICA_DOSSIER.setdefault('figures',[]),_v23['figures'])
_merge_v23(SOUTH_AFRICA_DOSSIER.setdefault('law_memory',{}).setdefault('constitutional_democracy',{}).setdefault('items',[]),_v23['institutions'])
_merge_v23(SOUTH_AFRICA_DOSSIER.setdefault('society',{}).setdefault('themes',[]),_v23['society'])
_merge_v23(SOUTH_AFRICA_DOSSIER.setdefault('heritage',[]),_v23['heritage'])
_merge_v23(SOUTH_AFRICA_DOSSIER.setdefault('stories',[]),_v23['stories'])
_merge_v23(SOUTH_AFRICA_DOSSIER.setdefault('media_gallery',[]),_v23['gallery'])
_merge_v23(SOUTH_AFRICA_DOSSIER.setdefault('sources',[]),_v23['additionalSources'])
"""
if '# South Africa expansion V23' not in t:
    marker='COUNTRY_DOSSIERS = {\n'
    if marker not in t: raise SystemExit('COUNTRY_DOSSIERS introuvable')
    t=t.replace(marker,block+marker,1)
d.write_text(t,encoding='utf-8')

t=g.read_text(encoding='utf-8'); imp='from .country_dossiers.south_africa_expansion_v23 import SOUTH_AFRICA_EXPANSION_V23\n'; anchor='from .south_africa_ecosystem_complete import (\n'
if imp not in t:
    if anchor not in t: raise SystemExit('Point insertion global introuvable')
    t=t.replace(anchor,imp+'\n'+anchor,1)
block="""
# South Africa global additions V23
_existing_figures_v23={i.get('id') for i in FIGURES}
FIGURES.extend({'id':i['id'],'name':i['name'],'category':'artists' if i['field'] in {'Littérature et exil','Jazz et composition'} else 'scientists' if i['field']=='Paléoanthropologie' else 'intellectuals','era':'XVIIIe–XXIe siècles','region':'South Africa','summary':i['reason'],'story':' '.join(i.get('paragraphs',[])),'legacy':i.get('legacy',''),'sources':i.get('sources',[]),'wikipedia_title':i.get('wikipedia_title'),'image_source_url':i.get('image_source_url'),'image_credit':i.get('image_credit'),'visual_type':i.get('visual_type')} for i in SOUTH_AFRICA_EXPANSION_V23['figures'] if i.get('id') not in _existing_figures_v23)
_existing_places_v23={i.get('id') for i in PLACES}; PLACES.extend(i for i in SOUTH_AFRICA_EXPANSION_V23['places'] if i.get('id') not in _existing_places_v23)
_existing_stories_v23={i.get('id') for i in STORIES}; STORIES.extend(i for i in SOUTH_AFRICA_EXPANSION_V23['stories'] if i.get('id') not in _existing_stories_v23)
_existing_timeline_v23={i.get('id') for i in SA_TIMELINE_EVENTS}; SA_TIMELINE_EVENTS.extend(i for i in SOUTH_AFRICA_EXPANSION_V23['timeline'] if i.get('id') not in _existing_timeline_v23)
"""
if '# South Africa global additions V23' not in t:
    marker='# Backfill missing sources arrays on older PLACES entries\n'
    if marker not in t: raise SystemExit('Point final insertion introuvable')
    t=t.replace(marker,block+marker,1)
g.write_text(t,encoding='utf-8')
print('OK: Afrique du Sud V23 intégrée sans modifier React.')
