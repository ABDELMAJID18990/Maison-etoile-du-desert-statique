import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';


import translationFR from './locales/fr.json';
import translationEN from './locales/en.json';

const resources = {
  fr: { translation: translationFR },
  en: { translation: translationEN }
};

i18n
  // Détecte la langue du navigateur (très pratique pour les touristes !)
  .use(LanguageDetector)
  // Passe l'instance i18n à react-i18next
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fr', // Si le navigateur est en Espagnol, on affiche le Français par défaut
    interpolation: {
      escapeValue: false // React protège déjà contre les failles XSS
    }
  });

export default i18n;