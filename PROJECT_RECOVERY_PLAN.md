# PROJECT_RECOVERY_PLAN.md

## Plan de Correction Priorisé pour ArchiveSafe

Ce document détaille les actions nécessaires pour corriger les problèmes identifiés dans le rapport `PROJECT_REAL_STATE.md`. Les tâches sont classées par priorité et impact.

---

## Légende des Priorités

- **Critique** : Bloquant pour le fonctionnement de base. Doit être corrigé immédiatement.
- **Haute** : Impact majeur sur la stabilité ou l'UX. Doit être corrigé rapidement.
- **Moyenne** : Amélioration significative mais non bloquante.
- **Faible** : Optimisation ou amélioration mineure.

---

## Tâches Critiques

### 1. Corriger les Erreurs Bloquantes du Backend
**Priorité** : Critique
**Impact** : Empêche le fonctionnement de base du backend.

#### Sous-tâches :
1. **Ajouter l'index FULLTEXT** dans la migration `create_documents_table` pour les colonnes `title` et `content`.
   - **Fichier** : `database/migrations/xxxx_create_documents_table.php`
   - **Action** : Ajouter `$table->fullText(['title', 'content']);`

2. **Ajouter la colonne `role`** dans la migration `create_users_table`.
   - **Fichier** : `database/migrations/xxxx_create_users_table.php`
   - **Action** : Ajouter `$table->string('role')->default('user');`

3. **Créer le fichier `routes/api.php`** et définir toutes les routes API.
   - **Fichier** : `routes/api.php`
   - **Action** : Définir les routes pour les contrôleurs existants.

4. **Ajouter l'import manquant** pour `Str` dans `TesseractOCRService.php`.
   - **Fichier** : `app/Services/TesseractOCRService.php`
   - **Action** : Ajouter `use Illuminate\Support\Str;`

5. **Créer un `AppServiceProvider`** pour lier les interfaces à leurs implémentations.
   - **Fichier** : `app/Providers/AppServiceProvider.php`
   - **Action** : Ajouter les bindings pour `OCRServiceInterface` et `AIServiceInterface`.

**Validation** : Tester que le backend démarre sans erreurs et que les routes API sont accessibles.

---

### 2. Corriger les Erreurs Bloquantes du Frontend
**Priorité** : Critique
**Impact** : Empêche le démarrage du frontend.

#### Sous-tâches :
1. **Vérifier la configuration Vite** et corriger les erreurs de build.
   - **Fichier** : `vite.config.js`
   - **Action** : Vérifier les plugins et les chemins de résolution.

2. **Vérifier les dépendances** dans `package.json` et installer les packages manquants.
   - **Fichier** : `package.json`
   - **Action** : Exécuter `npm install` et résoudre les conflits.

3. **Corriger le routage** dans `router/index.ts`.
   - **Fichier** : `frontend/src/router/index.ts`
   - **Action** : Définir toutes les routes manquantes et vérifier les guards.

**Validation** : Tester que le frontend démarre sans erreurs et que les routes sont accessibles.

---

## Tâches de Priorité Haute

### 3. Finaliser l'Intégration API
**Priorité** : Haute
**Impact** : Améliore la stabilité et la fonctionnalité.

#### Sous-tâches :
1. **Finaliser l'intégration du Hub IA**.
   - **Fichiers** : `frontend/src/pages/ai/`, `app/Http/Controllers/AIController.php`
   - **Action** : Implémenter les endpoints et connecter le frontend.

2. **Tester et finaliser les routes d'administration**.
   - **Fichiers** : `frontend/src/pages/admin/`, `app/Http/Controllers/AdminController.php`
   - **Action** : Vérifier les permissions et les fonctionnalités.

**Validation** : Tester que toutes les APIs fonctionnent correctement.

---

### 4. Améliorer le Design et l'UX
**Priorité** : Haute
**Impact** : Améliore l'expérience utilisateur et la perception de qualité.

#### Sous-tâches :
1. **Créer un Design System cohérent** avec PrimeVue.
   - **Fichiers** : `frontend/src/assets/styles/`, `frontend/src/components/ui/`
   - **Action** : Définir les couleurs, typographie, et composants réutilisables.

2. **Améliorer les pages existantes** pour correspondre aux maquettes.
   - **Fichiers** : `frontend/src/pages/`
   - **Action** : Appliquer le design system et optimiser l'UX.

3. **Implémenter les pages manquantes** (ex: `/ai/explore`, `/admin/monitoring`).
   - **Fichiers** : `frontend/src/pages/ai/`, `frontend/src/pages/admin/`
   - **Action** : Créer les composants et connecter les APIs.

**Validation** : Vérifier que le design est cohérent et que l'UX est fluide.

---

## Tâches de Priorité Moyenne

### 5. Optimiser les Performances
**Priorité** : Moyenne
**Impact** : Améliore les performances et l'expérience utilisateur.

#### Sous-tâches :
1. **Optimiser le build Vite** pour la production.
   - **Fichier** : `vite.config.js`
   - **Action** : Configurer le code splitting et le lazy loading.

2. **Ajouter le lazy loading** pour les composants lourds.
   - **Fichiers** : `frontend/src/router/index.ts`
   - **Action** : Utiliser `() => import()` pour les routes.

3. **Optimiser les requêtes API** avec du caching.
   - **Fichiers** : `frontend/src/services/`
   - **Action** : Ajouter un cache pour les requêtes fréquentes.

**Validation** : Vérifier que les performances sont améliorées (Lighthouse).

---

### 6. Ajouter des Tests
**Priorité** : Moyenne
**Impact** : Améliore la stabilité et la maintenabilité.

#### Sous-tâches :
1. **Ajouter des tests unitaires** pour les contrôleurs et services backend.
   - **Fichiers** : `tests/Unit/`, `tests/Feature/`
   - **Action** : Écrire des tests pour les fonctionnalités critiques.

2. **Ajouter des tests E2E** pour les flux frontend.
   - **Fichiers** : `tests/e2e/`
   - **Action** : Utiliser Cypress ou Playwright pour tester les flux utilisateurs.

**Validation** : Vérifier que les tests passent et couvrent les cas critiques.

---

## Tâches de Priorité Faible

### 7. Améliorer l'Accessibilité
**Priorité** : Faible
**Impact** : Améliore l'accessibilité pour tous les utilisateurs.

#### Sous-tâches :
1. **Vérifier l'accessibilité** (a11y) des composants.
   - **Fichiers** : `frontend/src/components/`
   - **Action** : Ajouter des labels ARIA et vérifier la navigation clavier.

2. **Optimiser le responsive design**.
   - **Fichiers** : `frontend/src/assets/styles/`
   - **Action** : Vérifier l'affichage sur mobile et tablette.

**Validation** : Tester avec des outils comme Lighthouse ou axe.

---

### 8. Documentation et Nettoyage
**Priorité** : Faible
**Impact** : Améliore la maintenabilité.

#### Sous-tâches :
1. **Mettre à jour la documentation** des APIs.
   - **Fichiers** : `docs/`
   - **Action** : Documenter les endpoints et les exemples de requêtes.

2. **Nettoyer le code** (supprimer les commentaires inutiles, optimiser les imports).
   - **Fichiers** : `app/`, `frontend/src/`
   - **Action** : Utiliser des outils comme PHP-CS-Fixer et ESLint.

**Validation** : Vérifier que la documentation est à jour et que le code est propre.

---

## Plan d'Exécution

### Phase 1 : Correction des Erreurs Critiques (1-2 jours)
1. Corriger les erreurs bloquantes du backend.
2. Corriger les erreurs bloquantes du frontend.

### Phase 2 : Finalisation des Fonctionnalités (3-5 jours)
1. Finaliser l'intégration API.
2. Améliorer le design et l'UX.

### Phase 3 : Optimisation et Tests (2-3 jours)
1. Optimiser les performances.
2. Ajouter des tests.

### Phase 4 : Améliorations Mineures (1-2 jours)
1. Améliorer l'accessibilité.
2. Mettre à jour la documentation.

---

## Validation Finale

- **Backend** : Toutes les routes API sont accessibles et fonctionnelles.
- **Frontend** : Toutes les pages sont accessibles et fonctionnelles.
- **Design** : Cohérent et premium.
- **Performances** : Optimisées pour la production.
- **Tests** : Couverture des fonctionnalités critiques.

Une fois ces tâches accomplies, le projet sera prêt pour un déploiement en production.
