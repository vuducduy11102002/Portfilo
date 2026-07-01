"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { dictionary, type Dictionary } from "@/lib/i18n/dictionary";
import {
  DEFAULT_LOCALE,
  LANG_STORAGE_KEY,
  type Locale,
} from "@/lib/i18n/types";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  toggle: () => void;
  /** Từ điển UI của locale hiện tại. */
  t: Dictionary;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // SSR + first render dùng DEFAULT_LOCALE để khớp hydration; đọc localStorage sau khi mount.
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LANG_STORAGE_KEY) as Locale | null;
      if (saved === "vi" || saved === "en") setLocaleState(saved);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = useCallback(
    () => setLocale(locale === "vi" ? "en" : "vi"),
    [locale, setLocale],
  );

  return (
    <LanguageContext.Provider
      value={{ locale, setLocale, toggle, t: dictionary[locale] }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useI18n phải dùng trong <LanguageProvider>");
  return ctx;
}
