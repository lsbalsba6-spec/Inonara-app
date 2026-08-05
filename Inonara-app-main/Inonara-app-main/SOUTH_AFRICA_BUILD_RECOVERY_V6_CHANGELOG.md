# Afrique du Sud — correctif de build V6

## Cause
Le build Vercel échouait sur `Module not found` parce que deux composants importés par
`CountryDossierView.jsx` n'étaient pas présents dans le dépôt.

## Ajouts
- `SouthAfricaProvincesCities.jsx` : affiche les capitales nationales et les neuf provinces déjà présentes dans le dossier backend.
- `SouthAfricaSportMedia.jsx` : rendu robuste ; affiche le corpus lorsqu'il existe et un état public « À suivre » lorsqu'il est absent.
- `check_frontend_relative_imports.py` : détecte les imports relatifs cassés avant le push.

## Données
Aucun fait historique nouveau n'est inventé dans ce correctif. Il rétablit uniquement le branchement et le rendu des données déjà présentes.
