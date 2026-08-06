# Inonara Sprint V3 — Territoire générique renforcé

## Modifié
- `frontend/src/components/CountryTerritory.jsx`

## Améliorations
- accepte plusieurs structures de données pour les villes, capitales et divisions administratives ;
- prend en charge `provinces`, `districts`, `administrative_divisions` et leurs variantes imbriquées ;
- récupère la capitale depuis plusieurs emplacements possibles ;
- accepte les coordonnées sous forme `[longitude, latitude]` ou via `lat/lon/lng` ;
- affiche un contenu de secours explicite lorsqu'un dossier n'a pas encore de données territoriales ;
- évite qu'un pays provisoire donne l'impression d'une page cassée.

## Portée
Ce patch renforce le composant partagé par le Botswana et les autres dossiers africains sans modifier les données historiques existantes.
