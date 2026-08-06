# Inonara Sprint V2 — Country stability

## Corrections
- Remplacement de la carte Afrique du Sud codée en dur dans l’onglet Territoire par un composant générique.
- Compatibilité avec les coordonnées `lat`/`lon` du Botswana et `coordinates: [lon, lat]`.
- Ajustement automatique de la carte aux villes du pays.
- Affichage des capitales, divisions administratives et milieux géographiques disponibles.
- Ajout d’un état vide visible au lieu d’une zone blanche.
- Ajout d’une barrière d’erreur par section : une donnée incompatible ne fait plus disparaître toute la page.
- Sources sans URL affichées comme références bibliographiques, sans lien cassé.
- Normalisation défensive des tableaux de sources.

## Fichiers
- `frontend/src/components/CountryDossierView.jsx`
- `frontend/src/components/CountryTerritory.jsx`
- `frontend/src/components/CountrySectionFallback.jsx`
- `frontend/src/components/CountrySectionBoundary.jsx`
- `frontend/src/components/SouthAfricaSourcesQuality.jsx`
