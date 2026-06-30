# Roadmap de Développement Frontend 2.0 - ArchiveSafe

Le développement suit une approche modulaire et centrée sur la valeur utilisateur.

## 🏁 Phase 1 : Infrastructure & Authentification
**Objectif :** Mise en place du socle technique et accès sécurisé.
- [ ] Setup Vite + Vue 3 + TypeScript + Tailwind CSS.
- [ ] Configuration de PrimeVue (Thème, Plugin, Icones).
- [ ] Implémentation de l'intercepteur Axios et du `authStore` (Pinia).
- [ ] Création du `AuthLayout` et des pages `/login` et `/register`.
- [ ] Intégration de Laravel Sanctum (Cookies/Tokens).

## 📁 Phase 2 : Core Gestion Documentaire
**Objectif :** Rendre le système de stockage et de recherche opérationnel.
- [ ] Implémentation du `MainLayout` (Sidebar PrimeVue `PanelMenu` + Header).
- [ ] Page `/documents` : `DataTable` PrimeVue avec recherche instantanée.
- [ ] Page `/documents/:id` : Visualiseur hybride (PDF/Images) avec panneau de métadonnées.
- [ ] Navigation dossiers via `Tree` PrimeVue.
- [ ] Implémentation de la corbeille (`/trash`) et des actions de masse.

## 📤 Phase 3 : Pipeline d'Ingestion Intelligent
**Objectif :** Automatiser l'entrée des documents avec un feedback visuel fort.
- [ ] Page `/upload` : `FileUpload` PrimeVue avec drag & drop multiple.
- [ ] Système de suivi de l'OCR via `Stepper` et `ProgressBar` PrimeVue.
- [ ] Notifications Toast pour les fins de traitement OCR.
- [ ] Gestion des erreurs d'upload via `ConfirmDialog`.

## 🤖 Phase 4 : Hub IA (La valeur ajoutée)
**Objectif :** Transformer le document en donnée exploitable via Gemini.
- [ ] Intégration du `AIResumer` (Panneau de résumé automatique).
 la page `/ai/chat/:id` avec l'interface de chat immersive.
- [ ] Système de suggestion de tags via `Chips` PrimeVue.
- [ ] Implémentation de l'extraction d'entités et de la recherche sémantique.
- [ ] Création de la page `/ai/explore` pour l'analyse globale du corpus.

## 🛠️ Phase 5 : Administration Enterprise
**Objectif :** Contrôler et monitorer la plateforme.
- [ ] Page `/admin/audit` : `DataTable` haute densité pour les logs d'audit.
- [ ] Page `/admin/users` : Gestion des comptes et rôles via `Dialog` PrimeVue.
- [ ] Page `/admin/settings` : Configuration système via `TabView`.
- [ ] Page `/admin/monitoring` : Santé du serveur et de la queue Redis.

## ✨ Phase 6 : Polissage & UX Finale
**Objectif :** Professionnalisation totale de l'interface.
- [ ] Implémentation du mode Sombre/Clair.
- [ ] Ajout des Skeletons de chargement partout.
- [ ] Optimisation du responsive design.
- [ ] Tests E2E sur les flux critiques.
- [ ] Finalisation des animations et transitions PrimeVue.
