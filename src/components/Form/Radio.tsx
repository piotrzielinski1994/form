import { Field, RadioGroup } from '@chakra-ui/react';
import clsx from 'clsx';
import { ComponentProps, forwardRef } from 'react';

type RadioProps = ComponentProps<typeof RadioGroup.Root> & {
  options: Array<{
    value: string;
    label: string;
  }>;
  label: string;
  error?: string;
};

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ options, label, error, className, ...props }, ref) => {
    return (
      <Field.Root invalid={!!error} disabled={props.disabled}>
        <Field.Label>{label}</Field.Label>
        <RadioGroup.Root className={clsx('flex gap-6 flex-wrap', className)} {...props} ref={ref}>
          {options.map((option) => {
            return (
              <RadioGroup.Item key={option.value} value={option.value}>
                <RadioGroup.ItemHiddenInput />
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

Radio.displayName = 'Radio';

export { Radio };
