# Windows Setup & Dependency Checklist

## Objectif
Ce guide liste les dépendances système requises pour faire fonctionner `ArchiveSafe` sur Windows, avec les commandes d'installation et de validation.

## 1. Prérequis système
- Windows 10 / 11
- Laragon installé ou PHP 8.2 disponible dans le PATH
- MySQL 8 / MariaDB accessible
- Node.js 18+ et npm
- Composer

## 2. PHP & Laravel
1. Vérifier la version de PHP :
   ```powershell
   php -v
   ```
2. Vérifier les extensions PHP essentielles :
   ```powershell
   php -m | Select-String "pdo_mysql|mbstring|openssl|tokenizer|xml|ctype|json|fileinfo"
   ```
3. Installer les dépendances PHP :
   ```powershell
   composer install
   ```

## 3. Base de données MySQL
1. Démarrer MySQL depuis Laragon ou le service Windows.
2. Créer la base :
   ```sql
   CREATE DATABASE archivesafe CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```
3. Valider la connexion :
   ```powershell
   php artisan migrate:status
   ```

## 4. Redis
1. Installer Redis pour Windows si nécessaire :
   ```powershell
   choco install redis-64 -y
   ```
2. Démarrer Redis :
   ```powershell
   redis-server
   ```
3. Vérifier la connexion :
   ```powershell
   redis-cli ping
   ```
   Réponse attendue : `PONG`

## 5. OCR & PDF
### 5.1 Tesseract
1. Installer Tesseract :
   ```powershell
   choco install tesseract -y
   ```
2. Vérifier :
   ```powershell
   tesseract --version
   ```

### 5.2 Poppler / pdfinfo / pdftoppm
1. Installer Poppler :
   ```powershell
   choco install poppler -y
   ```
2. Vérifier :
   ```powershell
   pdfinfo --version
   pdftoppm --version
   ```

### 5.3 Ghostscript
1. Installer Ghostscript :
   ```powershell
   choco install ghostscript -y
   ```

### 5.4 Python et ocrmypdf
1. Installer Python :
   ```powershell
   choco install python -y
   ```
2. Mettre à jour pip et installer `ocrmypdf` :
   ```powershell
   python -m pip install --upgrade pip setuptools wheel
   python -m pip install ocrmypdf
   ```
3. Vérifier :
   ```powershell
   ocrmypdf --version
   ```

## 6. Configuration `.env`
Assurez-vous que les valeurs suivantes sont présentes dans `.env` :
- `DB_CONNECTION=mysql`
- `DB_HOST=127.0.0.1`
- `DB_PORT=3306`
- `DB_DATABASE=archivesafe`
- `DB_USERNAME=root`
- `DB_PASSWORD=`
- `QUEUE_CONNECTION=redis`
- `REDIS_HOST=127.0.0.1`
- `REDIS_PORT=6379`
- `GEMINI_API_KEY=` (si vous utilisez Gemini)
- `OCR_BINARY_PATH=ocrmypdf`
- `PDFINFO_BINARY_PATH=pdfinfo`
- `CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:8000`

## 7. Validation rapide
1. Démarrer les migrations et vérifier le schéma :
   ```powershell
   php artisan migrate
   ```
2. Lancer le serveur Laravel :
   ```powershell
   php artisan serve --host=127.0.0.1 --port=8000
   ```
3. Lancer le frontend :
   ```powershell
   cd frontend
   npm install
   npm run dev
   ```
4. Vérifier que `sanctum/csrf-cookie` et `api/login` répondent correctement.

## 8. Notes importantes
- `ocrmypdf` dépend de Ghostscript, Tesseract et Poppler.
- Si `ocrmypdf` échoue, vérifiez que tous les binaires sont accessibles via le PATH Windows.
- Sur Windows, le sous-système WSL est une alternative plus stable pour l'installation d'outils Linux natifs.
