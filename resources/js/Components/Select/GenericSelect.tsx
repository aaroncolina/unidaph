import { Primitive } from '@/types';
import cx from 'classnames';
import { InputHTMLAttributes } from 'react';

export interface GenericSelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  label: React.ReactNode;
  options: Record<Primitive, Primitive>;
  selected?: Primitive;
  containerClassName?: string;
}

export default function GenericSelect({
  label,
  className,
  containerClassName,
  options,
  selected,
  ...props
}: GenericSelectProps) {
  return (
    <div
      className={cx(containerClassName, [
        'bg-white flex flex-row rounded-md items-center gap-x-2 px-3',
        'block w-fit text-sm text-gray-900 border border-gray-300',
        'rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500',
        'dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400',
        'dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
      ])}
    >
      <span className="select-none text-sm text-gray-500 w-fit">{label}</span>
      <select className={cx(className, 'text-sm w-fit pr-10 border-0 py-0 m-0')} {...props}>
        {Object.keys(options)?.map((key, index) => (
          <option key={index} value={key} selected={key === selected}>
            {options[key]}
          </option>
        ))}
      </select>
    </div>
  );
}
