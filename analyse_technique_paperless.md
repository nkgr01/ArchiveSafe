# Analyse Technique de Paperless-ngx pour Migration vers Laravel

Ce document présente une analyse technique exhaustive du projet **Paperless-ngx**, destinée à servir de spécification pour sa reconstruction complète avec le framework **Laravel (PHP)** et une base de données **MySQL**.

---

## 1. Architecture Globale du Système

Paperless-ngx utilise une architecture hybride combinant un backend monolithique et des processus de traitement asynchrones.

- **Backend (Monolithe API) :** Développé avec **Django (Python)** et **Django REST Framework**, il gère la logique métier, l'authentification, les permissions et l'exposition de l'API REST.
- **Traitement Asynchrone (Workers) :** Utilise **Celery** avec **Redis** comme broker de messages. C'est le cœur du système pour les tâches lourdes (OCR, indexation, consommation de fichiers).
- **Consommation de documents :** Un "Consumer" surveille des dossiers de consommation, déclenche des pipelines de traitement et met à jour la base de données.
- **Interface Utilisateur (Frontend) :** Application découplée (probablement Angular/React, située dans `src-ui`) communiquant exclusivement via l'API REST.
- **Stockage :** Système de fichiers pour les originaux et les archives PDF/A, base de données pour les métadonnées et le texte extrait.

---

## 2. Modules Fonctionnels Principaux

- **Gestion des Documents :** Cycle de vie complet (Upload $ightarrow$ Consommation $ightarrow$ OCR $ightarrow$ Archivage $ightarrow$ Stockage). Gestion du versioning des documents.
- **Système de Classification (Matching) :** Moteur de règles basé sur des algorithmes (Any word, All words, Regex, Fuzzy) pour assigner automatiquement des Tags, Correspondants et Types de documents.
- **Gestion des Métadonnées :**
    - **Correspondants :** Entités liées aux documents.
    - **Tags :** Système de tags hiérarchiques (Tree structure).
    - **Types de documents :** Catégorisation simple.
- **Flux d'Entrée :**
    - **Dossiers de consommation :** Importation automatique.
    - **Email :** Intégration IMAP pour importer des pièces jointes via des règles de courrier.
- **Workflows :** Système de déclencheurs (Triggers) et d'actions (Actions) pour automatiser des modifications de documents.
- **Recherche :** Moteur de recherche plein texte (Full-text search) basé sur le contenu extrait.

---

## 3. Structure de Base de Données (Cible MySQL)

### Modèles et Relations Clés

| Modèle | Champs Clés | Relations / Cardinalités |
| :--- | :--- | :--- |
| **User** | `username`, `email`, `password` | 1:N $ightarrow$ Documents, Tags, etc. |
| **Document** | `title`, `content` (TEXT), `checksum`, `created`, `modified`, `mime_type`, `page_count`, `filename`, `archive_filename`, `original_filename` | N:1 $ightarrow$ Correspondent, DocumentType, StoragePath, User (Owner) |
| **Correspondent** | `name`, `match` (règle), `matching_algorithm` | 1:N $ightarrow$ Documents |
| **Tag** | `name`, `color`, `parent_id`, `match` (règle), `matching_algorithm` | N:N $ightarrow$ Documents / 1:N $ightarrow$ Tags (Self-referencing) |
| **DocumentType** | `name`, `match` (règle), `matching_algorithm` | 1:N $ightarrow$ Documents |
| **StoragePath** | `path`, `name`, `match` (règle) | 1:N $ightarrow$ Documents |
| **CustomField** | `name`, `data_type` (string, date, bool, etc.) | 1:N $ightarrow$ CustomFieldInstance |
| **CustomFieldInstance** | `value_text`, `value_int`, `value_date`, etc. | N:1 $ightarrow$ Document, N:1 $ightarrow$ CustomField |
| **SavedView** | `name`, `sort_field`, `display_mode`, `display_fields` (JSON) | 1:N $ightarrow$ SavedViewFilterRule |
| **SavedViewFilterRule** | `rule_type`, `value` | N:1 $ightarrow$ SavedView |
| **MailAccount** | `email`, `password`, `imap_server`, `port`, `security` | 1:N $ightarrow$ MailRule |
| **MailRule** | `name`, `filter_query`, `action` | N:1 $ightarrow$ MailAccount |

---

## 4. Services Internes et Traitement Asynchrone

### Architecture des Workers (Laravel Queues)
L'implémentation Laravel devra utiliser **Redis** et les **Queues** pour reproduire les services Celery :

1. **DocumentConsumer :** Job qui surveille les sources d'entrée $ightarrow$ déclenche le pipeline OCR.
2. **OCRWorker :** Job dédié à l'exécution de `ocrmypdf` / `tesseract`.
3. **IndexingWorker :** Job qui met à jour l'index de recherche après l'extraction du texte.
4. **MailWorker :** Tâche planifiée (Scheduled Task) qui vérifie les comptes IMAP et injecte les documents dans la file de consommation.
5. **WorkflowEngine :** Job déclenché par des événements (DocumentCreated, DocumentUpdated) pour exécuter les actions automatisées.

---

## 5. Flux Complet OCR (Step-by-Step)

Le processus de consommation d'un fichier suit rigoureusement cet ordre :

1. **Pré-consommation :**
    - Vérification de l'existence du fichier.
    - Calcul du checksum (SHA256) pour éviter les doublons.
    - Exécution d'un script de pré-consommation optionnel.
2. **Analyse du Type :**
    - Détection du MIME type via `python-magic`.
    - Sélection du parser approprié (ex: `RasterisedDocumentParser` pour les images/PDF scannés).
3. **Traitement OCR (via ocrmypdf) :**
    - **Conversion :** Si c'est une image, conversion en PDF via `img2pdf`.
    - **Nettoyage :** Application de filtres (Deskew, Rotate, Clean) via Ghostscript/Tesseract.
    - **Extraction :** L'OCR génère un fichier PDF/A (archive) et un fichier texte "sidecar" (.txt).
4. **Extraction Finale :**
    - Récupération du texte brut depuis le sidecar ou le PDF produit.
    - Extraction de la date du document (via analyse du texte et du nom du fichier).
    - Génération d'une vignette (thumbnail) pour l'aperçu.
5. **Persistance :**
    - Création de l'entrée en base de données.
    - Déplacement du fichier original et de l'archive PDF/A vers le stockage final.
    - Suppression du fichier source.

---

## 6. Flux d’Indexation et de Recherche

- **Indexation :** Le champ `content` (texte brut) est stocké en base de données. Pour des performances optimales, Paperless-ngx utilise un index externe (**Tantivy** en Python).
- **Recherche Laravel :** Pour l'équivalent Laravel, il est recommandé d'utiliser :
    - **MySQL Full-Text Search** (pour des besoins simples).
    - **Laravel Scout** avec **Meilisearch** ou **Algolia** (pour reproduire la puissance de Tantivy : recherche floue, rapidité).
- **Filtrage :** Les recherches sont combinées avec des filtres sur les tags, correspondants et dates.

---

## 7. API Exposées (REST endpoints à réimplémenter)

L'API est structurée autour de ressources. Voici les routes critiques :

| Endpoint | Méthode | Rôle |
| :--- | :--- | :--- |
| `/api/documents` | GET, POST | Liste, recherche et upload de documents. |
| `/api/documents/{id}` | GET, PUT, DELETE | Détails, modification et suppression d'un document. |
| `/api/documents/{id}/download` | GET | Téléchargement du fichier original. |
| `/api/documents/{id}/thumb` | GET | Téléchargement de la vignette. |
| `/api/documents/{id}/preview` | GET | Affichage du document (conversion PDF). |
| `/api/tags` | GET, POST, PUT, DELETE | Gestion des tags. |
| `/api/correspondents` | GET, POST, PUT, DELETE | Gestion des correspondants. |
| `/api/document_types` | GET, POST, PUT, DELETE | Gestion des types de documents. |
| `/api/mail_accounts` | GET, POST, PUT, DELETE | Gestion des comptes mail. |
| `/api/mail_rules` | GET, POST, PUT, DELETE | Gestion des règles de courrier. |
| `/api/config` | GET, PUT | Configuration globale de l'application. |
| `/api/status` | GET | État du système (Workers, Redis). |

---

## 8. Dépendances et Technologies (Mapping Stack)

| Technologie Actuelle (Python) | Équivalent / Nécessité Laravel (PHP) | StatL |
| :--- | :--- | :--- |
| **Django / DRF** | **Laravel 11+** | $\checkmark$ |
| **Celery / Redis** | **Laravel Queues / Redis** | $\checkmark$ |
| **PostgreSQL / MariaDB** | **MySQL 8.0+** | $\checkmark$ |
| **Tesseract OCR** | **Tesseract (Binaire externe)** | Obligatoire |
| **ocrmypdf** | **ocrmypdf (Binaire externe via `shell_exec`)** | Obligatoire |
| **Tantivy** | **Laravel Scout $ightarrow$ Meilisearch** | Recommandé |
| **Gotenberg** | **Gotenberg (API Docker)** | Recommandé pour conversion PDF |
| **Tika-client** | **Apache Tika (API Docker)** | Recommandé pour extraction texte |
| **img2pdf** | **img2pdf (Binaire externe)** | Obligatoire |
| **Ghostscript** | **Ghostscript (Binaire externe)** | Obligatoire |
| **Django-allauth** | **Laravel Breeze / Fortify / Jetstream** | $\checkmark$ |
| **Django-guardian** | **Spatie Laravel Permissions** | $\checkmark$ |
| **Treenode** | **Nested Sets (Laravel-nestedset)** | $\checkmark$ |
