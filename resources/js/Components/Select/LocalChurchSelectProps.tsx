import { usePage } from '@inertiajs/react';
import GenericSelect, { GenericSelectProps } from './GenericSelect';
import { PageProps } from '@/types';

export interface LocalChurchSelectProps
  extends Pick<
    GenericSelectProps,
    'selected' | 'onChange' | 'isSearchable' | 'label' | 'className' | 'viewMode'
  > {}

export default function LocalChurchSelect({ ...props }: LocalChurchSelectProps) {
  const churches = usePage<PageProps>().props.local_church;

  const options = churches?.map((church) => {
    return {
      label: church.name,
      value: church.id
    };
  });
  return (
    <GenericSelect
      {...props}
      isSearchable={true}
      options={options}
      placeholder="Select a local church"
    />
  );
}
