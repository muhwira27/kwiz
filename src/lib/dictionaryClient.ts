import type { Locale } from '@/i18n.config';
import en from '@/dictionaries/en.json';
import id from '@/dictionaries/id.json';

export type Dictionary = typeof en;

export function getClientDictionary(locale: Locale): Dictionary {
  return locale === 'en' ? en : id;
}

