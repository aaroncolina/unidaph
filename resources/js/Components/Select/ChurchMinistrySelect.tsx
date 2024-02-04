import { usePage } from '@inertiajs/react';
import GenericSelect, { GenericSelectProps } from './GenericSelect';
import { PageProps } from '@/types';

export interface ChurchMinistrySelectProps
  extends Pick<
    GenericSelectProps,
    'selected' | 'onChange' | 'isSearchable' | 'label' | 'className' | 'viewMode'
  > {}

export default function ChurchMinistrySelect({ ...props }: ChurchMinistrySelectProps) {
  const ministries = usePage<PageProps>().props.church_ministries;

  const options = ministries.map((ministry) => {
    return {
      label: ministry.value,
      value: ministry.id
    };
  });

  return (
    <GenericSelect
      {...props}
      isSearchable={true}
      options={options}
      isMulti
      placeholder="Select available ministries"
    />
  );
}
