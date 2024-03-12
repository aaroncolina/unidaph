import { forwardRef, useEffect, useImperativeHandle, useRef, InputHTMLAttributes } from 'react';
import cx from 'classnames';

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  isFocused?: boolean;
  viewMode?: boolean;
}

export default forwardRef(function TextInput(
  { type = 'text', className = '', isFocused = false, viewMode = false, ...props }: TextInputProps,
  ref
) {
  const localRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => localRef.current?.focus()
  }));

  useEffect(() => {
    if (isFocused) {
      localRef.current?.focus();
    }
  }, []);

  return (
    <input
      {...props}
      type={type}
      disabled={viewMode || props.disabled}
      className={cx(className, 'h-[40px] text-gray-900 w-full rounded-lg ', {
        'border-0 bg-transparent px-0': viewMode,
        'border border-gray-300 bg-gray-50 focus:ring-primary-500 focus:border-primary-500  disabled:bg-gray-100':
          !viewMode
      })}
      ref={localRef}
    />
  );
});
