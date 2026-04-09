import en from '@/messages/en.json';
import pt from '@/messages/pt.json';

export const dictionaries = {
  en,
  pt,
};

export type Locale = keyof typeof dictionaries;

export type Dictionary = typeof en;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.en;
}
