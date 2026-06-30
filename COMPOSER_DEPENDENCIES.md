# Dépendances Composer - ArchiveSafe

Ce document liste les packages PHP nécessaires pour faire fonctionner l'application.

## Packages Obligatoires

| Package | Usage | Version Recommandée |
| :--- | :--- | :--- |
| `laravel/framework` | Framework Core | ^11.0 / ^12.0 |
| `laravel/sanctum` | Authentification API (Tokens) | ^4.0 |
| `symfony/process` | Exécution des binaires OCR (Tesseract/PDFInfo) | ^7.0 |
| `guzzlehttp/guzzle` | Appels API vers Gemini | ^7.0 |

## Dépendances Système (Binaires)

L'application requiert l'installation des outils suivants sur le serveur :

1. **ocrmypdf** : Moteur principal d'OCR.
2. **tesseract-ocr** : Moteur de reconnaissance de caractères.
3. **ghostscript** : Pour la manipulation et conversion PDF.
4. **poppler-utils** : Pour `pdfinfo` et `pdftoppm`.
5. **redis-server** : Pour la gestion des queues de traitement.

## Commande d'installation suggérée
```bash
composer require laravel/sanctum symfony/process
php artisan sanctum:install
```
