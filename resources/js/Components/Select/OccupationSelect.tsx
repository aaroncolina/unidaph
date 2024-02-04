import { usePage } from '@inertiajs/react';
import GenericSelect, { GenericSelectProps } from './GenericSelect';
import { PageProps } from '@/types';

export interface OccupationSelectProps
  extends Pick<
    GenericSelectProps,
    'selected' | 'onChange' | 'isSearchable' | 'label' | 'className' | 'viewMode'
  > {}

export default function OccupationSelect({ ...props }: OccupationSelectProps) {
  const occupations = usePage<PageProps>().props.occupations;

  const options = occupations.map((occupation) => {
    return {
      label: occupation.value,
      value: occupation.id
    };
  });
  return (
    <GenericSelect
      {...props}
      isSearchable={true}
      options={options}
      placeholder="Select an occupation"
    />
  );
}
