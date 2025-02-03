# CryptoLotto

**CryptoLotto** est une application de loterie décentralisée (Node.js, Express, TypeORM) qui utilise MySQL via Docker.

## Prérequis
- [Node.js](https://nodejs.org/) (v16+ recommandé)
- [Docker](https://www.docker.com/) installé et lancé

## Installation
1. Clonez le dépôt :
   ```bash
   git clone https://github.com/AbdallahSlimane/cryptolotto-api.git
   cd cryptolotto
   ```
2. Installez les dépendances :
   ```bash
   npm install
   ```

## Démarrer MySQL avec Docker
1. Lancez la base de données MySQL (conteneur Docker) :
   ```bash
   npm run docker
   ```
   Cette commande crée un conteneur nommé **`cryptolotto-mysql`** exposant **MySQL** sur le port **3306**.

2. Vérifiez qu’il tourne :
   ```bash
   docker ps
   ```

## Lancer le serveur
Une fois MySQL démarré :
```bash
npm run dev
```
Le serveur écoute sur **http://localhost:3000**.

## Routes principales
- **POST** `/lotteries` : Créer une loterie  
- **GET** `/lotteries` : Lister toutes les loteries  
- **GET** `/lotteries/:id` : Obtenir une loterie par son ID  
- **GET** `/lotteries/active?active=true` : Lister les loteries actives (ou inactives avec `false`)  
- **GET** `/lotteries/user/:metamaskId` : Lister les loteries d’un utilisateur  
- **POST** `/lotteries/buy-ticket` : Acheter un ticket

---
