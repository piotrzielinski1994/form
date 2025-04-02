'use client';

import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
// import { ThemeProvider } from 'next-themes';

const Provider = (props: { children: React.ReactNode }) => {
  return (
    <ChakraProvider value={defaultSystem}>
      {/* <ThemeProvider attribute="class" disableTransitionOnChange> */}
      {props.children}
      {/* </ThemeProvider> */}
    </ChakraProvider>
  );
};

export { Provider };
