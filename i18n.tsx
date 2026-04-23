"use client";

import { createContext, useContext, type ReactNode } from "react";

const strings = {
  splashAnnotationStages: ["IMS", "Kashback", "Motor promocional"],
  splashAnnotationRight: "Toque para explorar",
  splashProgressMicroLoading: "Carregando a experiência",
  splashProgressMicroComplete: "Pronto para entrar",
} as const;

type StringKey = keyof typeof strings;

const I18nContext = createContext({
  t: (key: StringKey) => strings[key],
});

export function I18nProvider({ children }: { children: ReactNode }): ReactNode {
  return <I18nContext.Provider value={{ t: (key) => strings[key] }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}
