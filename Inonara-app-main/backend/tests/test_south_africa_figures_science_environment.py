import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]


def load(path, name):
    spec = importlib.util.spec_from_file_location(name, ROOT / path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def test_enrichment_has_detailed_sections():
    base = load('backend/data/country_dossiers/south_africa.py', 'sa_base').SOUTH_AFRICA_DOSSIER
    mod = load('backend/data/country_dossiers/south_africa_figures_science_environment.py', 'sa_fse')
    dossier = mod.enrich_south_africa_figures_science_environment(base)
    assert len(dossier['figures']) >= 8
    assert len(dossier['science_innovation']) >= 5
    assert len(dossier['environment']['biomes']) == 9
    assert len(dossier['environment']['landscapes']) >= 5


def test_every_public_entry_has_sources_and_status():
    base = load('backend/data/country_dossiers/south_africa.py', 'sa_base2').SOUTH_AFRICA_DOSSIER
    mod = load('backend/data/country_dossiers/south_africa_figures_science_environment.py', 'sa_fse2')
    dossier = mod.enrich_south_africa_figures_science_environment(base)
    for key in ('figures', 'science_innovation'):
        for item in dossier[key]:
            assert item.get('sources')
            assert item.get('status') in {'ready', 'provisional', 'disputed', 'research-gap'}
    for item in dossier['environment']['landscapes']:
        assert item.get('sources')
        assert item.get('status')


def test_source_references_resolve():
    base = load('backend/data/country_dossiers/south_africa.py', 'sa_base3').SOUTH_AFRICA_DOSSIER
    mod = load('backend/data/country_dossiers/south_africa_figures_science_environment.py', 'sa_fse3')
    dossier = mod.enrich_south_africa_figures_science_environment(base)
    source_ids = {source['id'] for source in dossier['sources']}
    refs = []
    for item in dossier['figures'] + dossier['science_innovation'] + dossier['environment']['landscapes']:
        refs.extend(item.get('sources', []))
    refs.extend(dossier['environment'].get('sources', []))
    assert set(refs) <= source_ids
