'use client';

import { Field, Input, NumberInput } from '@chakra-ui/react';
import { ChangeEvent, ComponentProps, forwardRef } from 'react';

type NumericInputProps = ComponentProps<typeof Input> & {
  label: string;
  error?: string;
};

const NumericInput = forwardRef<HTMLInputElement, NumericInputProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <Field.Root required={props.required} invalid={!!error}>
        <Field.Label>
          {label}
          {props.required && <Field.RequiredIndicator />}
        </Field.Label>
        <NumberInput.Root
          className="w-full"
          onValueChange={({ valueAsNumber }) => {
            const value = valueAsNumber as unknown as ChangeEvent<HTMLInputElement>;
            props.onChange?.(value);
          }}
        >
          <NumberInput.Control />
          <NumberInput.Input {...props} ref={ref} />
        </NumberInput.Root>
        <Field.ErrorText>{error}</Field.ErrorText>
      </Field.Root>
    );
  }
);

NumericInput.displayName = 'NumericInput';

export { NumericInput };
