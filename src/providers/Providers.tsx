'use client';

import { ColorModeProvider } from '@/components/chakra-ui/color-mode';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { VehicleConfigProvider } from './VehicleConfigProvider';

const queryClient = new QueryClient();

const Providers = (props: { children: React.ReactNode }) => {
  return (
    <ChakraProvider value={defaultSystem}>
      <ColorModeProvider>
        <QueryClientProvider client={queryClient}>
          <VehicleConfigProvider>{props.children}</VehicleConfigProvider>
        </QueryClientProvider>
      </ColorModeProvider>
    </ChakraProvider>
  );
};

export { Providers };
