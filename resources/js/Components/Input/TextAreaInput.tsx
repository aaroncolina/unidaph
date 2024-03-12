import { forwardRef, useEffect, useImperativeHandle, useRef, TextareaHTMLAttributes } from 'react';
import cx from 'classnames';

export interface TextAreaInputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  isFocused?: boolean;
}

export default forwardRef(function TextAreaInput(
  { className = '', isFocused = false, ...props }: TextAreaInputProps,
  ref
) {
  const localRef = useRef<HTMLTextAreaElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => localRef.current?.focus()
  }));

  useEffect(() => {
    if (isFocused) {
      localRef.current?.focus();
    }
  }, []);

  return (
    <textarea
      {...props}
      className={cx(
        className,
        'text-gray-900 border border-gray-300 w-full disabled:bg-gray-100',
        'rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500'
      )}
      ref={localRef}
    />
  );
});
