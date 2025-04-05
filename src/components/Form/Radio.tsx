import { Field, RadioGroup } from '@chakra-ui/react';
import clsx from 'clsx';
import { ComponentProps, forwardRef } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';

type RadioProps = ComponentProps<typeof RadioGroup.Root> & {
  options: Array<{
    value: string;
    label: string;
  }>;
  label: string;
  error?: string;
};

type RadioContainerProps<T extends FieldValues> = {
  control: Control<T>;
  label: string;
  name: Path<T>;
  options: Array<{
    value: string;
    label: string;
  }>;
};

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ options, label, error, className, ...props }, ref) => {
    return (
      <Field.Root invalid={!!error} disabled={props.disabled}>
        <Field.Label>{label}</Field.Label>
        <RadioGroup.Root
          className={clsx(
            'w-full grid grid-cols-[repeat(auto-fit,minmax(min(10ch,100%),1fr))] gap-2',
            className
          )}
          {...props}
          ref={ref}
        >
          {options.map((option) => {
            return (
              <RadioGroup.Item key={option.value} value={option.value}>
                <RadioGroup.ItemHiddenInput suppressHydrationWarning />
                <RadioGroup.ItemIndicator />
                <RadioGroup.ItemText>{option.label}</RadioGroup.ItemText>
              </RadioGroup.Item>
            );
          })}
        </RadioGroup.Root>
        <Field.ErrorText>{error}</Field.ErrorText>
      </Field.Root>
    );
  }
);

const RadioContainer = <T extends FieldValues>({
  control,
  label,
  name,
  options,
}: RadioContainerProps<T>) => {
  const { field, fieldState } = useController({ control, name });
  return <Radio label={label} options={options} error={fieldState.error?.message} {...field} />;
};

Radio.displayName = 'Radio';

export { Radio, RadioContainer };
