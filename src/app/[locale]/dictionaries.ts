const dictionaries: Record<string, () => Promise<any>> = {
  ja: () => import('../../dictionaries/ja.json').then((module) => module.default),
  en: () => import('../../dictionaries/en.json').then((module) => module.default),
}

export const getDictionary = async (locale: string) => {
  return dictionaries[locale] ? dictionaries[locale]() : dictionaries['ja']()
}
