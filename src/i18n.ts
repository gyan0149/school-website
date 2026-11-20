import { createContext, useContext } from "react";

export type Lang = "en" | "hi";

export interface LangState {
  lang: Lang;
  setLang: (l: Lang) => void;
}

export const LangContext = createContext<LangState>({ lang: "en", setLang: () => {} });

export const LANG_KEY = "site-lang";

// Picks the English or Hindi text for the current language.
export function useLang() {
  const { lang, setLang } = useContext(LangContext);
  const t = (en: string, hi: string) => (lang === "hi" ? hi : en);
  return { lang, setLang, t };
}

// Text kept in both languages.
export interface Bi {
  en: string;
  hi: string;
}
