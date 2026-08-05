#!/usr/bin/env python3
from pathlib import Path

BASE = Path("frontend/src/components")

def patch(name, old, new):
    p = BASE / name
    t = p.read_text(encoding="utf-8")
    if new in t:
        print("Déjà corrigé:", name)
        return
    if old not in t:
        raise SystemExit("Motif introuvable: " + name)
    p.write_text(t.replace(old, new, 1), encoding="utf-8")
    print("Corrigé:", name)

patch("SouthAfricaEconomyQuality.jsx",
'''  const items = useMemo(
    () => normalizeEconomy(dossier),
    [dossier.economy, dossier.economy_topics],
  );''',
'''  const items = useMemo(
    () => normalizeEconomy(dossier),
    [dossier],
  );''')

patch("SouthAfricaInternationalQuality.jsx",
'''  const items = useMemo(
    () => normalizeInternational(dossier),
    [dossier.international_role, dossier.international, dossier.global_role, dossier.international_topics],
  );''',
'''  const items = useMemo(
    () => normalizeInternational(dossier),
    [dossier],
  );''')

patch("SouthAfricaSymbolsQuality.jsx",
'''  const items = useMemo(
    () => normalizeSymbols(dossier),
    [dossier.national_symbols, dossier.symbols, dossier.symbol_items],
  );''',
'''  const items = useMemo(
    () => normalizeSymbols(dossier),
    [dossier],
  );''')

patch("SouthAfricaEducationHealthQuality.jsx",
'''  const education = dossier.education_health?.education || dossier.education || {};
  const health = dossier.education_health?.health || dossier.health || {};
  const educationItems = useMemo(
    () => Array.isArray(education) ? education : (education.items || []),
    [education],
  );
  const healthItems = useMemo(
    () => Array.isArray(health) ? health : (health.items || []),
    [health],
  );''',
'''  const education = useMemo(
    () => dossier.education_health?.education || dossier.education || {},
    [dossier.education_health?.education, dossier.education],
  );
  const health = useMemo(
    () => dossier.education_health?.health || dossier.health || {},
    [dossier.education_health?.health, dossier.health],
  );
  const educationItems = useMemo(
    () => Array.isArray(education) ? education : (education.items || []),
    [education],
  );
  const healthItems = useMemo(
    () => Array.isArray(health) ? health : (health.items || []),
    [health],
  );''')

print("OK: 4 erreurs Vercel corrigées.")
