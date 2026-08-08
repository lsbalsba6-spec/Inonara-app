# Inonara Sprint V6 — Botswana quality & architecture

## Objectif
Consolider le dossier Botswana après le V5 et préparer la sortie progressive des composants historiquement nommés `SouthAfrica*`.

## Changements
- Ajout d'un quality gate éditorial pour le Botswana.
- Règles explicites : pays-centrique, sources obligatoires, distinction faits/traditions/interprétations.
- Contrôle attendu des routes migratoires et de leurs coordonnées.
- Ajout de points d'entrée génériques `CountryHistory`, `CountryMigrations` et `CountryCulture` sans casser les imports existants.
- Aucun remplacement artificiel de l'histoire botswanaise par celle d'un pays voisin.

## Important
Le V6 ne prétend pas résoudre encore toute la dette de nommage `SouthAfrica*`. Les alias permettent une migration progressive sans casser le routage existant.
