# Structure des Dossiers Frontend - ArchiveSafe 2.0

L'organisation suit les meilleures pratiques de Vue 3 + Vite pour un projet Enterprise.

```text
frontend/
├── public/                 # Assets statiques (favicon, logos)
├── src/
│   ├── api/                # Couche de communication HTTP
│   │   ├── axios.ts        # Instance Axios et intercepteurs
│   │   └── services/       # Services typés par domaine
│   │       ├── auth.service.ts
│   │       ├── doc.service.ts
│   │       └── ai.service.ts
│   ├── assets/             # Styles globaux et images
│   │   ├── styles/
│   │   │ и  main.css       # Tailwind + PrimeVue overrides
│   │   └── images/
│   ├── components/         # Composants Vue
│   │   ├── ui/             # Wrappers de composants PrimeVue
│   │   │   └── BaseButton.vue
│   │   │   └── BaseInput.vue
│   │   ├── domain/         # Composants métier
│   │   │   ├── docs/       # Gestion documentaire
│   │   │   │   └── DocDataTable.vue
│   │   │   │   └── DocViewer.vue
│   │   │   ├── ai/         # Module IA
│   │   │   │   └── AIChatWindow.vue
│   │   │   │   └── AIResumer.vue
│   │   │   │   └── AITagSuggest.vue
│   │   │   │   └── AIEntityExtractor.vue
│   │   │   │   └── AIExplorer.vue
│   │   │   └── upload/     # Ingestion
│   │   │   │   └── UploadManager.vue
│   │   │   │   └── OCRStepper.vue
│   │   │   │   └── OCRProgressBar.vue
│   │   │   │   └── UploadStatusList.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   │   └── FileUploadZone.vue
│   │   │   └── admin/       # Administration
│   │       │   └── AdminUserTable.vue
│   │       │   └── AuditLogTable.vue
│   │       │   └── SystemSettingsPanel.vue
│   ├── layouts/           # Layouts de l'application
│   │   └── MainLayout.vue
│   │   └── AuthLayout.vue
│   ├── pages/              # Vues de l'application (Pages)
│   │   └── auth/           # Authentification
│   │   │   └── Login.vue
│   │   │   │   └── Register.vue
│   │   │   │   └── ForgotPassword.vue
│   │   │   └── dashboard/  # Tableau de bord
│   │   │   │   └── Dashboard.vue
│   │   │   │   └── StatsWidgets.vue
│   │   │   └── documents/  # Gestion documentaire
│   │   │   │   └── DocList.vue
│   │   │   │   │   └── DocDetail.vue
│   │   │   │   │   └── DocExplorer.vue
│   │   │   │   │   └── DocTrash.vue
│   │   │   │   │   └── DocUpload.vue
│   │   │   │   └── ai/       # Module IA
│   │   │   │   │   └── AIChat.vue
│   │   │   │   │   │   └── AIExplorer.vue
│   │   │   │   │   │   └── AIAnalysis.vue
│   │   │   │   │   └── profile/    # Profil utilisateur
│   │   │   │   │   │   └── Profile.vue
│   │   │   │   │   └── admin/     # Administration
│   │   │   │   │   │   │   └── AuditLogs.vue
│   │   │   │   │   │   │   └── UserManagement.vue
│   │   │   │   │   │   │   │   └── SystemSettings.vue
│   │   │   │   │   │   │   │   └── Monitoring.vue
│   ├── stores/             # Stores Pinia
│   │   └── auth.store.ts
│   │   │   └── doc.store.ts
│   │   │   │   └── ai.store.ts
│   │   │   │   └── ui.store.ts
│   │   │   │   └── upload.store.ts
│   │   ├── composables/    # Logique réutilisable (Vue 3)
│   │   │   └── useAuth.ts
│   │   │   │   └── useDocuments.ts
│   │   │   │   │   └── useAI.ts
│   │   │   │   │   └── useOCR.ts
│   │   │   │   └── useNotification.ts
│   │   ├── router/         # Configuration du routage
│   │   │   └── index.ts
│   │   └── main.ts          # Point d'entrée de l'application
└── package.json
