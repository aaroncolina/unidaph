import { GenderType } from '@/types/enums';
import GenericSelect, { GenericSelectProps } from './GenericSelect';

const DEFAULT_OPTIONS = [
  {
    label: 'Male',
    value: GenderType.Male
  },
  {
    label: 'Female',
    value: GenderType.Female
  }
];

export interface GenderSelectProps
  extends Pick<
    GenericSelectProps,
    'selected' | 'onChange' | 'isSearchable' | 'label' | 'className' | 'viewMode'
  > {}

export default function GenderSelect({ ...props }: GenderSelectProps) {
  return (
    <GenericSelect
      {...props}
      isSearchable={false}
      options={DEFAULT_OPTIONS}
      placeholder="Select a gender"
    />
  );
}
