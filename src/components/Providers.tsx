'use client';

import { Toaster } from '@/chakra-ui/toaster';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const Providers = (props: { children: React.ReactNode }) => {
  return (
    <ChakraProvider value={defaultSystem}>
      {/* <ThemeProvider attribute="class" disableTransitionOnChange> */}
      <QueryClientProvider client={queryClient}>
        {props.children}
        <Toaster />
      </QueryClientProvider>
      {/* </ThemeProvider> */}
    </ChakraProvider>
  );
};

export { Providers };
