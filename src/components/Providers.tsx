'use client';

import { Toaster } from '@/chakra-ui/toaster';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { VehicleConfig, VehicleConfigProvider } from './VehicleConfigProvider';

const queryClient = new QueryClient();
const vehicleConfig: VehicleConfig = {
  culture: 'de-DE',
  userType: 'D',
  vehicleType: 'C',
};

const Providers = (props: { children: React.ReactNode }) => {
  return (
    <ChakraProvider value={defaultSystem}>
      {/* <ThemeProvider attribute="class" disableTransitionOnChange> */}
      <QueryClientProvider client={queryClient}>
        <VehicleConfigProvider config={vehicleConfig}>
          {props.children}
          <Toaster />
        </VehicleConfigProvider>
      </QueryClientProvider>
      {/* </ThemeProvider> */}
    </ChakraProvider>
  );
};

export { Providers };
