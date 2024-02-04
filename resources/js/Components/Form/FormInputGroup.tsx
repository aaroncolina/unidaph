import { HTMLAttributes } from 'react';
import cx from 'classnames';

export interface FormInputGroupProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  required?: boolean;
  error?: string;
}

export function FormInputGroup({
  label,
  required,
  className,
  children,
  error,
  ...otherProps
}: FormInputGroupProps) {
  return (
    <div {...otherProps} className={cx(className, 'w-full flex flex-col gap-y-1.5')}>
      {label && (
        <span className="text-sm font-bold flex flex-row gap-x-2">
          <label className="text-gray-900">{label}</label>
          {required && <span className="text-red-500">*</span>}
        </span>
      )}
      {children}
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
}
