import { Checkbox as ChakraCheckbox } from '@chakra-ui/react';
import { ComponentProps, forwardRef } from 'react';

type CheckboxProps = ComponentProps<typeof ChakraCheckbox.Control> & {
  label: string;
  error?: string;
};

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ label, error, ...props }, ref) => {
  return (
    <ChakraCheckbox.Root invalid={!!error}>
      <ChakraCheckbox.HiddenInput />
      <ChakraCheckbox.Control {...props} ref={ref} />
      <ChakraCheckbox.Label>{label}</ChakraCheckbox.Label>
    </ChakraCheckbox.Root>
  );
});

Checkbox.displayName = 'Checkbox';

export { Checkbox };
