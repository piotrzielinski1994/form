import { Checkbox as ChakraCheckbox } from '@chakra-ui/react';
import { ComponentProps, forwardRef } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';

type CheckboxProps = ComponentProps<typeof ChakraCheckbox.HiddenInput> & {
  label: string;
  error?: string;
};

type CheckboxContainerProps<T extends FieldValues> = {
  control: Control<T>;
  label: string;
  name: Path<T>;
};

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ label, error, ...props }, ref) => {
  return (
    <ChakraCheckbox.Root invalid={!!error}>
      <ChakraCheckbox.HiddenInput suppressHydrationWarning {...props} ref={ref} />
      <ChakraCheckbox.Control />
      <ChakraCheckbox.Label>{label}</ChakraCheckbox.Label>
    </ChakraCheckbox.Root>
  );
});

const CheckboxContainer = <T extends FieldValues>({
  control,
  label,
  name,
}: CheckboxContainerProps<T>) => {
  const { field, fieldState } = useController({ control, name });
  return <Checkbox label={label} error={fieldState.error?.message} {...field} />;
};

Checkbox.displayName = 'Checkbox';

export { Checkbox, CheckboxContainer };
