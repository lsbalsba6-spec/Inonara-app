# Audit complet d’INONARA / AfroAtlas

Date : 29 juillet 2026  
Base auditée : `Inonara-app-main.zip` fourni dans la conversation  
Portée : architecture, données, Atlas, backend, frontend, recherche historique, sécurité, SEO, accessibilité, tests et déploiement.

## 1. Verdict général

INONARA n’est plus un simple prototype. Le dépôt contient déjà :

- une application React complète avec 20+ pages ;
- une API FastAPI avec 30+ endpoints ;
- 249 pays/territoires dans le registre mondial ;
- 58 fiches pays africains ;
- 179 entités politiques historiques ;
- 145 communautés diasporiques ;
- 27 civilisations ;
- 96 fiches de personnalités chargées, mais 4 identifiants sont dupliqués ;
- un curseur temporel non linéaire de -300 millions d’années à 2025 ;
- un prototype `core_v3` Gabon/Afrique centrale ;
- une carte SVG/D3 interactive ;
- un module de questions IA, traduction et narration.

La vision est forte. Le principal problème n’est pas le manque de fonctionnalités : c’est la coexistence de plusieurs générations de données et de code qui ne sont pas encore alignées.

**Priorité stratégique : stabiliser et unifier avant d’étendre aux 200+ pays.**

---

## 2. Problèmes bloquants à corriger en premier

### P0.1 — Le dépôt contient des fichiers `.env`

Le ZIP contient :

- `backend/.env`
- `frontend/.env`

Le backend annonce notamment des variables MongoDB, Emergent LLM et ElevenLabs. Même si les valeurs ne sont pas affichées dans ce rapport, ces fichiers ne doivent jamais être envoyés, committés ou archivés publiquement.

**À faire :**

- retirer les `.env` du dépôt Git ;
- ajouter `backend/.env` et `frontend/.env` au `.gitignore` racine ;
- créer `.env.example` sans secret ;
- renouveler toute clé qui aurait déjà été publiée.

### P0.2 — Le dépôt est incohérent avec ses propres tests et commentaires PR

Des fichiers sont référencés mais absents :

- `backend/data/core_v3/adapter.py` attendu par `test_core_v3.py` ;
- `backend/data/core_v3/fixtures.py` attendu par les tests ;
- `frontend/src/lib/historicalTypes.js` référencé dans plusieurs fichiers ;
- `backend/data/historical_entities_migrated.json` attendu par l’endpoint v2 ;
- les scripts de migration v2 décrits dans les commentaires ne sont pas dans le ZIP.

Conséquence : la suite backend complète ne peut pas être collectée. L’endpoint `/historical-entities-v2` renverra une liste vide si le JSON manque.

**À faire :** choisir entre :

1. restaurer les fichiers manquants depuis Git/GitHub ;
2. supprimer proprement les fonctionnalités et tests morts ;
3. reconstruire une PR cohérente contenant code + données générées + tests.

### P0.3 — Les tests backend ne sont pas portables

La collection pytest échoue notamment parce que :

- `REACT_APP_BACKEND_URL` est obligatoire au moment de l’import ;
- un test lit en dur `/app/frontend/.env` ;
- plusieurs tests sont des tests d’intégration dépendant d’un serveur externe ;
- `test_core_v3.py` importe des fichiers absents.

Le test ciblé du pilote Gabon passe : **16/16**.

**À faire :** séparer clairement :

- tests unitaires sans réseau ;
- tests API avec `TestClient` FastAPI ;
- tests end-to-end optionnels ;
- tests hérités Emergent à déplacer dans `tests/legacy/` ou à corriger.

### P0.4 — L’Atlas affiche encore des routes dérivées non validées

L’API `/migration-routes` retourne :

- 10 macro-routes manuelles ;
- plus toutes les routes de `diaspora_derived_routes.json`.

Le commentaire annonce environ 175 routes dérivées. Leur génération part des fiches diaspora, ce qui est précisément la source de confusion entre :

- existence actuelle d’une diaspora ;
- activité temporelle d’une migration ;
- origine forcée historique ;
- flux contemporain volontaire.

**À faire :** ne plus publier automatiquement toutes les routes dérivées. Introduire un registre de publication : `ready`, `provisional`, `disputed`, `research-gap`, avec période et sources propres à chaque route.

### P0.5 — Le moteur de labels n’a pas d’anti-collision réel

Dans `Atlas.jsx`, l’affichage des labels de polities repose sur :

```js
p.radius_km * zoomScale > 700
```

Cela limite le nombre de labels, mais ne détecte aucun chevauchement à l’écran. Les labels v3 sont tous rendus sans collision. Cela explique les superpositions persistantes.

**À faire :** moteur de placement basé sur rectangles projetés, priorité, zoom et espace disponible. Ne pas seulement modifier le seuil.

---

## 3. Audit de l’architecture des données

### État actuel

Les données sont réparties entre :

- `seed_data.py` ;
- `seed_extended.py` ;
- `seed_expansion_v2.py` à `v7.py` ;
- `data/world_diaspora.py` ;
- `data/africa_origins.py` ;
- `data/historical_polities.py` ;
- `data/core_v3/`.

`data/__init__.py` fusionne ces sources à l’import.

### Problèmes

- Plusieurs versions de schémas coexistent : legacy, v2 incomplète, v3 pilote.
- Les fichiers Python de données sont très volumineux et difficiles à valider automatiquement.
- Les données sont chargées intégralement en mémoire au démarrage.
- Certaines données générées sont committées sans métadonnées claires sur le générateur et sa version.
- Les couleurs, résumés et dates font parfois partie de la même entrée alors qu’ils représentent des assertions distinctes.
- Les données sources et les données générées sont insuffisamment séparées.

### Recommandation

Créer trois niveaux :

1. `data/source/` : données humaines éditoriales et sourcées ;
2. `data/generated/` : artefacts produits par scripts ;
3. `data/public/` : seulement les entrées validées et servies à l’application.

Chaque génération doit produire un rapport : éléments inclus, exclus, erreurs, sources faibles et hash du fichier.

---

## 4. Audit historique et éditorial

### Points positifs

Le modèle v3 introduit déjà :

- `confidence` ;
- `integrationStatus` ;
- sources autonomes ;
- relations temporelles ;
- distinction entre `Place`, `Polity`, `People` ;
- recherches incomplètes et points disputés.

C’est la meilleure direction du dépôt.

### Faiblesses

- Le système v3 n’est utilisé que par un petit pilote.
- Les 179 polities legacy restent des cercles approximatifs.
- Les fiches pays de `africa_origins.py` mélangent souvent pays moderne, histoire ancienne, colonisation, diaspora et événements.
- L’existence d’un champ `sources` ne prouve pas que chaque affirmation est réellement soutenue par la source.
- Les sources sont souvent des chaînes de texte, pas des assertions reliées précisément.
- Les données contemporaines s’arrêtent en 2025 ; le modèle doit utiliser `ongoing` ou une date de mise à jour, pas repousser manuellement la fin chaque année.

### À approfondir

- registre d’assertions par fait ;
- date de consultation ;
- auteur, titre, éditeur, DOI/URL, pages ;
- source primaire/secondaire ;
- source académique/institutionnelle/généraliste ;
- distinction première attestation / période probable / règle d’affichage ;
- journal des corrections historiques.

---

## 5. Audit de la carte et du curseur

### Points solides

- Projection Equal Earth, plus juste pour les surfaces que Mercator.
- Zoom/pan D3 fonctionnel.
- Correction du double transform déjà documentée dans `WorldMap.jsx`.
- Un seul curseur continu et non linéaire.
- Trois modes internes : géologique, préhistorique, historique.
- Affichage des incertitudes du pilote v3.

### Problèmes

#### Pangée

La Pangée utilise les frontières modernes déplacées et tournées. Le code est honnête dans ses commentaires, mais l’interface doit l’indiquer clairement. Ce n’est pas une reconstruction tectonique scientifique.

#### Performance

- Carte SVG mondiale ;
- fichier TopoJSON de ~756 Ko importé dans le bundle ;
- toutes les couches principales chargées au montage ;
- beaucoup d’éléments SVG et rerenders au déplacement du curseur ;
- aucune virtualisation spatiale ;
- pas de Web Worker ;
- aucune mesure FPS/mémoire.

#### Labels

- pas d’anti-collision ;
- taille dépendant du zoom de façon parfois contre-intuitive ;
- pas de hiérarchie commune entre polities, peuples, lieux, diasporas et pilote v3 ;
- pas de sélection adaptative mobile/desktop.

#### Routes migratoires

- style décidé localement dans `Atlas.jsx` ;
- la couleur des données peut contredire le type ;
- macro-routes et routes dérivées sont fusionnées sans politique de publication ;
- type `mixed` trop vague ;
- diaspora et migration restent conceptuellement liées.

### Ordre recommandé pour la carte

1. Politique de publication des routes ;
2. modèle temporel propre des migrations ;
3. moteur unique de style ;
4. anti-collision labels ;
5. instrumentation performance ;
6. seulement ensuite nouvelles frontières et grandes quantités de données.

---

## 6. Audit backend et API

### Points positifs

- API lisible et endpoints simples ;
- réponses “slim” sur plusieurs listes ;
- erreurs 404 explicites ;
- séparation partielle des données lourdes ;
- Pydantic utilisé pour plusieurs requêtes.

### Problèmes

- `MONGO_URL` et `DB_NAME` sont obligatoires dès l’import, alors que MongoDB est annoncé comme optionnel.
- Le client Mongo est créé globalement sans gestion explicite de cycle de vie FastAPI.
- Les endpoints renvoient de grandes listes sans pagination.
- `/search` parcourt toutes les données en mémoire à chaque requête.
- Pas de version d’API structurée (`/api/v1`).
- Pas de schémas de réponse Pydantic pour la majorité des endpoints.
- Pas de cache HTTP, ETag, compression explicitement configurée ou pagination.
- Les erreurs du LLM sont renvoyées avec le texte de l’exception, ce qui peut exposer des détails techniques.
- L’historique de chat est accessible avec un simple `session_id` sans authentification.
- Le module digest stocke potentiellement des adresses e-mail : politique de confidentialité et consentement nécessaires.

### À faire

- rendre Mongo réellement optionnel ;
- utiliser `lifespan` pour ouvrir/fermer la connexion ;
- définir des modèles de réponse ;
- ajouter pagination et filtres ;
- indexer la recherche ou préconstruire un index ;
- limiter les requêtes IA ;
- nettoyer les erreurs publiques ;
- ajouter rate limiting et protection anti-abus.

---

## 7. Audit frontend et expérience utilisateur

### Points positifs

- identité visuelle cohérente ;
- architecture de pages déjà riche ;
- responsive prévu ;
- i18n centralisée ;
- composants Radix UI disponibles ;
- navigation vers les fiches détaillées.

### Problèmes

- Beaucoup de `.catch(() => {})` silencieux : l’utilisateur voit souvent “chargement” indéfiniment au lieu d’une erreur.
- Aucun Error Boundary global identifié.
- Pas de page 404.
- Plusieurs composants appellent Axios directement au lieu de passer par `lib/api.js`.
- Absence d’une couche de cache client ou de déduplication des appels.
- `Atlas.jsx` fait environ 1000 lignes : trop de responsabilités dans une seule page.
- `i18n.jsx` est très volumineux ; traductions à séparer par langue/module.
- Plusieurs images dépendent de domaines Emergent externes avec un fallback mondial unique.
- Le fallback d’image global modifie toute balise IMG via un listener DOM, ce qui peut masquer des erreurs de données.
- L’accessibilité des contrôles cartographiques, popups et curseur doit être auditée au clavier et lecteur d’écran.

### Découpage recommandé d’Atlas

- `AtlasDataProvider` ;
- `TimelineController` ;
- `GeologicalLayer` ;
- `PaleoLayer` ;
- `MigrationLayer` ;
- `HistoricalPolityLayer` ;
- `LabelLayer` ;
- `AtlasLegend` ;
- `AtlasDetailsPanel` ;
- `useAtlasVisibility` ;
- `useLabelLayout`.

---

## 8. SEO, partage et découvrabilité

### État actuel

`public/index.html` contient des métadonnées globales correctes, mais l’application est une SPA Create React App.

### Problèmes

- Toutes les pages partagent le même titre et la même description pour les moteurs qui n’exécutent pas correctement le JavaScript.
- Pas de titres/meta dynamiques visibles dans le code.
- Pas de sitemap ni robots.txt observés.
- Pas de données structurées Schema.org.
- Pas de rendu statique ou SSR pour les fiches pays, civilisations et histoires.
- Pas de canonical URL par page.
- Pas de pages éditoriales optimisées autour de requêtes de recherche précises.

### À faire

Court terme :

- React Helmet Async ;
- titres/descriptions/OG par page ;
- sitemap généré ;
- robots.txt ;
- canonical ;
- JSON-LD pour articles, personnes, lieux et datasets.

Moyen terme :

- pré-rendu statique des fiches majeures ou migration graduelle vers un framework SSR/SSG, sans réécrire l’Atlas interactif immédiatement.

---

## 9. Vie privée, RGPD et sécurité

### Risques relevés

- clés `.env` dans l’archive ;
- PostHog chargé automatiquement avec session recording ;
- aucun mécanisme de consentement visible avant le tracking ;
- script externe `assets.emergent.sh` chargé sur toutes les pages ;
- formulaire digest avec conservation d’e-mail ;
- historique IA conservé en base ;
- aucune authentification visible ;
- politique de rétention non documentée.

### À faire avant monétisation ou promotion large

- bannière de consentement conforme ;
- désactivation du tracking avant consentement dans les juridictions concernées ;
- politique de confidentialité ;
- mentions légales ;
- politique cookies ;
- durée de conservation ;
- procédure de suppression ;
- revue des scripts externes ;
- Content Security Policy ;
- rotation des secrets.

---

## 10. Qualité, tests et déploiement

### Constat vérifié

- compilation Python : réussie ;
- test pilote Gabon : 16/16 ;
- suite backend complète : collecte impossible, pour les raisons P0.2/P0.3 ;
- build frontend non exécuté dans l’environnement d’audit car les dépendances ne sont pas installées et le registre npm n’est pas accessible ;
- dépôt utilise `yarn.lock` mais les commandes précédentes utilisent souvent `npm`, ce qui peut produire des installations différentes.

### À faire

- choisir Yarn 1 ou npm et ne plus mélanger ;
- ajouter `.nvmrc` ou `.node-version` ;
- ajouter CI GitHub Actions ;
- lancer à chaque push : validation données, pytest unitaires, Jest, build ;
- ajouter test de démarrage API ;
- ajouter tests d’API avec TestClient ;
- ajouter tests Playwright/Cypress sur l’Atlas ;
- ajouter un script unique `./scripts/verify.sh`.

---

## 11. Anomalies de données confirmées

- 4 identifiants de personnalités sont dupliqués :
  - `lewis-latimer`
  - `mark-dean`
  - `katherine-johnson`
  - `garrett-morgan`
- Endpoint v2 historique sans son fichier JSON généré.
- Tests core_v3 attendent des modules absents.
- La documentation annonce environ 175 routes dérivées ; le dépôt contient un fichier généré séparé, alors que le registre Python principal ne contient que 10 macro-routes.
- L’année maximale du curseur est codée en dur à 2025. En 2026, “Aujourd’hui” affiche donc déjà une date dépassée.
- `era_end=2025` devrait être remplacé par un concept `ongoing` lorsque l’entité est réellement actuelle.

---

## 12. Roadmap priorisée

### Lot 0 — Sécuriser et rendre le dépôt reproductible

- retirer/renouveler les secrets ;
- restaurer ou supprimer les fichiers v2/v3 manquants ;
- corriger la suite de tests ;
- figer Node et le gestionnaire de paquets ;
- obtenir un build vert.

### Lot 1 — Fiabiliser l’Atlas actuel

- politique de publication des routes ;
- suppression des routes dérivées non validées ;
- registre migration séparé des diasporas ;
- style unique ;
- anti-collision labels ;
- mise à jour dynamique de “Aujourd’hui”.

### Lot 2 — Unifier les données historiques

- faire du v3 le schéma cible ;
- migrer un corpus pilote visible ;
- assertion registry ;
- sources autonomes ;
- états ready/provisional/disputed/research-gap ;
- conserver le legacy seulement via adaptateur temporaire.

### Lot 3 — Expérience et performance

- découper Atlas.jsx ;
- gestion d’erreurs ;
- cache client ;
- chargement par période/zoom ;
- mesures mobile ;
- optimisation ou migration graduelle vers rendu WebGL si les mesures le justifient.

### Lot 4 — SEO, confiance et croissance

- métadonnées dynamiques ;
- sitemap ;
- pages pré-rendues ;
- transparence des sources ;
- pages “dossiers historiques” ;
- analytics avec consentement ;
- suivi des conversions.

### Lot 5 — Monétisation

Seulement après stabilité et mesure d’usage :

- compte utilisateur ;
- favoris/parcours ;
- premium individuel ;
- licence établissement ;
- exports pédagogiques ;
- API/datasets sous licence ;
- offres studio et contenus.

---

## 13. Plan concret des prochaines archives Termux

### Archive A — `inonara-stabilisation-repo-v1.tar.gz`

- `.gitignore` racine ;
- `.env.example` ;
- `.nvmrc` ;
- script de vérification ;
- correction tests portables ;
- rapport des fichiers manquants ;
- correction des IDs dupliqués.

### Archive B — `inonara-migration-publication-policy-v1.tar.gz`

- registre des routes publiables ;
- désactivation des routes dérivées non validées ;
- séparation diaspora/route ;
- validation temporelle ;
- rapport automatisé.

### Archive C — `inonara-atlas-label-engine-v1.tar.gz`

- anti-collision ;
- priorité ;
- zoom adaptatif ;
- tests de placement.

### Archive D — `inonara-atlas-refactor-v1.tar.gz`

- découpage de `Atlas.jsx` ;
- gestion d’erreurs ;
- styles centralisés ;
- tests de couches.

### Archive E — `inonara-seo-foundation-v1.tar.gz`

- métadonnées par page ;
- sitemap ;
- robots ;
- canonical ;
- JSON-LD de base.

---

## 14. Commandes Termux pour établir une baseline propre

À lancer avant toute nouvelle archive :

```bash
cd ~/inonara-app

git status
git branch --show-current
git rev-parse --short HEAD

python --version
node --version
npm --version

python -m compileall -q backend

export PYTHONPATH=backend
python -m pytest -q backend/tests/test_pilot_gabon_central_africa.py
```

Pour inventorier les fichiers manquants connus :

```bash
cd ~/inonara-app

for f in \
  backend/data/core_v3/adapter.py \
  backend/data/core_v3/fixtures.py \
  backend/data/historical_entities_migrated.json \
  frontend/src/lib/historicalTypes.js
  do
    if [ -e "$f" ]; then
      echo "OK      $f"
    else
      echo "MANQUANT $f"
    fi
  done
```

## Conclusion

La plateforme a déjà une profondeur rare. Mais elle a atteint le point où ajouter plus de contenu sans stabiliser l’architecture coûtera plus cher que cela ne rapportera.

Le prochain travail utile n’est pas “encore un pays”. C’est **Archive A : stabilisation du dépôt**, puis **Archive B : politique de publication des migrations**.
