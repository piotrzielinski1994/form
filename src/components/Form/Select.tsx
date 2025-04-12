'use client';

import { Field, NativeSelect, Skeleton } from '@chakra-ui/react';
import { ComponentProps, forwardRef } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';

type SelectProps = ComponentProps<typeof NativeSelect.Field> & {
  options: Array<{
    value: string;
    label: string;
  }>;
  label: string;
  error?: string;
  disabled?: boolean;
  isLoading?: boolean;
};

type SelectContainerProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: SelectProps['label'];
  options: SelectProps['options'];
  disabled?: SelectProps['disabled'];
  isLoading?: SelectProps['isLoading'];
};

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, label, error, isLoading = false, ...props }, ref) => {
    return (
      <Field.Root invalid={!!error} disabled={props.disabled}>
        <Field.Label>{label}</Field.Label>
        {isLoading ? (
          <Skeleton height={10} width="100%" />
        ) : (
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
        )}
        <Field.ErrorText>{error}</Field.ErrorText>
      </Field.Root>
    );
  }
);

const SelectContainer = <T extends FieldValues>(props: SelectContainerProps<T>) => {
  const { control, label, name, options, disabled, isLoading } = props;
  const { field, fieldState } = useController({ control, name });
  return (
    <Select
      label={label}
      options={options}
      error={fieldState.error?.message}
      {...field}
      disabled={disabled}
      isLoading={isLoading}
    />
  );
};

Select.displayName = 'Select';

export { Select, SelectContainer };
