import { forwardRef, useImperativeHandle, useRef, InputHTMLAttributes } from 'react';
import cx from 'classnames';

export interface ToggleProps extends InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
  label?: string;
  labelClassName?: string;
}

export default forwardRef(function Toggle(
  {
    type = 'checkbox',
    className,
    containerClassName,
    label,
    labelClassName,
    ...props
  }: ToggleProps,
  ref
) {
  const localRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => localRef.current?.focus()
  }));

  return (
    <label
      className={cx(containerClassName, 'relative inline-flex items-center mb-5 cursor-pointer')}
    >
      <input {...props} type={type} className={cx(className, 'sr-only peer')} ref={localRef} />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
      {label && (
        <span
          className={cx(
            labelClassName,
            'ms-3 text-sm font-medium text-gray-900 dark:text-gray-300'
          )}
        >
          {label}
        </span>
      )}
    </label>
  );
});
