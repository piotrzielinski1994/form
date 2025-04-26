import clsx from 'clsx';
import { FormHTMLAttributes, forwardRef, useCallback, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

type FormProps = FormHTMLAttributes<HTMLFormElement> & {
  storageKey?: string;
};

const Form = forwardRef<HTMLFormElement, FormProps>((props, ref) => {
  const { storageKey, className, onReset, ...rest } = props;
  const clearStorage = useFormStorage(storageKey);

  return (
    <form
      className={clsx('grid gap-4 sm:gap-10', className)}
      ref={ref}
      {...rest}
      onReset={(e) => {
        onReset?.(e);
        clearStorage();
      }}
    />
  );
});

const useFormStorage = (storageKey: FormProps['storageKey']) => {
  const { control, formState, reset } = useFormContext();
  const values = useWatch({ control });

  const clearStorage = useCallback(() => {
    if (!storageKey) return;
    window.sessionStorage.removeItem(storageKey);
  }, [storageKey]);

  const initFromStorage = useCallback(() => {
    if (!storageKey) return;
    const storedValues = window.sessionStorage.getItem(storageKey);
    if (!storedValues) return;
    const parsedValues = JSON.parse(storedValues);
    // Make sure the `useWatch` is subscribed before reset
    setTimeout(() => reset(parsedValues, { keepDefaultValues: true }), 0);
  }, [storageKey, reset]);

  const updateStorageOnChange = useCallback(() => {
    if (!storageKey) return;
    if (!formState.isDirty) return;
    window.sessionStorage.setItem(storageKey, JSON.stringify(values));
  }, [storageKey, values, formState]);

  useEffect(initFromStorage, [initFromStorage]);
  useEffect(updateStorageOnChange, [updateStorageOnChange]);

  return clearStorage;
};

Form.displayName = 'Form';

export { Form };
