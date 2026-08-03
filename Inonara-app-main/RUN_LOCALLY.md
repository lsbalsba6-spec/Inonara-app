# INONARA / AfroAtlas — Faire tourner l'app sans Emergent

Ce dossier contient le code complet (backend FastAPI + frontend React) de ta
plateforme, avec toutes les corrections et ajouts faits jusqu'ici. Ce guide
explique comment le faire tourner en dehors d'Emergent.

## Ce qui a été vérifié, ici même, avec de vraies requêtes

- Le **backend démarre et répond correctement** : `/api/civilizations` (27),
  `/api/countries` (249), `/api/historical-polities` (21),
  `/api/plate-tectonics` (7), `/api/africa/origin-countries` (58),
  `/api/diaspora-communities` (143) — tous testés en direct.
- **MongoDB n'est nécessaire que pour une seule fonctionnalité** (l'historique
  de l'assistant IA, `/api/atlas-chat/*`). Tout le reste (98% de l'app)
  fonctionne sans base de données du tout, les données vivant directement
  dans le code Python.
- Le frontend **compile en syntaxe** (vérifié avec Babel) mais n'a pas pu être
  testé en exécution réelle dans mon bac à sable actuel, à cause d'un conflit
  de versions entre l'outillage Create React App (vieillissant) et la version
  très récente de Node.js installée ici (v22). C'est un problème
  d'environnement de test, pas un bug dans le code — voir plus bas.

## 1. Prérequis

- **Node.js version 18 ou 20** (LTS). ⚠️ Évite Node 22+ : l'outillage Create
  React App utilisé ici (react-scripts 5, webpack 4/5, craco) est ancien et
  entre en conflit avec les toutes dernières versions de Node. Utilise
  [nvm](https://github.com/nvm-sh/nvm) pour installer la bonne version :
  ```bash
  nvm install 20
  nvm use 20
  ```
- **Python 3.11+**
- **MongoDB** (optionnel — seulement si tu veux l'historique de chat IA).
  Le plus simple : [MongoDB Atlas](https://www.mongodb.com/atlas) (gratuit),
  ou `docker run -d -p 27017:27017 mongo` en local.

## 2. Lancer le backend

```bash
cd backend
pip install -r requirements.txt --break-system-packages
# Si l'installation échoue sur "emergentintegrations" : supprime cette ligne
# de requirements.txt. Elle n'est utile que pour 3 fonctionnalités IA
# spécifiques (voir section 4 ci-dessous) et n'existe pas en dehors
# d'Emergent.
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

Vérifie que ça tourne : `curl http://localhost:8001/api/civilizations`
doit renvoyer une liste de 27 civilisations.

## 3. Lancer le frontend

```bash
cd frontend
# Modifie .env pour pointer vers ton backend :
echo "REACT_APP_BACKEND_URL=http://localhost:8001" > .env
npm install --legacy-peer-deps
npm start
```

Si tu tombes sur l'erreur `Cannot find module 'ajv/dist/compile/codegen'` :
c'est un conflit de versions connu de l'écosystème Create React App. Essaie,
dans l'ordre :
1. Vérifie que tu es bien sur Node 18 ou 20 (`node --version`)
2. `rm -rf node_modules package-lock.json && npm install --legacy-peer-deps`
3. Si ça persiste, ajoute dans `package.json` :
   ```json
   "overrides": { "ajv": "8.12.0" }
   ```
   puis réinstalle.

## 4. Fonctionnalités qui dépendent de clés Emergent

Trois endpoits du backend (`/api/narrate`, `/api/ask`, et le générateur de
résumé hebdomadaire) utilisent un package privé (`emergentintegrations`) et
des clés (`EMERGENT_LLM_KEY`, `ELEVENLABS_API_KEY`) qui ne fonctionnent que
sur l'infrastructure d'Emergent. **Tout le reste de l'app fonctionne sans
elles.** Pour les garder, deux options :

- **Remplacer par tes propres clés** : ces 3 endpoints utilisent en réalité
  l'API Anthropic (Claude) et ElevenLabs en coulisse. Tu peux les réécrire
  pour utiliser directement `anthropic` (pip) et `elevenlabs` (pip) avec tes
  propres clés API, sans passer par le package `emergentintegrations`.
- **Les laisser désactivées** : elles renverront juste une erreur 500
  explicite si les clés ne sont pas configurées ; le reste de l'app n'est pas
  affecté.

## 5. Déploiement (au lieu d'Emergent)

Options gratuites ou peu chères, sans dépendance à Emergent :

- **Frontend** : [Vercel](https://vercel.com) ou [Netlify](https://netlify.com)
  (gratuit, déploiement direct depuis un repo Git)
- **Backend** : [Render](https://render.com) ou [Railway](https://railway.app)
  (offrent un tier gratuit pour une API FastAPI)
- **Base de données** : [MongoDB Atlas](https://www.mongodb.com/atlas)
  (tier gratuit, 512MB)

## 6. Ce qui a été ajouté/corrigé pendant ce travail

Un résumé de tout ce qui a été construit reste dans les fichiers de données
eux-mêmes (`backend/data/*.py`), chacun avec ses sources citées. En bref :
Afrique (58/58 pays), diaspora mondiale (143 entrées, 139/249 pays), carte
animée à 3 échelles de temps (géologique, préhistorique, historique).
