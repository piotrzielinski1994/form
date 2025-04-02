import clsx from 'clsx';
import { FormHTMLAttributes, forwardRef } from 'react';

type FormProps = FormHTMLAttributes<HTMLFormElement>;

const Form = forwardRef<HTMLFormElement, FormProps>(({ children, className, ...props }, ref) => {
  return (
    <form className={clsx('grid gap-10', className)} {...props} ref={ref}>
      {children}
    </form>
  );
});

Form.displayName = 'Form';

export { Form };
