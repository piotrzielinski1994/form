'use client';

import { ColorModeProvider } from '@/components/ChakraUi/ColorMode';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Locale, NextIntlClientProvider } from 'next-intl';
import { PropsWithChildren, useEffect } from 'react';
import z from 'zod';
import { VehicleConfigProvider } from './VehicleConfigProvider';

const queryClient = new QueryClient();

type ProvidersProps = PropsWithChildren & { locale: Locale };

const Providers = ({ children, locale }: ProvidersProps) => {
  useEffect(() => {
    const zodLocaleFunction = z.locales[locale as keyof typeof z.locales] ?? z.locales.en;
    z.config(zodLocaleFunction());
  }, [locale]);

  return (
    <NextIntlClientProvider locale={locale}>
      <ChakraProvider value={defaultSystem}>
        <ColorModeProvider>
          <QueryClientProvider client={queryClient}>
            <VehicleConfigProvider>{children}</VehicleConfigProvider>
          </QueryClientProvider>
        </ColorModeProvider>
      </ChakraProvider>
    </NextIntlClientProvider>
  );
};

export { Providers };
