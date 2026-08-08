# Inonara — Sprint V7 — Botswana

## Objectif
Faire passer le dossier Botswana d'une structure enrichie à une structure réellement générique et source-first.

## Changements
- `CountryHistory` devient le rendu générique des chapitres historiques et conserve l'export rétrocompatible `SouthAfricaHistory`.
- `CountryMigrations` devient générique et conserve l'export rétrocompatible `SouthAfricaMigrations`.
- La carte migratoire calcule désormais ses limites à partir des coordonnées des routes au lieu d'imposer une carte Afrique australe.
- Les routes sans coordonnées valides ne sont pas dessinées artificiellement.
- Ajout d'un composant `CountrySources` pour rendre la bibliographie du dossier visible et consultable.
- Ajout d'une couche éditoriale V7 avec statuts de preuve et règles cartographiques.
- Aucun fait historique nouveau n'est inventé dans ce sprint : les affirmations continuent de dépendre des sources du dossier.

## Vérification
Le ZIP contient les composants et données nécessaires au sprint. Le rendu dépend toujours de l'intégration du dossier pays dans l'application principale.
