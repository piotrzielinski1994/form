import LocaleSwitcher from '@/components/LocaleSwitcher';
import { Provider } from '@/components/Provider';
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
      <body className="p-10 grid justify-center">
        <NextIntlClientProvider>
          <Provider>
            <main className="max-w-2xl mx-auto grid gap-10">
              <LocaleSwitcher />
              {children}
            </main>
          </Provider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
