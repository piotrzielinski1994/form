import { Fieldset as ChakraFieldset, Stack } from '@chakra-ui/react';
import clsx from 'clsx';
import { ComponentProps, forwardRef } from 'react';

type FieldsetProps = ComponentProps<typeof ChakraFieldset.Root> & {
  legend: string;
};

const Fieldset = forwardRef<HTMLFieldSetElement, FieldsetProps>(
  ({ legend, children, className, ...props }, ref) => {
    return (
      <ChakraFieldset.Root
        className={clsx('p-10 border-1 border-gray-500 rounded-md', className)}
        {...props}
        ref={ref}
      >
        <Stack>
          <ChakraFieldset.Legend>{legend}</ChakraFieldset.Legend>
        </Stack>
        <ChakraFieldset.Content>{children}</ChakraFieldset.Content>
      </ChakraFieldset.Root>
    );
  }
);

Fieldset.displayName = 'Fieldset';

export { Fieldset };
