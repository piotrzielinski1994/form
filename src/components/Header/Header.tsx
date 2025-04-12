import { Container, Theme } from '@chakra-ui/react';
import { ColorModeButton } from '../chakra-ui/color-mode';
import LocaleSwitcher from './LocaleSwitcher';
import { VehicleTypeSwitcher } from './VehicleTypeSwitcher';

const Header = () => {
  return (
    <Theme appearance="dark">
      <header className="sticky top-0 z-20 ">
        <Container maxW="3xl" className="h-12 flex gap-4 items-center justify-end">
          <VehicleTypeSwitcher />
          <LocaleSwitcher />
          <ColorModeButton />
        </Container>
      </header>
    </Theme>
  );
};

export { Header };
