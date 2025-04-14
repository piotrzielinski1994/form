import { Container, Theme } from '@chakra-ui/react';
import { ColorModeButton } from '../ChakraUi/ColorMode';
import LocaleSwitcher from './LocaleSwitcher';
import { UserTypeSwitcher } from './UserTypeSwitcher';
import { VehicleTypeSwitcher } from './VehicleTypeSwitcher';

const Header = () => {
  return (
    <Theme as="header" appearance="dark" className="sticky top-0 z-20">
      <Container maxW="4xl" className="h-12 flex gap-4 items-center justify-end">
        <UserTypeSwitcher />
        <VehicleTypeSwitcher />
        <LocaleSwitcher />
        <ColorModeButton />
      </Container>
    </Theme>
  );
};

export { Header };
