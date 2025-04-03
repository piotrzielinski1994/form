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
