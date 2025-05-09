import { ColorModeProvider } from '@/components/ChakraUi/ColorMode';
import en from '@/messages/en.json';
import { VehicleConfigProvider } from '@/providers/VehicleConfigProvider';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@testing-library/jest-dom';
import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';
import { expect, vi } from 'vitest';
import * as matchers from 'vitest-axe/matchers';

expect.extend(matchers);

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

vi.mock('next/navigation', () => ({
  useRouter: vi.fn().mockReturnValue({}),
  redirect: vi.fn(),
  permanentRedirect: vi.fn(),
  usePathname: vi.fn(),
  useParams: vi.fn(),
}));

const resolveServerComponent = async <T extends (props: unknown) => Promise<ReactNode>>(
  Component: T,
  props: Parameters<T>[0]
) => {
  const ComponentResolved = await Component(props);
  return () => ComponentResolved;
};

const withProviders = (children: ReactNode) => {
  const queryClient = new QueryClient();
  return (
    <NextIntlClientProvider locale="en" messages={en}>
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

export { resolveServerComponent, withProviders };
