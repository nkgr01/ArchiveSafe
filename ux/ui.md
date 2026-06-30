# UX/UI Blueprint - ArchiveSafe (Enterprise SaaS)

Ce document sert de maquette logique et guide d'interaction pour le développement du frontend. Il définit la structure visuelle de chaque écran et le flux de navigation.

## 🧭 1. Parcours Utilisateur Complet (User Journey)

Le flux nominal est conçu pour minimiser les frictions et maximiser la productivité.

**Flux : Connexion $ightarrow$ Upload $ightarrow$ OCR $ightarrow$ IA $ightarrow$ Recherche $ightarrow$ Admin**

1.  **Connexion :** L'utilisateur accède à `/login`, s'authentifie via Sanctum. Redirection automatique vers le Dashboard.
2.  **Ingestion :**
    - L'utilisateur se rend sur `/upload`.
    - Glisse et dépose plusieurs fichiers (PDF, JPG, PNG) dans le `FileUpload`.
    - Le système valide les types et lance l'upload.
    - **Interaction :** L'utilisateur voit une `ProgressBar` pour chaque fichier. Une fois l'upload fini, le statut passe à "Processing OCR" via un `Stepper`.
3.  **Traitement OCR :**
    - L'utilisateur peut naviguer ailleurs, mais reçoit un `Toast` de notification quand l'OCR d'un document est terminé.
    - **Interaction :** Le `Toast` contient un lien direct vers le document.
4.  **Exploration & IA :**
    - L'utilisateur ouvre le document (`/documents/:id`).
    - **Interaction :** L'écran est divisé par un `Splitter`. À gauche, le PDF original. À droite, le panneau d'IA.
    - L'utilisateur lit le résumé automatique généré par Gemini.
    - L'utilisateur pose une question dans le chat IA. Gemini répond en citant les parties du document.
    - L'utilisateur accepte les tags suggérés via des `Chips`.
L5.  **Recherche & Archivage :**
    - L'utilisateur utilise la barre de recherche globale dans le `Menubar`.
    - **Interaction :** Une liste de résultats instantanés apparaît. L'utilisateur clique sur un résultat et arrive directement sur la vue document.
    - L'utilisateur organise ses documents via l'explorateur `Tree` dans la sidebar.
6.  **Administration :**
    - L'administrateur accède à `/admin/audit` pour vérifier qui a accédé à quel document.
    - Il utilise la `DataTable` avec filtres avancés pour isoler un utilisateur spécifique.

---

## 🖼️ 2. Maquettes Logiques des Écrans

### 🔐 A. Écran de Connexion (`/login`)
- **Structure :** Centrage parfait (Flexbox). Fond neutre avec un accent de couleur sur le côté.
- **Composants PrimeVue :**
    - `Card` : Conteneur du formulaire.
    - `InputText` : Email et mot de passe.
    - `Button` : Bouton de connexion avec `loading` state.
    - `Message` : Alertes d'erreur (Ex: "Identifiants invalides").
- **Interaction :** Validation en temps réel. Transition fluide vers le Dashboard.

### 🏠 B. Dashboard Principal (`/dashboard`)
- **Structure :** Grille de widgets (CSS Grid).
- **Composants PrimeVue :**
    - `Chart` : Graphiques de volume de documents par mois.
    - `Card` : Widgets de stats (Nombre de docs, Stockage utilisé, Erreurs OCR).
    - `DataTable` : Liste simplifiée des "Documents Récents".
    - `Button` (Floating) : `SpeedDial` pour l'upload rapide.
- **Interaction :** Cliquer sur un widget de stat redirige vers la vue `/documents` filtrée.

### 📁 C. Gestion Documentaire (`/documents`)
- **Structure :** Layout 3 colonnes.
    - *Gauche :* `Tree` pour la navigation dossiers.
    - *Centre :* `DataTable` pour la liste des documents.
    - *Droite (Optionnel) :* `Drawer` pour les filtres avancés.
- **Composants PrimeVue :**
    - `DataTable` : Colonnes (Titre, Date, Tags, Statut OCR).
    - `Tag` : Couleur selon le statut (Vert: Validé, Jaune: OCR en cours, Rouge: Erreur).
    - `ContextMenu` : Clic droit sur une ligne pour Rename, Move, Delete.
    - `ConfirmDialog` : Pour la suppression.
- **Interaction :** Sélection d'une ligne $ightarrow$ Ouverture du `Drawer` de prévisualisation rapide.

### 📄 D. Vue Document & Hub IA (`/documents/:id`)
- **Structure :** `Splitter` vertical.
- **Composants PrimeVue :**
    - `ScrollPanel` (Gauche) : Viewer PDF/Image intégré.
    - `TabView` (Droite) :
        - *Onglet 1 (Infos) :* `Panel` avec métadonnées et formulaire d'édition.
        - *Onglet 2 (IA Résumé) :* `Card` avec le résumé généré.
        - *Onglet 3 (IA Chat) :* `ScrollPanel` pour le chat + `InputText` pour la question.
        - *Onglet 4 (IA Tags) :* `Chips` pour les suggestions de tags.
- **Interaction :** Le chat IA utilise un `ProgressSpinner` pendant que Gemini génère la réponse.

### 📤 E. Page d'Upload (`/upload`)
- **Structure :** Zone centrale large.
- **Composants PrimeVue la plus haute importance :**
    - `FileUpload` : Mode "Advanced" avec drag & drop et upload multiple.
    - `DataTable` : Liste des fichiers uploadés avec leur statut.
    - `ProgressBar` : Pourcentage de progression de l'upload et de l'OCR.
    - `Stepper` : Visualisation du pipeline (Upload $ightarrow$ OCR $ightarrow$ Indexation).
- **Interaction :** Une fois l'upload terminé, le bouton "Aller vers mes documents" apparaît.

### 🛡️ F. Administration (`/admin/...`)
- **Structure :** Table haute densité.
- **Composants PrimeVue :**
    - `DataTable` : Avec `filter` et `sort` activés sur toutes les colonnes.
    - `Dialog` : Pour modifier le rôle d'un utilisateur ou éditer un paramètre système.
    - `TabView` : Pour organiser les réglages (Général, API Gemini, OCR).
- **Interaction :** Modification d'un rôle $ightarrow$ `Toast` de confirmation immédiate.

---

## ⚙️ 3. Matrice d'Interactions Précises

| Action | Composant PrimeVue | Feedback Visuel | Comportement |
| :--- | :--- | :--- | :--- |
| **Upload de fichier** | `FileUpload` | `ProgressBar` + `Toast` | Asynchrone, reste sur la page. |
| **Lancement OCR** | `Stepper` | `ProgressSpinner` $ightarrow$ `Tag` Vert | Changement d'état en temps réel via polling. |
| **Question à l'IA** | `InputText` + `Button` | `ProgressSpinner` $ightarrow$ `ScrollPanel` | Streaming de la réponse Gemini. |
| **Suppression Doc** | `Button` $ightarrow$ `ConfirmDialog` | `Toast` "Document déplacé vers corbeille" | Soft-delete via API. |
| **Recherche Globale** | `Menubar` search | `OverlayPanel` (Résultats instantanés) | Redirection directe vers `/documents/:id`. |
| **Changement Thème** | `SelectButton` | Transition CSS 0.3s | Mise à jour du store `uiStore` et className body. |
| **Navigation Dossier**| `Tree` | Highlighting de la ligne active | Mise à jour de la `DataTable` centrale. |
