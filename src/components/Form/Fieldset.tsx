import { Fieldset as ChakraFieldset } from '@chakra-ui/react';
import clsx from 'clsx';
import { ComponentProps, forwardRef } from 'react';

type FieldsetProps = ComponentProps<typeof ChakraFieldset.Root> & {
  legend: string;
};

const Fieldset = forwardRef<HTMLFieldSetElement, FieldsetProps>(
  ({ legend, children, className, ...props }, ref) => {
    return (
      <ChakraFieldset.Root
        className={clsx('p4 border-1 border-gray-500 rounded-md', className)}
        {...props}
        ref={ref}
      >
        <ChakraFieldset.Legend>{legend}</ChakraFieldset.Legend>
        <ChakraFieldset.Content>{children}</ChakraFieldset.Content>
      </ChakraFieldset.Root>
    );
  }
);

Fieldset.displayName = 'Fieldset';

export { Fieldset };
