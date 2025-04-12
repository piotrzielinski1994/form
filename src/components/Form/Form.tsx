import clsx from 'clsx';
import { FormHTMLAttributes, forwardRef, useCallback, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

type FormProps = FormHTMLAttributes<HTMLFormElement> & {
  storageKey?: string;
};

const Form = forwardRef<HTMLFormElement, FormProps>(({ storageKey, className, ...props }, ref) => {
  useFormStorage(storageKey);
  return <form className={clsx('grid gap-10', className)} {...props} ref={ref} />;
});

const useFormStorage = (storageKey: FormProps['storageKey']) => {
  const { control, formState, reset } = useFormContext();
  const values = useWatch({ control });

  const initFromStorage = useCallback(() => {
    if (!storageKey) return;
    const storedValues = window.sessionStorage.getItem(storageKey);
    if (!storedValues) return;
    const parsedValues = JSON.parse(storedValues);
    setTimeout(() => reset(parsedValues), 0); // Make sure the `useWatch` is subscribed before reset
  }, [storageKey, reset]);

  const updateStorageOnChange = useCallback(() => {
    if (!storageKey) return;
    if (!formState.isDirty) return;
    window.sessionStorage.setItem(storageKey, JSON.stringify(values));
  }, [storageKey, values, formState]);

  useEffect(initFromStorage, [initFromStorage]);
  useEffect(updateStorageOnChange, [updateStorageOnChange]);
};

Form.displayName = 'Form';

export { Form };
