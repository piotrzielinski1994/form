import LocaleSwitcher from '@/components/LocaleSwitcher';
import { Providers } from '@/components/Providers';
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
    <html className="h-full" lang={locale} suppressHydrationWarning>
      <body className="p-4 grid">
        <NextIntlClientProvider>
          <Providers>
            <main className="w-full max-w-[48rem] mx-auto grid gap-10">
              <LocaleSwitcher />
              {children}
            </main>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
