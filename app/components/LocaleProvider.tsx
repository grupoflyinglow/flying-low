"use client";

import { createContext, useContext } from "react";
import { messages, type Locale, type Messages } from "../i18n";

type LocaleContextValue = {
  locale: Locale;
  t: Messages;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);
export function LocaleProvider({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: Locale;
}) {
  return (
    <LocaleContext.Provider value={{ locale, t: messages[locale] }}>
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
