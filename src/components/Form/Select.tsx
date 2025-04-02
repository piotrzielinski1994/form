'use client';

import { Field, NativeSelect } from '@chakra-ui/react';
import { ComponentProps, forwardRef } from 'react';

type SelectProps = ComponentProps<typeof NativeSelect.Field> & {
  options: Array<{
    value: string;
    label: string;
  }>;
  label: string;
  error?: string;
};

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, label, error, ...props }, ref) => {
    return (
      <Field.Root invalid={!!error}>
        <Field.Label>{label}</Field.Label>
        <NativeSelect.Root>
          <NativeSelect.Field {...props} ref={ref}>
            <option value="" hidden>
              -
            </option>
            {options.map((option) => {
              return (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              );
            })}
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
        <Field.ErrorText>{error}</Field.ErrorText>
      </Field.Root>
    );
  }
);

Select.displayName = 'Select';

export { Select };
