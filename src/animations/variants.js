/* ============================================================
   TIMING CONSTANTS
   ============================================================
   Définir les durées une fois = cohérence garantie partout.
   Plus besoin de se rappeler "c'était 0.4 ou 0.5 ?"
*/
export const TIMING = {
  fast: { duration: 0.2, ease: "easeOut" },
  normal: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }, // ease-out-cubic : naturel
  slow: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  spring: { type: "spring", stiffness: 150, damping: 20 },
  springBouncy: { type: "spring", stiffness: 300, damping: 15 },
};

/* ============================================================
   PAGE TRANSITIONS
   ============================================================
   Utilisé dans PageTransition.jsx pour envelopper chaque page.
   L'entrée est un léger fadeInUp, la sortie est un fadeIn 
   rapide vers le haut.
*/
export const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: TIMING.normal,
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.25, ease: "easeIn" },
  },
};

/* ============================================================
   SCROLL REVEAL - Apparaître au défilement
   ============================================================
   Les plus utilisés. Chaque section de vos pages devrait
   utiliser un de ces variants avec whileInView="visible".
*/
export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: TIMING.normal,
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: TIMING.normal,
  },
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: TIMING.normal,
  },
};

export const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: TIMING.normal,
  },
};

/* ============================================================
   STAGGER - Animations en cascade
   ============================================================
   Pour animer une liste d'éléments un par un.
   
   COMMENT ÇA MARCHE :
   - staggerContainer va sur le PARENT (la grid, la liste)
   - staggerItem va sur chaque ENFANT
   - Framer Motion calcule automatiquement les delays
*/
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Chaque enfant attend 0.1s après le précédent
      delayChildren: 0.2,   // Attendre 0.2s avant de commencer le premier
    },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: TIMING.fast,
  },
};

/* ============================================================
   MICRO-INTERACTIONS
   ============================================================
   Pour les boutons, liens, cartes interactives.
   Utilisation : whileHover={buttonHover} whileTap={buttonTap}
*/
export const buttonHover = {
  scale: 1.03,
  y: -2,
  transition: TIMING.springBouncy,
};

export const buttonTap = {
  scale: 0.97,
  transition: { duration: 0.1 },
};

export const cardHover = {
  y: -8,
  boxShadow: "0 20px 40px -12px rgba(0,0,0,0.15)",
  transition: TIMING.spring,
};

/* ============================================================
   SPÉCIFIQUES
   ============================================================
   Animations pour des cas précis.
*/
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: TIMING.spring,
  },
};

export const popIn = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 12 },
  },
};

export const slideInFromBottom = {
  hidden: { y: "100%" },
  visible: {
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    y: "100%",
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

/* ============================================================
   VIEWPORT SETTINGS
   ============================================================
   Configurations réutilisables pour whileInView.
   
   once: true  = anime UNE SEULE FOIS (recommandé pour 95% des cas)
   margin: "-80px" = déclenche quand l'élément est à 80px du bord
                    du viewport (donc un peu avant d'être visible)
*/
export const viewportOnce = {
  once: true,
  margin: "-80px",
};

export const viewportRepeat = {
  once: false,
  margin: "-50px",
};