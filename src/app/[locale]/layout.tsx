import { ColorMode } from '@/components/ChakraUi/ColorMode';
import { Toaster } from '@/components/ChakraUi/Toaster';
import { Header } from '@/components/Header/Header';
import { routing } from '@/i18n/routing';
import { Providers } from '@/providers/Providers';
import { Container } from '@chakra-ui/react';
import clsx from 'clsx';
import { hasLocale, Locale, NextIntlClientProvider } from 'next-intl';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { PropsWithChildren } from 'react';
import './global.css';

type LayoutProps = PropsWithChildren & {
  params: Promise<{ locale: Locale }>;
};

const LocaleLayout = async ({ children, params }: LayoutProps) => {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return notFound();

  const cookieStore = await cookies();
  const theme: ColorMode = (cookieStore.get('theme')?.value as ColorMode | undefined) ?? 'light';

  return (
    <html className={clsx('h-full', theme)} lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider>
          <Providers>
            <div id="root" className="grid gap-6 sm:gap-10">
              <Header />
              <Container as="main" maxW="4xl" className="grid gap-6 sm:gap-10 relative">
                {children}
              </Container>
            </div>
            <Toaster />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
