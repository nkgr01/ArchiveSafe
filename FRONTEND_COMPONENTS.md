# Organisation des Composants - ArchiveSafe 2.0

L'architecture des composants suit la logique de Vue 3 (Composition API) et est organisée par domaine métier.

## 🏗️ 1. Architecture des Dossiers
Le code sera organisé comme suit :
- `src/components/ui` : Composants PrimeVue customisés (Wrappers de design).
- `src/components/domain` : Composants liés à la logique métier.
- `src/layouts` : Layouts de l'application.
- `src/stores` : Stores Pinia modulaire.
- `src/services` : Logique d'appel API Axios.
- `src/composables` : Logique réutilisable (ex: `useOCRStatus`, `useDocumentFilter`).

## 🧩 2. Composants par Domaine Métier

### A. Module Navigation & Layout
- `AppLayout` : Structure globale (Sidebar + Header + Content).
- `AppSidebar` : Navigation `PanelMenu` avec gestion du mode rétractable.
- `AppHeader` : Barre de recherche globale, profil, notifications.
- `AppBreadcrumb` : Fil d'ariane dynamique basé sur le routeur.

### B. Module Gestion Documentaire
- `DocDataTable` : Table complexe basée sur `DataTable` avec tri et filtres.
- `DocTreeExplorer` : Explorateur de fichiers basé sur `Tree`.
- `DocViewer` : Visualiseur hybride (PDF/Images) avec zoom et rotation.
- `DocMetadataPanel` : Formulaire d'édition des métadonnées via `Drawer`.
- `DocContextMenu` : Menu d'actions rapides sur les lignes de la table.

### C. Module Ingestion & OCR
- `UploadManager` : Gestionnaire d'upload `FileUpload` avec file d'attente.
- `OCRStepper` : Indicateur de progression du pipeline OCR via `Stepper`.
- `OCRProgressBar` : Barre de progression liée à l'état du document.

### D. Module IA (Core)
- `AIChatWindow` : Interface de chat avec Gemini (Bulles de messages, ScrollPanel).
- `AIResumer` : Panneau d'affichage du résumé automatique.
- `AITagSuggest` : Système de suggestion de tags via `Chips`.
- `AIEntityExtractor` : Affichage des données structurées extraites.

### E. Module Administration
- `AdminUserTable` : Gestion des utilisateurs avec `Dialog` d'édition.
- `AuditLogTable` : Visualisation haute densité des logs d'audit.
- `SystemSettingsPanel` : Formulaire de configuration système avec `TabView`.

## 🔒 3. Composants de Logique (Composables)
- `useAuth` : Gestion de la session et des permissions.
- `useDocuments` : Logique de récupération et filtrage des documents.
- `useAI` : Interaction avec le service Gemini (Streaming de réponses, historique).
- `useOCR` : Monitoring du statut de traitement des documents.
