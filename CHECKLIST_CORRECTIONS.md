# Checklist des Corrections - ArchiveSafe

Ce document liste toutes les actions techniques à entreprendre pour rendre l'application ArchiveSafe totalement fonctionnelle.

## 🛠️ Priorité Haute (Bloquant)

- [ ] **Routes API :** Créer le fichier `routes/api.php` et déclarer toutes les routes pour `AuthController`, `DocumentController`, `UploadController` et `SummaryController`.
- [ ] **Service Provider :** Créer ou modifier `app/Providers/AppServiceProvider.php` pour ajouter les bindings :
    - `OCRServiceInterface` $ightarrow$ `TesseractOCRService`
    - `AIServiceInterface` $ightarrow$ `GeminiAIService`
- [ ] **Migration Index FULLTEXT :** Modifier la migration `create_documents_table` pour ajouter : 
  `$table->fullText(['title', 'content']);`
- [ ] **Migration User Role :** Modifier la migration `create_users_table` pour ajouter la colonne `string('role')->default('user')`.

## 🛠️ Priorité Moyenne (Stabilité)

- [ ] **Correctif Imports :** Ajouter `use Illuminate\Support\Str;` dans `TesseractOCRService.php`.
- [ ] **Validation Binaires :** Ajouter une méthode de vérification de la présence de `ocrmypdf` et `pdfinfo` au démarrage du service.
- [ ] **Configuration `.env` :** Créer un fichier `.env.example` incluant :
    - `GEMINI_API_KEY`
    - `OCR_BINARY_PATH`
    - `PDFINFO_BINARY_PATH`
    - `ARCHIVESAFE_DISK`

## 🛠️ Priorité Basse (Optimisation)

- [ ] **Validation Sémantique :** Implémenter un DTO pour les réponses de l'IA afin d'éviter les erreurs de cast JSON.
- [ ] **Logs d'Audit :** Intégrer l'appel au `AuditLogService` dans les méthodes `destroy` et `update` du `DocumentController`.
- [ ] **Frontend :** Préparer l'interface de connexion et le dashboard de gestion documentaire.
