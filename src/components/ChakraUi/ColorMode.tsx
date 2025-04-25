'use client';

import type { IconButtonProps } from '@chakra-ui/react';
import { ClientOnly, IconButton, Skeleton } from '@chakra-ui/react';
import type { ThemeProviderProps } from 'next-themes';
import { ThemeProvider, useTheme } from 'next-themes';
import { forwardRef } from 'react';
import { LuMoon, LuSun } from 'react-icons/lu';
import { setCookie } from 'typescript-cookie';

type ColorMode = 'light' | 'dark';

type UseColorModeReturn = {
  colorMode: ColorMode;
  setColorMode: (colorMode: ColorMode) => void;
  toggleColorMode: () => void;
};

const ColorModeProvider = (props: ThemeProviderProps) => {
  return <ThemeProvider attribute="class" disableTransitionOnChange {...props} />;
};

const ColorModeButton = forwardRef<HTMLButtonElement, Omit<IconButtonProps, 'aria-label'>>(
  function ColorModeButton(props, ref) {
    const { toggleColorMode, colorMode } = useColorMode();
    return (
      <ClientOnly fallback={<Skeleton boxSize="8" />}>
        <IconButton
          onClick={toggleColorMode}
          variant="ghost"
          aria-label="Toggle color mode"
          size="sm"
          ref={ref}
          {...props}
          css={{ _icon: { width: '5', height: '5' } }}
        >
          {colorMode === 'dark' ? <LuMoon /> : <LuSun />}
        </IconButton>
      </ClientOnly>
    );
  }
);

const useColorMode = (): UseColorModeReturn => {
  const { resolvedTheme, setTheme } = useTheme();

  const setColorMode = (mode: ColorMode) => {
    setTheme(mode);
    setCookie('theme', mode);
  };
  const toggleColorMode = () => setColorMode(resolvedTheme === 'dark' ? 'light' : 'dark');

  return {
    colorMode: resolvedTheme as ColorMode,
    setColorMode,
    toggleColorMode,
  };
};

export {
  ColorModeButton,
  ColorModeProvider,
  useColorMode,
  type ColorMode,
  type UseColorModeReturn,
};
