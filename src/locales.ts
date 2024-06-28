import 'server-only'
import { LocaleType } from './types'

const locales: Record<string, () => Promise<LocaleType>> = {
  en: () => import('./locales/en.json').then((module) => module.default),
  fr: () => import('./locales/fr.json').then((module) => module.default),
}

export const getLocale = async (locale: string) => locales[locale]()
