#!/usr/bin/env python3
from pathlib import Path
ROOT=Path.cwd(); ci=ROOT/'backend/data/country_dossiers/__init__.py'
if not ci.exists(): raise SystemExit('Lance ce script depuis ~/inonara-app')
text=ci.read_text(encoding='utf-8')
imp='from .botswana_consolidation_v4 import BOTSWANA_CONSOLIDATION_V4\n'
if imp not in text: text=imp+text
block='''\n# Botswana consolidation V4\n_bw4 = BOTSWANA_CONSOLIDATION_V4\nif "botswana" not in COUNTRY_DOSSIERS:\n    raise RuntimeError("Botswana V1 doit être installé avant V4")\n_bw = COUNTRY_DOSSIERS["botswana"]\n_bw.update(_bw4["identity"])\n_bw["presentation"] = _bw4["presentation"]\n_bw.setdefault("overview", {}).update(_bw4["overview"])\nfor key in ("institutions", "languages", "religions", "polities", "migrations", "law_memory", "sport_media", "national_symbols", "international_role", "interactive_timeline", "scientific_library", "historiography", "research_gaps", "map_visuals"):\n    _bw[key] = _bw4[key]\n'''
if '# Botswana consolidation V4' not in text:
    marker='def country_dossier_index():'
    if marker not in text: raise SystemExit('Point insertion introuvable')
    text=text.replace(marker,block+'\n\n'+marker,1)
ci.write_text(text,encoding='utf-8')

# Make the shared dossier shell country-neutral.
view=ROOT/'frontend/src/components/CountryDossierView.jsx'
v=view.read_text(encoding='utf-8')
v=v.replace('{ id: "mobility", label: "Migrations", items: [["migrations", "Migrations & diasporas"], ["international", "Afrique du Sud dans le monde"]] },','{ id: "mobility", label: "Migrations", items: [["migrations", "Migrations & diasporas"], ["international", `${dossier.name?.fr || "Pays"} dans le monde`]] },')
v=v.replace('{dossier.name?.fr || "Afrique du Sud"}','{dossier.name?.fr || dossier.country || "Pays"}')
view.write_text(v,encoding='utf-8')

# Replace hard-coded overview by a reusable country-aware version.
overview=ROOT/'frontend/src/components/SouthAfricaOverview.jsx'
overview.write_text(r'''function FactCard({ label, value }) {
  return <div className="rounded-xl border border-bone/10 bg-bone/[0.025] p-4"><p className="text-[10px] uppercase tracking-[0.18em] text-bone/40">{label}</p><p className="mt-2 text-sm leading-relaxed text-bone/85">{value}</p></div>;
}
export function SouthAfricaOverview({ dossier, sourceMap }) {
  const presentation=dossier.presentation || {};
  const countryName=dossier.name?.fr || dossier.country || "Pays";
  const facts=presentation.facts || [];
  const gallery=(dossier.media_gallery || []).filter((item)=>item.image_url).slice(0,3);
  const overviewSources=(dossier.overview?.sources || []).map((id)=>sourceMap.get(id)).filter(Boolean);
  return <div className="space-y-10">
    <section className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
      <div className="rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/[0.08] via-bone/[0.025] to-transparent p-6 md:p-8">
        <p className="overline text-gold">Carte d’identité</p><h2 className="mt-3 font-serif text-3xl text-bone md:text-4xl">{presentation.heading || `${countryName} en un regard`}</h2>
        <p className="mt-4 max-w-3xl text-base leading-8 text-bone/75">{dossier.overview?.summary}</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{facts.map((item)=><FactCard key={item.label} label={item.label} value={item.value}/>)}</div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
        {presentation.flag_url && <figure className="flex min-h-[230px] flex-col items-center justify-center rounded-2xl border border-bone/10 bg-bone/[0.025] p-6"><img src={presentation.flag_url} alt={`Drapeau du ${countryName}`} className="w-full max-w-[320px] rounded-md shadow-2xl"/><figcaption className="mt-4 text-center"><p className="font-serif text-xl text-bone">Drapeau national</p><a href={presentation.flag_source} target="_blank" rel="noreferrer" className="mt-2 inline-block text-xs text-gold/80 underline">Source et licence</a></figcaption></figure>}
        {presentation.coat_url && <figure className="flex min-h-[230px] flex-col items-center justify-center rounded-2xl border border-bone/10 bg-bone/[0.025] p-6"><img src={presentation.coat_url} alt={`Armoiries du ${countryName}`} className="max-h-44 w-auto"/><figcaption className="mt-4 text-center"><p className="font-serif text-xl text-bone">Armoiries nationales</p><p className="mt-1 text-xs text-bone/45">{presentation.coat_caption}</p><a href={presentation.coat_source} target="_blank" rel="noreferrer" className="mt-2 inline-block text-xs text-gold/80 underline">Source et licence</a></figcaption></figure>}
      </div>
    </section>
    {gallery.length>0 && <section><p className="overline text-gold">Premiers repères visuels</p><div className="mt-4 grid gap-4 md:grid-cols-3">{gallery.map((item)=><figure key={item.id} className="overflow-hidden rounded-xl border border-bone/10"><img src={item.image_url} alt={item.alt || item.title} className="h-56 w-full object-cover"/><figcaption className="p-4"><p className="font-serif text-lg text-bone">{item.title}</p><p className="mt-1 text-xs text-bone/50">{item.caption}</p></figcaption></figure>)}</div></section>}
    <section className="rounded-2xl border border-bone/10 bg-bone/[0.02] p-6"><p className="overline text-gold">Sources de référence</p><div className="mt-4 flex flex-wrap gap-3">{(presentation.source_links || []).map((link)=><a key={link.url} href={link.url} target="_blank" rel="noreferrer" className="rounded-full border border-gold/30 px-4 py-2 text-xs text-gold">{link.label}</a>)}{overviewSources.slice(0,4).map((source)=><a key={source.id} href={source.url} target="_blank" rel="noreferrer" className="rounded-full border border-bone/15 px-4 py-2 text-xs text-bone/65">{source.publisher}</a>)}</div></section>
  </div>;
}
''',encoding='utf-8')

# Make key headers country-neutral.
for rel,old,new in [
('frontend/src/components/SouthAfricaInternationalQuality.jsx','Afrique du Sud dans le monde','{dossier.name?.fr || dossier.country || "Pays"} dans le monde'),
('frontend/src/components/SouthAfricaEconomyQuality.jsx','L’économie sud-africaine est présentée dans la durée : réseaux précoloniaux,\n          extraction minière, industrialisation, travail migrant, services, agriculture,\n          commerce, énergie et défis contemporains. Les chiffres doivent toujours être datés.','{dossier.economy?.intro || "Cette section présente les transformations historiques, les secteurs structurants et les défis économiques contemporains. Les chiffres doivent toujours être datés."}'),
('frontend/src/components/SouthAfricaProvincesCities.jsx','L’Afrique du Sud répartit plusieurs fonctions nationales entre différentes villes.\n          Cette organisation ne doit pas être confondue avec les capitales des neuf provinces.','Les fonctions nationales et l’organisation territoriale sont présentées selon le cadre institutionnel propre au pays.'),
('frontend/src/components/SouthAfricaProvincesCities.jsx','Provinces et capitales provinciales','Districts et centres administratifs'),
('frontend/src/components/SouthAfricaProvincesCities.jsx','Les provinces actuelles datent de la réorganisation territoriale de 1994 ; elles\n              ne doivent pas être projetées sur les périodes anciennes.','Les divisions administratives contemporaines ne doivent pas être projetées sur les périodes anciennes.'),
('frontend/src/components/SouthAfricaProvincesCities.jsx','Province','District')]:
    p=ROOT/rel; s=p.read_text(encoding='utf-8'); s=s.replace(old,new); p.write_text(s,encoding='utf-8')
print('OK: Botswana V4 consolidé et interface pays rendue générique.')
