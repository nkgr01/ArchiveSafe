# 📦 ArchiveSafe - Présentation Finale & Documentation Complète

## 1. Présentation du Projet
**ArchiveSafe** est une plateforme d'archivage numérique sécurisée conçue pour transformer des documents statiques en une base de connaissances interactive. Le système automatise l'ingestion via OCR et enrichit les documents grâce à l'intelligence artificielle (Google Gemini).

### Objectifs Principaux
- **Centralisation** : Un dépôt unique pour tous les documents administratifs et professionnels.
- **Intelligence** : Capacité de résumer, questionner et explorer sémantiquement le corpus documentaire.
- **Sécurité** : Contrôle d'accès strict (RBAC) et traçabilité totale via des logs d'audit.
- **Performance** : Traitement asynchrone des documents via des files d'attente Redis.

---

## 2. Architecture Technique

### Stack Technologique
| Couche | Technologie | Rôle |
| :--- | :--- | :--- |
| **Backend** | Laravel 11 (PHP 8.2+) | API REST, Logique métier, Gestion DB |
| **Frontend** | Vue 3 (TS) + Vite | Interface utilisateur réactive |
| **State Management** | Pinia | Gestion d'état globale |
| **UI Framework** | PrimeVue + Tailwind CSS | Composants UI et Design System |
| **IA** | Google Gemini Pro | Résumés, Chat, Analyse sémantique |
| **Base de Données** | MySQL / SQLite | Stockage des métadonnées et utilisateurs |
| **Cache/Queue** | Redis | Gestion des jobs OCR et cache système |
| **Authentification** | Laravel Sanctum | Tokens API sécurisés |

### Flux de Données
1. **Ingestion** : Upload $ightarrow$ Stockage $ightarrow$ Job Redis $ightarrow$ OCR $ightarrow$ Extraction Texte.
2. **Enrichissement** : Texte OCR $ightarrow$ Gemini API $ightarrow$ Résumé/Tags $ightarrow$ Base de données.
3. **Consommation** : Requête Utilisateur $ightarrow$ Store Pinia $ightarrow$ API Laravel $ightarrow$ Gemini $ightarrow$ Interface.

---

## 3. Guide d'Installation

### Prérequis
- PHP $\ge$ 8.2
- Composer
- Node.js $\ge$ 18
- Redis Server
- Clé API Google Gemini

### Installation du Backend
```bash
# 1. Cloner et installer les dépendances
cd backend
composer install

# 2. Configuration environnement
cp .env.example .env
# Modifier .env : DB_DATABASE, REDIS_HOST, GEMINI_API_KEY

# 3. Initialisation
php artisan key:generate
php artisan migrate --seed
php artisan config:cache
php artisan route:cache

# 4. Lancer le serveur et les workers
php artisan serve
php artisan queue:work
```
> **Note :** Le point d'entrée principal de l'application (racine du serveur web) se trouve dans le dossier `public/index.php`.

### Installation du Frontend
```bash
# 1. Installation
cd frontend
npm install

# 2. Configuration
cp .env.example .env
# Modifier .env : VITE_API_BASE_URL=http://localhost:8000/api

# 3. Lancement
npm run dev
```

---

## 4. Documentation de l'API

### Authentification
| Endpoint | Méthode | Description |
| :--- | :--- | :--- |
| `/api/login` | `POST` | Authentification et retour de token |
| `/api/register` | `POST` | Création de compte utilisateur |
| `/api/logout` | `POST` | Révocation du token actuel |
| `/api/me` | `GET` | Informations de l'utilisateur connecté |

### Gestion Documentaire
| Endpoint | Méthode | Description |
| :--- | :--- | :--- |
| `/api/documents` | `GET` | Liste paginée avec filtres (search, tags, date) |
| `/api/documents/{id}` | `GET` | Détails complets d'un document |
| `/api/documents/{id}` | `PUT` | Mise à jour du titre et des métadonnées |
| `/api/documents/{id}` | `DELETE` | Déplacement vers la corbeille (soft delete) |
| `/api/documents/trash` | `GET` | Liste des documents supprimés |

### Hub IA (Gemini)
| Endpoint | Méthode | Description |
| :--- | :--- | :--- |
| `/api/ai/summarize/{id}` | `GET` | Génération d'un résumé concis |
| `/api/ai/suggest-tags/{id}` | `GET` | Suggestions de tags basées sur le contenu |
| `/api/ai/chat/{id}` | `POST` | Question/Réponse basée sur le document |
| `/api/ai/explore` | `GET` | Recherche sémantique globale |

### Administration
| Endpoint | Méthode | Description |
| :--- | :--- | :--- |
| `/api/admin/users` | `GET/POST/PUT/DELETE` | Gestion complète du parc utilisateur |
| `/api/admin/system/status` | `GET` | Santé globale du système |
| `/api/admin/system/storage` | `GET` | Métriques de l'espace disque |
| `/api/admin/system/redis` | `GET` | État de la connexion Redis |
| `/api/admin/system/queue` | `GET` | Volume des tâches OCR en attente |

---

## 5. Manuel Utilisateur & Administrateur

### Pour l'Utilisateur
1. **Importation** : Utilisez l'onglet "Upload" pour ajouter vos PDF. Le système traite le texte en arrière-plan.
2. **Organisation** : Recherchez vos documents par mots-clés ou filtrez par tags.
3. **Exploration IA** :
    - **Résumé** : Cliquez sur "Résumer" dans le détail d'un document pour obtenir l'essentiel.
    - **Chat** : Posez des questions spécifiques ("Quelle est la date d'expiration du contrat ?") dans l'Assistant IA.
    - **Sémantique** : Utilisez l'Explorateur pour trouver des concepts à travers tous vos fichiers.

### Pour l'Administrateur
1. **Gestion des Accès** : Via `Admin > Utilisateurs`, vous pouvez modifier les rôles (Admin/User) pour restreindre l'accès aux fonctions sensibles.
2. **Surveillance** : L'onglet `Monitoring` permet de vérifier que le worker Redis traite bien les fichiers OCR et que le stockage n'est pas saturé.
3. **Audit** : Consultez les `Logs d'Audit` pour savoir qui a supprimé ou modifié un document et quand.

---

## 6. Plan de Maintenance

### Sauvegardes (Backups)
- **Base de données** : Backup quotidien via `mysqldump` ou `sqlite3 .dump`.
- **Fichiers** : Synchronisation du dossier `storage/app/private` vers un stockage S3 ou NAS.

### Mises à jour & Sécurité
- **Dépendances** : Exécution trimestrielle de `composer update` et `npm update`.
- **Logs** : Rotation des logs Laravel tous les 30 jours pour éviter la saturation disque.
- **Audit Sécurité** : Vérification semestrielle des permissions RBAC et rotation des clés API Gemini.

### Monitoring de Santé
- Vérification hebdomadaire du taux d'échec des jobs OCR via le dashboard d'administration.
- Surveillance de la latence de l'API Gemini.
