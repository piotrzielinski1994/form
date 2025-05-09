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
        <Field.ErrorText role="alert">{error}</Field.ErrorText>
      </Field.Root>
    );
  }
);

const NumericInputContainer = <T extends FieldValues>(props: NumericInputContainerProps<T>) => {
  const { control, label, name } = props;
  const { field, fieldState } = useController({ control, name });
  return (
    <TextInput
      type="number"
      label={label}
      {...field}
      error={fieldState.error?.message}
      onChange={(e) => {
        const value = e.target.value;
        field.onChange(value === '' ? undefined : Number(value));
      }}
    />
  );
};

NumericInput.displayName = 'NumericInput';

export { NumericInput, NumericInputContainer };
