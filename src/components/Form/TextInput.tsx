'use client';

import { Field, Input } from '@chakra-ui/react';
import { ComponentProps, forwardRef } from 'react';

type TextInputProps = ComponentProps<typeof Input> & {
  label: string;
  error?: string;
};

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <Field.Root required>
        <Field.Label>
          {label} <Field.RequiredIndicator />
        </Field.Label>
        <Input {...props} ref={ref} />
        {!!error && <Field.ErrorText>{error}</Field.ErrorText>}
      </Field.Root>
    );
  }
);

TextInput.displayName = 'TextInput';

export { TextInput };
