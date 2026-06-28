const dictionaries: Record<string, () => Promise<any>> = {
  ja: () => import('@/dictionaries/ja.json').then((module) => module.default || module),
  en: () => import('@/dictionaries/en.json').then((module) => module.default || module),
}

export const getDictionary = async (locale: string) => {
  try {
    const fn = dictionaries[locale] || dictionaries['ja'];
    return await fn();
  } catch (error) {
    console.error("Failed to load dictionary for locale:", locale, error);
    return import('@/dictionaries/ja.json').then((module) => module.default || module);
  }
}
