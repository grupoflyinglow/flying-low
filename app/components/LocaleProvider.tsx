"use client";

import { createContext, useContext, useEffect, useSyncExternalStore } from "react";
import {
  DEFAULT_LOCALE,
  isLocale,
  LOCALE_STORAGE_KEY,
  messages,
  type Locale,
  type Messages,
} from "../i18n";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Messages;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);
const LOCALE_CHANGE_EVENT = "flying-low-locale-change";
let memoryLocale: Locale = DEFAULT_LOCALE;

function getLocaleSnapshot(): Locale {
  try {
    const savedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    if (isLocale(savedLocale)) memoryLocale = savedLocale;
  } catch {
    // Fall back to the in-memory preference in privacy-restricted contexts.
  }

  return memoryLocale;
}

function subscribeToLocale(callback: () => void) {
  const handleStorage = (event: StorageEvent) => {
    if (event.key === LOCALE_STORAGE_KEY) callback();
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener(LOCALE_CHANGE_EVENT, callback);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(LOCALE_CHANGE_EVENT, callback);
  };
}

function updateDocumentLanguage(locale: Locale) {
  const copy = messages[locale];
  document.documentElement.lang = locale;
  document.title = copy.meta.title;

  const metadataUpdates = [
    ['meta[name="description"]', copy.meta.description],
    ['meta[property="og:title"]', copy.meta.title],
    ['meta[property="og:description"]', copy.meta.description],
    ['meta[property="og:locale"]', copy.meta.openGraphLocale],
    ['meta[name="twitter:title"]', copy.meta.title],
    ['meta[name="twitter:description"]', copy.meta.description],
  ] as const;

  for (const [selector, content] of metadataUpdates) {
    const meta = document.querySelector<HTMLMetaElement>(selector);
    if (meta) meta.content = content;
  }
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore(
    subscribeToLocale,
    getLocaleSnapshot,
    () => DEFAULT_LOCALE,
  );

  useEffect(() => updateDocumentLanguage(locale), [locale]);

  const setLocale = (nextLocale: Locale) => {
    memoryLocale = nextLocale;

    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, nextLocale);
    } catch {
      // The current page still changes language when persistence is unavailable.
    }

    window.dispatchEvent(new Event(LOCALE_CHANGE_EVENT));
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t: messages[locale] }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error("useLocale must be used within LocaleProvider");
  }

  return context;
}
