# Architecture Frontend 2.0 - ArchiveSafe (Enterprise SaaS)

## 🌟 Vision Produit
ArchiveSafe devient une plateforme Enterprise SaaS de gestion documentaire intelligente. L'expérience utilisateur doit être fluide, robuste et inspirer la confiance. Elle s'adresse aux professionnels (comptables, juristes, médecins, administrations) et doit offrir une productivité maximale.

## 🛠️ Stack Technique Obligatoire
- **Framework :** Vue 3 (Composition API)
- **Build Tool :** Vite
- **Langage :** TypeScript
- **UI Framework :** PrimeVue v4+ (L'ossature UI complète)
- **Icônes :** PrimeIcons
- **Styling :** Tailwind CSS (Pour le layout et les micro-ajustements)
- **State Management :** Pinia (Store modulaire)
- **Routing :** Vue Router 4
- **HTTP Client :** Axios (Intercepteurs pour Laravel Sanctum)
- **Authentification :** Laravel Sanctum (Stateful cookies / Token)

## 🏗️ Architecture Logicielle (Vue 3)

### 1. Structure des Stores (Pinia)
L'état global est découpé en stores spécialisés :
- `authStore` : Gestion de la session, utilisateur actuel et permissions.
- `documentStore` : Cache des documents, état de la recherche, filtres actifs.
- `aiStore` : Historique des chats IA, état des résumés, suggestions de tags.
- `uiStore` : Thème (clair/sombre), état de la sidebar, notifications globales.
- `uploadStore` : File d'attente d'upload, suivi du statut OCR en temps réel.

### 2. Couche Service (API Layer)
- **Client Axios :** Instance configurée avec `withCredentials: true` pour Sanctum.
- **Services Typés :** Classes ou fonctions TypeScript encapsulant les appels API par domaine (ex: `DocumentService.ts`, `AIService.ts`, `AuthService.ts`).
- **Intercepteurs :**
    - *Request :* Ajout automatique des headers requis.
    - *Response :* Gestion centralisée des erreurs (401 $ightarrow$ Redirection login, 403 $ightarrow$ Notification Toast "Accès Refusé").

### 3. Gestion du Routage
- **Vue Router :**
    - Routes imbriquées (Layouts) : `MainLayout.vue` $ightarrow$ `PageVue`.
    - Navigation Guards : Vérification de l'authentification et des rôles (Admin/User) via le `authStore`.
- **Lazy Loading :** Chargement différé de tous les modules de pages pour optimiser le LCP (Largest Contentful Paint).

### 4. Stratégie d'Intégration PrimeVue
- **Utilisation Native :** Priorité absolue aux composants PrimeVue.
- **Theming :** Utilisation du système de thèmes de PrimeVue (Styled mode) pour garantir une cohérence visuelle parfaite entre tous les composants.
- **Custom Components :** Création de composants "wrapper" uniquement pour encapsuler une logique métier complexe autour d'un composant PrimeVue.

## 🚀 Performance & Évolutivité
- **Virtual Scrolling :** Utilisation de `VirtualScroller` de PrimeVue pour les listes de documents massives.
- **Async Components :** Chargement asynchrone des modules IA et Admin.
- **Type Safety :** Typage strict de toutes les réponses API via des interfaces TypeScript pour éviter les erreurs d'exécution.
