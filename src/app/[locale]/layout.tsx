import LocaleSwitcher from '@/components/LocaleSwitcher';
import { routing } from '@/i18n/routing';
import { Providers } from '@/providers/Providers';
import { Container } from '@chakra-ui/react';
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
      <body>
        <NextIntlClientProvider>
          <Providers>
            <div id="root" className="grid gap-10">
              <header className="bg-black sticky top-0 z-20 h-12">
                <Container maxW="3xl" className="grid gap-10">
                  <LocaleSwitcher />
                </Container>
              </header>
              <Container as="main" maxW="3xl" className="grid gap-10 relative">
                {children}
              </Container>
            </div>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
