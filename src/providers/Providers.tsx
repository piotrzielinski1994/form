'use client';

import { ColorModeProvider } from '@/components/ChakraUi/ColorMode';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import { VehicleConfigProvider } from './VehicleConfigProvider';

const queryClient = new QueryClient();

const Providers = (props: PropsWithChildren) => {
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
