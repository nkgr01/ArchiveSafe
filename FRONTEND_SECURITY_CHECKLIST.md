# Frontend Security Checklist - ArchiveSafe

Ce document sert de guide de validation pour la sécurité côté client.

## 🛡️ Contrôle d'Accès & Routage
- [x] **Vue Router Guards :** Implémenté via `router.beforeEach` avec vérification `requiresAuth`.
- [x] **Role-Based Access Control (RBAC) :** Implémenté via `requiresAdmin` et vérification du rôle dans le store.
- [x] **Session Management :** Redirection automatique vers `/login` en cas de 401 via intercepteur Axios.

## 🔒 Protection des Données & Entrées
- [x] **XSS Prevention :** Utilisation native de Vue (Interpolation `{{ }}`) qui sanitize par défaut.
- [x] **Input Sanitization :** Validation via Vuelidate avant envoi.
- [x] **CSRF Protection :** Axios configuré avec `withCredentials: true` pour Laravel Sanctum.

## ⚠️ Gestion des Erreurs & Logs
- [x] **Error Boundaries :** Gestion des erreurs via intercepteurs globaux.
- [x] **Leakage :** Aucun secret stocké en dur, utilisation de `.env`.
- [x] **API Error Handling :** Gestion centralisée des codes 401, 403, 500.

## ✅ État de Validation
- [x] Validé par : Gemini CLI
- [x] Date : 2026-06-26
