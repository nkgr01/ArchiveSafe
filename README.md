# ArchiveSafe

<p align="center">
  <strong>Plateforme d'archivage de documents avec intelligence artificielle intégrée</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white" alt="Laravel">
  <img src="https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D" alt="Vue.js">
  <img src="https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white" alt="PHP">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
</p>

---

## ⚠️ Statut du projet

> **🔔 Version 1.0 - Projet en développement actif**
> 
> ArchiveSafe est actuellement en **première version (v1.0)**. Le projet a été récemment lancé et demande **constamment des améliorations et des optimisations**. Votre feedback et vos contributions sont essentiels pour nous aider à créer une meilleure plateforme ! 🚀

---

## 📋 À propos du projet

**ArchiveSafe** est une plateforme moderne et sécurisée d'archivage de documents avec intelligence artificielle intégrée. Elle permet aux organisations de gérer, classer et analyser leurs archives de manière intelligente et efficace.

### Fonctionnalités principales

✨ **Intelligence Artificielle**
- Classification automatique des documents
- Reconnaissance optique de caractères (OCR)
- Extraction de données intelligente
- Analyse de contenu et suggestions

📁 **Gestion documentaire**
- Upload et organisation des documents
- Métadonnées automatiques
- Système de versioning
- Recherche avancée et indexation

🔒 **Sécurité**
- Authentification sécurisée
- Contrôle d'accès granulaire
- Chiffrement des données sensibles
- Traçabilité complète des actions

⚙️ **Administration**
- Dashboard intuitif
- Gestion des utilisateurs et rôles
- Rapports et analytics
- Configuration flexible

---

## 🛠️ Stack technologique

| Domaine | Technologies |
|---------|--------------|
| **Frontend** | Vue.js (37.5%), TypeScript (6.1%), JavaScript (1.8%) |
| **Backend** | PHP (35.1%), Laravel Framework |
| **Templates** | Blade (19%) |
| **Styles** | CSS (0.4%), HTML (0.1%) |

### Dépendances principales

- **Laravel** : Framework PHP robuste pour le backend
- **Vue.js** : Framework JavaScript pour l'interface utilisateur
- **Composer** : Gestionnaire de dépendances PHP
- **NPM** : Gestionnaire de paquets JavaScript
- **Base de données** : Support MySQL/PostgreSQL

---

## 🚀 Installation et démarrage

### Prérequis

- PHP >= 8.1
- Composer
- Node.js >= 16
- NPM ou Yarn
- Base de données (MySQL 8.0+ ou PostgreSQL 13+)

### Étapes d'installation

1. **Cloner le repository**
```bash
git clone https://github.com/nkgr01/ArchiveSafe.git
cd ArchiveSafe
```

2. **Installer les dépendances PHP**
```bash
composer install
```

3. **Installer les dépendances JavaScript**
```bash
npm install
# ou
yarn install
```

4. **Configuration de l'environnement**
```bash
cp .env.example .env
php artisan key:generate
```

5. **Configuration de la base de données**
Modifiez les variables d'environnement dans le fichier `.env` :
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=archivesafe
DB_USERNAME=root
DB_PASSWORD=
```

6. **Migrations et seeders**
```bash
php artisan migrate
php artisan db:seed
```

7. **Compilation des assets**
```bash
npm run dev
# ou pour la production
npm run build
```

8. **Lancer le serveur de développement**
```bash
php artisan serve
```

L'application est accessible à `http://localhost:8000`

---

## 📖 Documentation

### Structure du projet

```
ArchiveSafe/
├── app/                    # Code applicatif
│   ├── Http/              # Controllers, Requests, Middleware
│   ├── Models/            # Modèles Eloquent
│   └── Services/          # Services métier
├── resources/
│   ├── views/             # Templates Blade
│   └── js/                # Composants Vue.js
├── routes/                # Définitions des routes
├── database/
│   ├── migrations/        # Migrations de base de données
│   └── seeders/           # Seeders
├── public/                # Fichiers publics (images, CSS compilé, JS)
├── config/                # Fichiers de configuration
└── tests/                 # Tests unitaires et fonctionnels
```

### Configuration

Les fichiers de configuration principaux :
- `config/app.php` : Configuration générale
- `config/database.php` : Configuration de la base de données
- `config/filesystems.php` : Configuration du stockage des fichiers
- `.env` : Variables d'environnement

---

## 🔐 Authentification et autorisation

### Authentification

ArchiveSafe utilise Laravel Sanctum/Passport pour l'authentification :

```php
// Login
POST /api/login
{
  "email": "user@example.com",
  "password": "password"
}
```

### Rôles et permissions

- **Admin** : Accès complet à la plateforme
- **Manager** : Gestion des documents et utilisateurs
- **User** : Consultation et upload de documents
- **Viewer** : Consultation uniquement

---

## 🤖 Intelligence Artificielle

### Fonctionnalités IA intégrées

**Classification de documents**
```php
// Classification automatique lors de l'upload
$document->classifyWithAI();
```

**Extraction de données**
```php
// Extraction des informations structurées
$data = $document->extractData();
```

**Recherche intelligente**
```php
// Recherche sémantique
$results = Document::searchByAI('facture client');
```

---

## 📊 API REST

### Endpoints principaux

**Documents**
```
GET    /api/documents                 # Lister les documents
POST   /api/documents                 # Créer un document
GET    /api/documents/{id}            # Récupérer un document
PUT    /api/documents/{id}            # Modifier un document
DELETE /api/documents/{id}            # Supprimer un document
```

**Utilisateurs**
```
GET    /api/users                     # Lister les utilisateurs
POST   /api/users                     # Créer un utilisateur
PUT    /api/users/{id}                # Modifier un utilisateur
DELETE /api/users/{id}                # Supprimer un utilisateur
```

**Recherche**
```
GET    /api/search?q=terme            # Recherche simple
GET    /api/search/advanced           # Recherche avancée
```

---

## 🧪 Tests

### Exécuter les tests

```bash
# Tests unitaires
php artisan test

# Tests avec coverage
php artisan test --coverage

# Tests spécifiques
php artisan test tests/Feature/DocumentTest.php
```

---

## 📦 Déploiement en production

### Préparation

1. **Optimisation du code**
```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

2. **Compilation des assets**
```bash
npm run build
```

3. **Migrations**
```bash
php artisan migrate --force
```

### Serveur web

Configuration recommandée avec Nginx :

```nginx
server {
    listen 80;
    server_name archivesafe.com;
    root /var/www/archivesafe/public;

    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php-fpm.sock;
        fastcgi_index index.php;
        include fastcgi_params;
    }
}
```

---

## 📝 Variables d'environnement

```
APP_NAME=ArchiveSafe
APP_ENV=production
APP_DEBUG=false
APP_URL=https://archivesafe.com

DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=archivesafe
DB_USERNAME=archivesafe_user
DB_PASSWORD=secure_password

MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=465
MAIL_USERNAME=your_username
MAIL_PASSWORD=your_password

# Configuration IA
AI_SERVICE=openai
AI_API_KEY=your_api_key

# Stockage des fichiers
FILESYSTEM_DISK=s3
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_DEFAULT_REGION=eu-west-1
AWS_BUCKET=archivesafe
```

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Veuillez suivre ces étapes :

1. Fork le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Poussez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

### Directives de contribution

- Respectez le style de code du projet
- Ajoutez des tests pour les nouvelles fonctionnalités
- Mettez à jour la documentation
- Écrivez des messages de commit clairs et descriptifs

---

## 🐛 Signaler un bug

Si vous trouvez un bug, veuillez créer une issue avec :
- Description du bug
- Étapes de reproduction
- Résultat attendu vs résultat obtenu
- Environnement (OS, versions, navigateur)
- Screenshots si applicable

---

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---

## 📧 Support et contact

Pour toute question ou support :
- 📧 Email : ashimadison8@gmail.com
- 🐛 Issues : [GitHub Issues](https://github.com/nkgr01/ArchiveSafe/issues)
- 💬 Discussions : [GitHub Discussions](https://github.com/nkgr01/ArchiveSafe/discussions)

---

## 🙏 Remerciements

Merci à tous les contributeurs qui ont aidé à rendre ce projet possible !

---

<p align="center">
  Fait avec ❤️ par <a href="https://github.com/nkgr01">nkgr01</a>
</p>

<p align="center">
  <a href="https://github.com/nkgr01/ArchiveSafe/stargazers">⭐ Stars</a> •
  <a href="https://github.com/nkgr01/ArchiveSafe/fork">🍴 Fork</a> •
  <a href="https://github.com/nkgr01/ArchiveSafe/issues">🐛 Issues</a>
</p>
