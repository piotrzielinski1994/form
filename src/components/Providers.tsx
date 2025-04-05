'use client';

import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ThemeProvider } from 'next-themes';

const queryClient = new QueryClient();

const Providers = (props: { children: React.ReactNode }) => {
  return (
    <ChakraProvider value={defaultSystem}>
      {/* <ThemeProvider attribute="class" disableTransitionOnChange> */}
      <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>
      {/* </ThemeProvider> */}
    </ChakraProvider>
  );
};

export { Providers };
