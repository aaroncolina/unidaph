import { Primitive } from '@/types';
import { GroupedLabelValue, LabelValue } from '@/types/generic';
import cx from 'classnames';
import { useMemo } from 'react';
import ReactSelect, { Props as ReactSelectProps } from 'react-select';

export interface GenericSelectProps extends ReactSelectProps {
  label?: React.ReactNode;
  options: LabelValue[] | GroupedLabelValue[];
  selected?: Primitive | Primitive[];
  containerClassName?: string;
  isGrouped?: boolean;
  viewMode?: boolean;
}

export default function GenericSelect({
  label,
  className,
  containerClassName,
  options,
  selected: defaultSelected,
  isGrouped = false,
  viewMode = false,
  ...props
}: GenericSelectProps) {
  const selected = useMemo(() => {
    const selected = Array.isArray(defaultSelected) ? defaultSelected : [defaultSelected];

    if (isGrouped) {
      return (options as GroupedLabelValue[])
        .filter(
          (option) => option.options.filter((option) => selected?.includes(option.value)).length > 0
        )?.[0]
        ?.options.filter((options) => selected?.includes(options.value));
    }

    return (options as LabelValue[]).filter((option) => selected?.includes(option.value));
  }, [options, defaultSelected]);

  const selectComponent = (
    <ReactSelect
      {...props}
      isDisabled={viewMode || props.isDisabled}
      placeholder={viewMode || props.isDisabled ? '' : props.placeholder}
      defaultValue={selected}
      className={cx(className, 'text-sm w-full border-0 py-0 m-0', {
        'bg-transparent': viewMode,
        'bg-gray-50': !viewMode
      })}
      isClearable={false}
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          backgroundColor: viewMode ? 'transparent' : '#fafafa',
          borderRadius: '8px',
          border: viewMode || label ? 'none' : 'current',
          borderColor: viewMode || label ? 'none' : '#d4d4d4',
          outline: viewMode || label ? 'none' : 'none',
          minHeight: 40
        }),
        valueContainer: (baseStyles) => ({
          ...baseStyles,
          paddingLeft: viewMode ? '0' : baseStyles.paddingLeft,
          paddingRight: viewMode ? '0' : baseStyles.paddingRight
        }),
        singleValue: (baseStyles) => ({
          ...baseStyles,
          fontSize: 16,
          color: '#0f172a',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }),
        multiValue: (baseStyles) => ({
          ...baseStyles,
          fontSize: 16,
          color: '#0f172a',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }),
        multiValueRemove: (baseStyles) => ({
          ...baseStyles,
          display: viewMode || props.isDisabled ? 'none' : baseStyles.display
        }),
        multiValueLabel: (baseStyles) => ({
          ...baseStyles,
          paddingRight:
            viewMode || props.isDisabled ? baseStyles.paddingLeft : baseStyles.paddingRight
        }),
        indicatorSeparator: (baseStyles) => ({
          ...baseStyles,
          backgroundColor: 'none'
        }),
        dropdownIndicator: (baseStyles) => ({
          ...baseStyles,
          color: viewMode ? 'transparent' : baseStyles.color
        })
      }}
      options={options}
      menuShouldScrollIntoView={true}
    />
  );

  if (!label) return selectComponent;

  return (
    <div
      className={cx(
        containerClassName,
        [
          'flex flex-row items-center gap-x-2',
          'block w-fit text-sm text-gray-900 border border-gray-300',
          'rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500',
          'dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400',
          'dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
        ],
        {
          'px-3': label
        }
      )}
    >
      {label && <span className="select-none text-sm text-gray-500 w-fit truncate">{label}</span>}
      {selectComponent}
    </div>
  );
}
