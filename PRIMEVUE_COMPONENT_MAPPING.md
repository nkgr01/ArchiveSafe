# Mapping des Composants PrimeVue - ArchiveSafe

Ce document définit quel composant PrimeVue est utilisé pour chaque fonctionnalité métier.

## 🏠 Navigation & Layout
| Fonctionnalité | Composant PrimeVue | Usage / Justification |
| :--- | :--- | :--- |
| Barre de Navigation Latérale | `PanelMenu` | Hiérarchie claire des modules (Documents, IA, Admin). |
| Barre Supérieure | `Menubar` | Recherche globale, notifications, profil utilisateur. |
| Fil d'Ariane | `Breadcrumb` | Navigation contextuelle dans les documents. |
| Menu Contextuel | `ContextMenu` | Actions rapides sur un document (Rename, Move, Delete). |
| Menu d'Actions Rapides | `SpeedDial` | Actions flottantes dans la vue document (Tag, Share, Download). |

## 📁 Gestion Documentaire
| Fonctionnalité | Composant PrimeVue | Usage / Justification |
| :--- | :--- | :--- |
| Liste des Documents | `DataTable` | Tri, filtrage, pagination, sélection multiple. |
| Navigation Dossiers | `Tree` | Exploration hiérarchique des archives. |
| Vue Tableur | `TreeTable` | Combinaison de hiérarchie et de colonnes de métadonnées. |
| Détails Document | `Drawer` | Panneau latéral coulissant pour les métadonnées sans quitter la liste. |
| Confirmation Action | `ConfirmDialog` | Sécurisation des suppressions définitives. |
| Dialogue de Filtres | `Dialog` | Paramétrage avancé des filtres de recherche. |

## 📤 Ingestion & OCR
| Fonctionnalité | Composant PrimeVue | Usage / Justification |
| :--- | :--- | :--- |
| Zone d'Upload | `FileUpload` | Drag & Drop, upload multiple, progression visuelle. |
| Flux de Traitement | `Stepper` | Étapes : Upload $ightarrow$ OCR $ightarrow$ Indexation $ightarrow$ Validé. |
| Suivi de Progression | `ProgressBar` | Pourcentage d'avancement de l'OCR. |
| Attente de Traitement | `ProgressSpinner` | Indicateur de chargement pour les requêtes IA. |
| États de Chargement | `Skeleton` | Remplissage visuel pendant le chargement des documents. |

## 🤖 Module Intelligence Artificielle
| Fonctionnalité | Composant PrimeVue | Usage / Justification |
| :--- | :--- | :--- |
| Résumé IA | `Card` / `Panel` | Présentation élégante du texte résumé. |
| Chat IA | `ScrollPanel` | Fenêtre de conversation avec défilement fluide. |
| Suggestions de Tags | `Chips` | Tags cliquables et supprimables. |
| Extraction d'Entités | `Timeline` | Historique des versions et modifications IA. |
| Analyse Comparée | `Splitter` | Comparaison côte à côte (Document original vs Analyse IA). |

## 🛡️ Administration & Système
| Fonctionnalité | Composant PrimeVue | Usage / Justification |
| :--- | :--- | :--- |
| Logs d'Audit | `DataTable` | Table haute densité avec filtres temporels. |
| Gestion Utilisateurs | `DataTable` + `Dialog` | Liste et édition des rôles. |
| Paramètres Système | `TabView` | Séparation des onglets (Général, API, OCR, Sécurité). |
| Alertes Système | `Toast` | Notifications push en temps réel. |
| Profil Utilisateur | `Avatar` | Représentation visuelle de l'utilisateur. |
| Statistiques Dashboard | `Chart` | Volume de documents, taux d'erreur OCR. |

## ⚙️ Divers
| Fonctionnalité | Composant PrimeVue | Usage / Justification |
| :--- | :--- | :--- |
| Boîtes de Dialogue | `DynamicDialog` | Appels de composants modaux dynamiques. |
| Tooltips | `Tooltip` | Aide contextuelle sur les icônes. |
| Organisation Info | `Accordion` | Sections repliables pour les paramètres. |
| Groupement Info | `Panel` | Sectionnement visuel du contenu. |
