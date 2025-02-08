# CryptoLotto

**CryptoLotto** est une application de loterie décentralisée (Node.js, Express, TypeORM) qui utilise PostgreSQL via Docker.

## Prérequis
- [Node.js](https://nodejs.org/) (v16+ recommandé)
- [Docker](https://www.docker.com/) installé et lancé

## Installation
1. Installez les dépendances :
   ```bash
   npm install
   ```

## Démarrer PostgreSQL avec Docker
1. Lancez la base de données PostgreSQL (conteneur Docker) :
   ```bash
   docker compose up -d 
   ```
   Cette commande crée un conteneur nommé **`cryptolotto`** exposant **PostgreSQL** sur le port **5423**.

2. Vérifiez qu’il tourne :
   ```bash
   docker ps
   ```

## Lancer le serveur
Une fois PostgreSQL démarré :
```bash
npm run dev
```
Le serveur écoute sur **http://localhost:3000**.

## Routes 
- **GET** `/lotteries` Lister toutes les loteries. 
- **GET** `/lotteries/:id` Obtenir une loterie par son ID. 
- - **GET** `/lotteries/description` Lister les loteries filtrées par description et statut actif/inactif. Les paramètres de query `description` et `active` sont optionnels. 
- **Exemples :** - Filtrer par description uniquement (ex. "maison") : 
- ``` GET /lotteries/description?description=maison ``` 
- - Filtrer par statut actif uniquement : 
- ``` GET /lotteries/description?active=true ```
- - Combiner les deux filtres (description et actif) :
- ``` GET /lotteries/description?description=maison&active=true ```
- - **GET** `/lotteries/user/:metamaskId` Lister les loteries dans lesquelles un utilisateur (identifié par son `metamaskId`) a participé.

