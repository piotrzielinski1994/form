import { defineRouting } from 'next-intl/routing';
import { uniq, values } from 'ramda';

const localePerCulture = {
  'de-DE': 'de',
  'de-AT': 'de',
  'es-ES': 'es',
  'fr-FR': 'fr',
  'fr-BE': 'fr',
  'fr-LU': 'fr',
  'it-IT': 'it',
  'nl-NL': 'nl',
  'nl-BE': 'nl',
  'en-US': 'en',
  'en-CA': 'ca',
  'fr-CA': 'ca',
} as const;

const routing = defineRouting({
  locales: uniq(values(localePerCulture)),
  defaultLocale: 'en',
  localePrefix: 'as-needed',
});

export { localePerCulture, routing };
