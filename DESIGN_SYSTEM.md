# Design System - ArchiveSafe (Enterprise Edition)

L'identité visuelle d'ArchiveSafe repose sur la sobriété, le professionnalisme et l'efficacité.

## 🎨 Palette de Couleurs (SaaS Enterprise)
- **Primaire (Brand) :** Bleu Cobalt / Indigo profond (Inspiré des outils SaaS modernes).
    - *Main :* `#1E40AF`
    - *Hover :* `#1D4ED8`
    - *Active :* `#1E3A8A`
- **Secondaire (Neutres) :**
    - *Surface 50 :* `#F9FAFB` (Fonds de page)
    - *Surface 100 :* `#F3F4F6` (Bordures, inputs)
    - *Surface 200 :* `#E5E7EB` (Séparateurs)
    - *Surface 900 :* `#111827` (Texte principal, Sidebar sombre)
- **Accents (Sémantiques) :**
    - *Succès :* `#10B981` (OCR terminé, Document validé)
    - *Alerte :* `#F59E0B` (Traitement en cours, Attention)
    - *Erreur :* `#EF4444` (Échec OCR, Accès refusé)
    - *IA / Magic :* Dégradé Indigo $ightarrow$ Violet (Pour tout ce qui touche à Gemini)

## 🖋️ Typographie
- **Police Principale :** 'Inter' (Google Fonts) - Standard SaaS pour sa lisibilité maximale.
- **Hiérarchie :**
    - `h1` : Semi-Bold, 24px, Surface 900.
    - `h2` : Medium, 20px, Surface 900.
    - `body` : Regular, 14px, Surface 700.
    - `caption` : Regular, 12px, Surface 500.

## 📐 Grille & Espacements
- **Système de Grille :** Flexbox et CSS Grid via Tailwind CSS.
- **Espacements (Scale 4px) :**
    - `xs` : 4px | `sm` : 8px | `md` : 16px | `lg` : 24px | `xl` : 32px.
- **Bordures :** Radius `rounded-lg` (8px) pour tous les composants PrimeVue.

## 🌓 Modes d'Affichage
- **Mode Clair :** Fond très clair, texte sombre, ombres subtiles pour la profondeur.
- **Mode Sombre :** Fond Surface 900, texte Surface 100, contraste élevé pour réduire la fatigue visuelle.
- **Transition :** Animation fluide de 0.3s via CSS transitions.

## 🎬 Animations & UX
- **Micro-interactions :** Hover states sur les boutons et cartes.
- **Transitions de Page :** Fondus discrets (Cross-fade).
- **Feedback Visuel :** Skeletons pendant le chargement des données, Toasts pour les confirmations d'action.
- **Saisie :** Validation en temps réel avec indicateurs de couleur.

## ♿ Accessibilité (a11y)
- Respect des normes WCAG 2.1.
- Contrastes élevés pour le mode clair et sombre.
- Support complet du clavier pour la navigation.
- Labels ARIA sur tous les composants PrimeVue.
