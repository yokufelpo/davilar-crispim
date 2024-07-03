import { forwardRef } from 'react';

type FormInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  ref?: React.LegacyRef<HTMLInputElement>;
};

export const formInputClass = 'border border-black p-2';

const FormInput = forwardRef(function FormInput(
  { children, className, ...props }: FormInputProps,
  ref: React.Ref<HTMLInputElement>,
) {
  return (
    <input ref={ref} className={`${formInputClass} ${className}`} {...props}>
      {children}
    </input>
  );
});

export default FormInput;
