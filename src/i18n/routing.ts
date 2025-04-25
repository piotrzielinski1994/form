import { defineRouting } from 'next-intl/routing';

const routing = defineRouting({
  locales: ['en', 'de', 'nl', 'fr', 'it', 'es'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
});

export { routing };
