import 'server-only'

const locales: Record<string, () => Promise<Object>> = {
  en: () => import('./locales/en.json').then((module) => module.default),
  nl: () => import('./locales/fr.json').then((module) => module.default),
}

export const getLocale = async (locale: string) => locales[locale]()
