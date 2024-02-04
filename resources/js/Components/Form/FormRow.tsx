import { HTMLAttributes } from 'react';
import cx from 'classnames';

export interface FormRowProps extends HTMLAttributes<HTMLDivElement> {}

export function FormRow({ className, children, ...otherProps }: FormRowProps) {
  return (
    <div {...otherProps} className={cx(className, 'w-full flex flex-col sm:flex-row gap-3')}>
      {children}
    </div>
  );
}
