import { useEffect, useState, type ReactNode } from "react";
import { LANG_KEY, LangContext, type Lang } from "../i18n";

function savedLang(): Lang {
  try {
    return localStorage.getItem(LANG_KEY) === "hi" ? "hi" : "en";
  } catch {
    return "en";
  }
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(savedLang);
  useEffect(() => {
    document.documentElement.lang = lang === "hi" ? "hi" : "en";
  }, [lang]);
  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(LANG_KEY, l);
    } catch {
      // Private mode: the choice lasts until the page is closed.
    }
  };
  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}
