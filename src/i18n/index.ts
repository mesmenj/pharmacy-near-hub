import { createContext, useContext } from "react";

export type Language = "fr" | "en";

export const translations = {
  fr: {
    welcome: "Bienvenue",
    // ErrorBoundary Section
    errorTitle: "Une erreur s'est produite.",
  },
  en: {
    welcome: "Welcome",
    // ErrorBoundary Section
    errorTitle: "An error occurred.",
  },
};

export const LanguageContext = createContext<{
  lang: Language;
  setLang: (l: Language) => void;
}>({ lang: "fr", setLang: () => {} });

export function useTranslation() {
  const { lang } = useContext(LanguageContext);
  return translations[lang];
}
