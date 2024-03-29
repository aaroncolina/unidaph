import { ButtonHTMLAttributes } from 'react';

export default function TertiaryButton({
  type = 'button',
  className = '',
  disabled,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      type={type}
      className={
        `inline-flex items-center px-4 py-2 bg-yellow-400 border border-yellow-300 rounded-md font-semibold text-xs text-gray-900 uppercase tracking-widest shadow-sm hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150 ${
          disabled && 'opacity-25'
        } ` + className
      }
      disabled={disabled}
    >
      {children}
    </button>
  );
}
