import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import fr from "./locales/fr.json";
import en from "./locales/en.json";
import ar from "./locales/ar.json";

export const LANGUAGES = [
  { code: "fr", label: "FR", name: "Français" },
  { code: "en", label: "EN", name: "English" },
  { code: "ar", label: "عربي", name: "العربية" },
];

const STORAGE_KEY = "alpha-web-lang";
const isSupported = (code) => LANGUAGES.some((l) => l.code === code);

// Priorité : choix du visiteur, puis langue du navigateur, puis français.
function initialLanguage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (isSupported(saved)) return saved;
  } catch {
    // Stockage bloqué : on continue sans mémoriser le choix.
  }
  const browser = navigator.language?.slice(0, 2);
  return isSupported(browser) ? browser : "fr";
}

// Reporte la langue sur le document : sens de lecture, police, titre et description.
function applyToDocument() {
  const root = document.documentElement;
  root.lang = i18n.language;
  root.dir = i18n.dir(i18n.language);
  document.title = i18n.t("meta.title");
  document.querySelector('meta[name="description"]')?.setAttribute("content", i18n.t("meta.description"));
}

i18n.use(initReactI18next).init({
  resources: { fr: { translation: fr }, en: { translation: en }, ar: { translation: ar } },
  lng: initialLanguage(),
  fallbackLng: "fr",
  interpolation: { escapeValue: false },
});

applyToDocument();

i18n.on("languageChanged", (code) => {
  applyToDocument();
  try {
    localStorage.setItem(STORAGE_KEY, code);
  } catch {
    // Stockage bloqué : le choix vaut pour cette visite seulement.
  }
});

export default i18n;
