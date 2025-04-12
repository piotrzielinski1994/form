import LocaleSwitcher from '@/components/LocaleSwitcher';
import { routing } from '@/i18n/routing';
import { Providers } from '@/providers/Providers';
import { hasLocale, Locale, NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { PropsWithChildren } from 'react';
import './global.css';

type LayoutProps = PropsWithChildren & {
  params: Promise<{ locale: Locale }>;
};

const LocaleLayout = async ({ children, params }: LayoutProps) => {
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
};

export default LocaleLayout;
