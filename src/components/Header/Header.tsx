import { Container, Theme } from '@chakra-ui/react';
import { ColorModeButton } from '../ChakraUi/ColorMode';
import LocaleSwitcher from './LocaleSwitcher';
import { UserTypeSwitcher } from './UserTypeSwitcher';
import { VehicleTypeSwitcher } from './VehicleTypeSwitcher';

const Header = () => {
  return (
    <Theme as="header" appearance="dark" className="sticky top-0 z-20">
      <Container maxW="4xl" className="p-2 flex flex-wrap flex-row-reverse">
        <div className="flex gap-x-1 justify-end items-center">
          <LocaleSwitcher />
          <ColorModeButton />
        </div>
        <div className="flex flex-wrap justify-end items-center gap-x-4 gap-y-2">
          <UserTypeSwitcher />
          <VehicleTypeSwitcher />
        </div>
      </Container>
    </Theme>
  );
};

export { Header };
