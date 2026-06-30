# Arborescence des Pages - ArchiveSafe 2.0

L'application est structurée autour d'un `MainLayout` avec une navigation latérale persistante.

## 🔐 Authentification (Public)
- `/login` : Page de connexion moderne avec validation PrimeVue.
- `/register` : Création de compte.
- `/forgot-password` : Récupération de compte.

## 🏠 Dashboard & Navigation (Privé)
- `/dashboard` :
    - Widget Stats : Volume de docs, stockage, docs en attente d'OCR.
    - Widget Activité : Documents récemment traités.
    - Widget Raccourcis : Upload rapide, recherches favorites.

- `/documents` :
    - Vue principale : `DataTable` avec recherche instantanée.
    - Navigation dossiers : `Tree` intégré dans la sidebar ou panneau gauche.
    - Filtrage avancé : Panneau de filtres (`Drawer`) coulissant.

- `/documents/:id` :
    - Visualiseur : Splitter (Document original $\leftrightarrow$ Métadonnées/IA).
    - Mode Focus : Interface épurée pour la lecture.
    - Actions : Menu contextuel pour Rename, Move, Tag.

- `/upload` :
    - Page dédiée au dépôt massif de documents.
    - Gestion de la file d'attente d'importation.
    - Suivi du statut OCR en temps réel.

## 🤖 Hub IA (Fonctionnalité Centrale)
- `/ai/chat/:id` :
    - Interface de chat immersive avec Gemini.
    - Historique des conversations par document.
    - Accès rapide aux extractions d'entités.

- `/ai/explore` :
    - Recherche sémantique (Recherche par concept et non par mot-clé).
    - Visualisation des documents similaires.
    - Analyse globale du corpus documentaire.

## 🛡️ Administration & Gouvernance (Rôle Admin)
- `/admin/audit` : Table complète des logs d'audit avec filtres avancés.
- `/admin/users` : Gestion des comptes et des rôles (User $ightarrow$ Admin).
- `/admin/settings` : Configuration système (Chemins OCR, API Keys Gemini).
- `/admin/monitoring` : État de la queue Redis et santé du serveur Laravel.

## 🗑️ Maintenance & Utilitaires
- `/trash` : Gestion de la corbeille avec options de restauration.
- `/profile` : Paramètres utilisateur, préférences de thème.
- `/404` / `/unauthorized` : Pages d'erreur stylisées.
