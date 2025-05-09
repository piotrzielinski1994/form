'use client';

import { Field, Input } from '@chakra-ui/react';
import { ComponentProps, forwardRef } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';

type TextInputProps = ComponentProps<typeof Input> & {
  label: string;
  error?: string;
};

type TextInputContainerProps<T extends FieldValues> = {
  control: Control<T>;
  label: string;
  name: Path<T>;
};

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, error, value, ...props }, ref) => {
    return (
      <Field.Root required={props.required} invalid={!!error}>
        <Field.Label>
          {label}
          {props.required && <Field.RequiredIndicator />}
        </Field.Label>
        <Input {...props} ref={ref} value={value ?? ''} />
        <Field.ErrorText role="alert">{error}</Field.ErrorText>
      </Field.Root>
    );
  }
);

const TextInputContainer = <T extends FieldValues>(props: TextInputContainerProps<T>) => {
  const { control, label, name } = props;
  const { field, fieldState } = useController({ control, name });
  return <TextInput label={label} {...field} error={fieldState.error?.message} />;
};

TextInput.displayName = 'TextInput';

export { TextInput, TextInputContainer };
