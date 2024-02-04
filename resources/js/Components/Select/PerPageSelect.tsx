import GenericSelect, { GenericSelectProps } from './GenericSelect';

const DEFAULT_PER_PAGE_OPTIONS = [
  {
    label: '5',
    value: '5'
  },
  {
    label: '15',
    value: '15'
  },
  {
    label: '50',
    value: '50'
  },
  {
    label: '100',
    value: '100'
  }
];

export interface PerPageSelectProps extends Pick<GenericSelectProps, 'selected' | 'onChange'> {}

export default function PerPageSelect({ ...props }: PerPageSelectProps) {
  return (
    <GenericSelect
      {...props}
      isSearchable={false}
      label="Per page"
      className="!w-fit"
      options={DEFAULT_PER_PAGE_OPTIONS}
    />
  );
}
