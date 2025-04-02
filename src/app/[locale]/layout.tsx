import LocaleSwitcher from '@/components/LocaleSwitcher';
import { routing } from '@/i18n/routing';
import { hasLocale, Locale, NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import './global.css';

type LayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
};

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return notFound();

  return (
    <html className="h-full" lang={locale}>
      <body>
        <NextIntlClientProvider>
          <LocaleSwitcher />
          <main>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
