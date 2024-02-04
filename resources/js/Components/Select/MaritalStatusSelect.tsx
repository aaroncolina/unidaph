import { MaritalStatusType } from '@/types/enums';
import GenericSelect, { GenericSelectProps } from './GenericSelect';

const DEFAULT_OPTIONS = [
  {
    label: 'Single',
    value: MaritalStatusType.Single
  },
  {
    label: 'Married',
    value: MaritalStatusType.Married
  },
  {
    label: 'Widowed',
    value: MaritalStatusType.Widowed
  },
  {
    label: 'Separated',
    value: MaritalStatusType.Separated
  },
  {
    label: 'Divorced',
    value: MaritalStatusType.Divorced
  }
];

export interface MaritalStatusSelectProps
  extends Pick<
    GenericSelectProps,
    'selected' | 'onChange' | 'isSearchable' | 'label' | 'className' | 'viewMode'
  > {}

export default function MaritalStatusSelect({ ...props }: MaritalStatusSelectProps) {
  return (
    <GenericSelect
      {...props}
      isSearchable={false}
      options={DEFAULT_OPTIONS}
      placeholder="Select martial status"
    />
  );
}
