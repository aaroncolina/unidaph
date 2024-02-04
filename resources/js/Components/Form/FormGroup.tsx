import { HTMLAttributes } from 'react';
import cx from 'classnames';

export interface FormGroupProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
}

export function FormGroup({ className, children, label, ...otherProps }: FormGroupProps) {
  return (
    <div {...otherProps} className={cx(className, 'w-full flex flex-col gap-y-4')}>
      {label && <label className="text-xl font-bold text-gray-900 truncate">{label}</label>}
      {children}
    </div>
  );
}
