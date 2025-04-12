import { Container } from '@chakra-ui/react';
import LocaleSwitcher from './LocaleSwitcher';
import { VehicleTypeSwitcher } from './VehicleTypeSwitcher';

const Header = () => {
  return (
    <header className="bg-black sticky top-0 z-20">
      {/* <header> */}
      <Container maxW="3xl" className="h-12 flex gap-10 items-center">
        <LocaleSwitcher />
        <VehicleTypeSwitcher />
      </Container>
    </header>
  );
};

export { Header };
