import cx from 'classnames';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';

export interface DatePickerProps extends ReactDatePickerProps {
  viewMode?: boolean;
}

export function DatePicker({
  className,
  placeholderText = 'Select a date',
  viewMode = false,
  ...props
}: DatePickerProps) {
  return (
    <ReactDatePicker
      {...props}
      disabled={viewMode || props?.disabled}
      placeholderText={viewMode || props?.disabled ? '' : placeholderText}
      className={cx(className, 'text-gray-900 w-full truncate rounded-lg ', {
        'border-0 bg-transparent px-0': viewMode,
        'border border-gray-300 bg-gray-50 focus:ring-primary-500 focus:border-primary-500':
          !viewMode
      })}
    />
  );
}
