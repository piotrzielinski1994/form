'use client';

import { ColorModeProvider } from '@/components/chakra-ui/color-mode';
import { Toaster } from '@/components/chakra-ui/toaster';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { VehicleConfig, VehicleConfigProvider } from './VehicleConfigProvider';

const queryClient = new QueryClient();
const vehicleConfig: VehicleConfig = {
  culture: 'de-DE',
  userType: 'P',
  vehicleType: 'C',
};

const Providers = (props: { children: React.ReactNode }) => {
  return (
    <ChakraProvider value={defaultSystem}>
      <ColorModeProvider>
        <QueryClientProvider client={queryClient}>
          <VehicleConfigProvider config={vehicleConfig}>
            {props.children}
            <Toaster />
          </VehicleConfigProvider>
        </QueryClientProvider>
      </ColorModeProvider>
    </ChakraProvider>
  );
};

export { Providers };
