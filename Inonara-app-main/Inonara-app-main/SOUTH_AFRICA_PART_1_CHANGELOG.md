# Afrique du Sud — Partie 1 : navigation et branchement du dossier maître

Cette étape ne rajoute pas encore de nouvelles affirmations historiques. Elle stabilise l'accès au dossier Afrique du Sud déjà présent dans le dépôt.

## Changements

- Ajout d'un index API léger `GET /api/country-dossiers`.
- Le frontend découvre désormais automatiquement les dossiers pays publiés.
- Suppression du code qui connaissait uniquement l'Afrique du Sud en dur.
- Le menu Pays affiche un badge `Dossier` pour toute entrée documentée.
- Les liens utilisent le slug déclaré par chaque dossier maître.
- Tri alphabétique français cohérent à l'intérieur de chaque région.
- Texte générique corrigé : le Gabon n'est plus présenté comme l'unique page approfondie.
- Tests backend ajoutés pour l'index et le détail du dossier.

## Non inclus dans cette étape

- nouvelles données historiques ;
- routes migratoires publiques ;
- géométries historiques ;
- changements sur l'Atlas.
