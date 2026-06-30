# Démarrage local - ArchiveSafe

Pré-requis : PHP 8.2, Composer, Node 18+, MySQL, Redis, ocrmypdf, pdfinfo, pdftoppm (poppler-utils), Tesseract (optionnel)

Étapes rapides :

```bash
# 1. Installer dépendances PHP
composer install

# 2. Copier le .env
cp .env.example .env
# puis ajuster les variables DB / GEMINI_API_KEY etc.

php artisan key:generate

# 3. Lancer les migrations
php artisan migrate

# 4. Installer frontend
cd frontend
npm install
npm run dev

# 5. Lancer le serveur Laravel
cd ..
php artisan serve --host=127.0.0.1 --port=8000

# 6. (Optionnel) Lancer le worker de queue
php artisan queue:work
```

Notes :
- Si `php artisan migrate` échoue, vérifiez que MySQL est démarré et que les variables DB dans `.env` sont correctes.
- Les binaires OCR (`ocrmypdf`, `pdfinfo`, `pdftoppm`) doivent être installés et accessibles dans le PATH. Le service `TesseractOCRService` loggue des warnings si absent.
- Pour les tests E2E, démarrez `npm run dev` et utilisez un navigateur pour valider les flows (login, upload, suivi OCR).