import clsx from 'clsx';
import { FormHTMLAttributes, forwardRef, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { FormFields } from '../ComplexForm/schema';

type FormProps = FormHTMLAttributes<HTMLFormElement> & {
  storageKey?: string;
};

const Form = forwardRef<HTMLFormElement, FormProps>(({ storageKey, className, ...props }, ref) => {
  useFormStorage(storageKey);
  return <form className={clsx('grid gap-10', className)} {...props} ref={ref} />;
});

const useFormStorage = (storageKey: FormProps['storageKey']) => {
  const { setValue, control } = useFormContext();
  const values = useWatch({ control });

  useEffect(() => {
    if (!storageKey) return;
    const storedValues = window.sessionStorage.getItem(storageKey);
    if (!storedValues) return;
    const parsedValues = JSON.parse(storedValues);
    Object.entries(parsedValues).forEach(([key, value]) => {
      setValue(key as keyof FormFields, value);
    });
  }, [storageKey, setValue]);

  useEffect(() => {
    if (!storageKey) return;
    window.sessionStorage.setItem(storageKey, JSON.stringify(values));
  }, [storageKey, values]);
};

Form.displayName = 'Form';

export { Form };
