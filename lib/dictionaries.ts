import 'server-only';
import type { Dictionary } from './types';

const dictionaries = {
  en: () => import('../dictionaries/en.json').then((module) => module.default as Dictionary),
  id: () => import('../dictionaries/id.json').then((module) => module.default as Dictionary),
};

export const getDictionary = async (locale: 'en' | 'id'): Promise<Dictionary> => {
  return dictionaries[locale]();
};
