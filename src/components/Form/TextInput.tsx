'use client';

import { forwardRef, InputHTMLAttributes } from 'react';

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <div className="grid">
        <label htmlFor={props.id}>{label}</label>
        <input ref={ref} {...props} />
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>
    );
  }
);

TextInput.displayName = 'TextInput';

export { TextInput };
