#!/usr/bin/env python3
from pathlib import Path
import re

BASE = Path("frontend/src/components")

def edit(name, transform):
    path = BASE / name
    if not path.exists():
        raise SystemExit(f"Fichier introuvable: {path}")
    old = path.read_text(encoding="utf-8")
    new = transform(old)
    if new != old:
        path.write_text(new, encoding="utf-8")
        print("Corrigé:", name)
    else:
        print("Déjà correct ou motif absent:", name)

def common_sources(text):
    return text.replace(
        "<SourceLinks ids={item.sources} sourceMap={sourceMap} />",
        "<SourceLinks ids={item.sources || item.sourceIds} sourceMap={sourceMap} />",
    )

def economy(text):
    text = common_sources(text)
    text = text.replace(
'''const getTitle = (item) =>
  item.title || item.name || item.sector || item.topic || "Thème économique";

const getBody = (item) =>
  item.text || item.note || item.summary || item.description || "";''',
'''const getTitle = (item) =>
  typeof item === "string"
    ? item
    : item.title || item.name || item.label || item.sector || item.topic || "Thème économique";

const getBody = (item) => {
  if (typeof item === "string") return item;
  const indicator = item.value
    ? `${item.value}${item.asOf ? ` · donnée ${item.asOf}` : ""}`
    : "";
  return item.text || item.note || item.summary || item.description || indicator;
};''')
    text = text.replace(
"  return candidates.filter(Array.isArray).flat();",
'''  return candidates
    .filter(Array.isArray)
    .flat()
    .map((item, index) =>
      typeof item === "string"
        ? { id: `economy-challenge-${index}`, title: "Défi économique", text: item, category: "Défis" }
        : item,
    );''')
    text = text.replace(
'''          Cette section présente les structures économiques dans leur contexte historique,
          les secteurs majeurs, les transformations de long terme et les défis contemporains.''',
'''          {dossier.economy?.editorialNote ||
            "Cette section présente les structures économiques dans leur contexte historique, les secteurs majeurs, les transformations de long terme et les défis contemporains."}''')
    return text

def society(text):
    text = common_sources(text)
    text = text.replace(
'''          Cette section relie les réalités contemporaines aux héritages historiques :
          urbanisation, accès aux services, transformations familiales, citoyenneté,
          inégalités spatiales et recompositions sociales.''',
'''          {dossier.society?.intro ||
            "Cette section relie les réalités contemporaines aux héritages historiques : urbanisation, accès aux services, transformations familiales, citoyenneté, inégalités spatiales et recompositions sociales."}''')
    return text

def symbols(text):
    text = common_sources(text)
    text = text.replace(
'''          Les symboles nationaux sont replacés dans leur contexte historique et politique.
          Leur signification officielle est distinguée des interprétations populaires ou
          rétrospectives.''',
'''          {dossier.national_symbols?.intro ||
            "Les symboles nationaux sont replacés dans leur contexte historique et politique. Leur signification officielle est distinguée des interprétations populaires ou rétrospectives."}''')
    return text

def international(text):
    text = common_sources(text)
    text = text.replace(
'''          Cette section distingue les appartenances institutionnelles, les partenariats,
          les responsabilités régionales et les positions diplomatiques. Une adhésion à
          une organisation ne signifie pas un alignement automatique sur toutes ses positions.''',
'''          {dossier.international_role?.intro ||
            "Cette section distingue les appartenances institutionnelles, les partenariats, les responsabilités régionales et les positions diplomatiques."}''')
    return text

def education(text):
    text = common_sources(text)
    text = text.replace(
'''        intro="Organisation scolaire, enseignement supérieur, accès, langues d’enseignement et inégalités."''',
'''        intro={education.intro || "Organisation scolaire, enseignement supérieur, accès, langues d’enseignement et inégalités."}''')
    text = text.replace(
'''        intro="Organisation du système sanitaire, accès aux soins, politiques publiques et principaux défis."''',
'''        intro={health.intro || "Organisation du système sanitaire, accès aux soins, politiques publiques et principaux défis."}''')
    return text

def heritage(text):
    text = common_sources(text)
    # Replace raw status display only inside the badge.
    text = text.replace(
"{item.status}",
'''{{ ready: "Établi", provisional: "À lire avec contexte", disputed: "Débat historique", "research-gap": "À suivre" }[item.status] || item.status}''',
    )
    return text

for name, fn in [
    ("SouthAfricaEconomyQuality.jsx", economy),
    ("SouthAfricaSocietyQuality.jsx", society),
    ("SouthAfricaSymbolsQuality.jsx", symbols),
    ("SouthAfricaInternationalQuality.jsx", international),
    ("SouthAfricaEducationHealthQuality.jsx", education),
    ("SouthAfricaHeritage.jsx", heritage),
]:
    edit(name, fn)

# Apply sourceIds support to the remaining enriched components.
for name in [
    "SouthAfricaCulture.jsx",
    "SouthAfricaFigures.jsx",
    "SouthAfricaHistory.jsx",
    "SouthAfricaMigrations.jsx",
    "SouthAfricaPeoples.jsx",
    "SouthAfricaPolities.jsx",
]:
    edit(name, common_sources)

print("\nOK: contenu existant mieux exploité, statuts traduits et sources restaurées.")
