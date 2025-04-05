'use client';

import { Field, NumberInput } from '@chakra-ui/react';
import { ComponentProps, forwardRef } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import { TextInput } from './TextInput';

type NumericInputProps = ComponentProps<typeof NumberInput.Input> & {
  label: string;
  error?: string;
};

type NumericInputContainerProps<T extends FieldValues> = {
  control: Control<T>;
  label: string;
  name: Path<T>;
};

const NumericInput = forwardRef<HTMLInputElement, NumericInputProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <Field.Root required={props.required} invalid={!!error}>
        <Field.Label>
          {label}
          {props.required && <Field.RequiredIndicator />}
        </Field.Label>
        <NumberInput.Root className="w-full">
          <NumberInput.Control /> {/* TODO: This does not trigger onChange */}
          <NumberInput.Input {...props} ref={ref} />
        </NumberInput.Root>
        <Field.ErrorText>{error}</Field.ErrorText>
      </Field.Root>
    );
  }
);

const NumericInputContainer = <T extends FieldValues>({
  control,
  label,
  name,
}: NumericInputContainerProps<T>) => {
  const { field, fieldState } = useController({ control, name });
  return (
    <TextInput
      type="number"
      label={label}
      {...field}
      onChange={(e) => {
        const value = e.target.value;
        field.onChange(value === '' ? undefined : Number(value));
      }}
      error={fieldState.error?.message}
    />
  );
};

NumericInput.displayName = 'NumericInput';

export { NumericInput, NumericInputContainer };
