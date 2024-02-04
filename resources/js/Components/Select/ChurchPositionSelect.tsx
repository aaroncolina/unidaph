import { usePage } from '@inertiajs/react';
import GenericSelect, { GenericSelectProps } from './GenericSelect';
import { PageProps } from '@/types';
import { ChurchCategory } from '@/types/enums';

export interface ChurchPositionSelectProps
  extends Pick<
    GenericSelectProps,
    'selected' | 'onChange' | 'isSearchable' | 'label' | 'className' | 'viewMode'
  > {}

export default function ChurchPositionSelect({ ...props }: ChurchPositionSelectProps) {
  const positions = usePage<PageProps>().props.church_positions;

  const options = positions.map((position) => {
    return {
      label: position.value,
      value: position.id,
      category: position.category
    };
  });

  const localOption = options.filter((option) => option.category === ChurchCategory.Local);
  const districtOption = options.filter((option) => option.category === ChurchCategory.District);
  const nationalOption = options.filter((option) => option.category === ChurchCategory.National);

  return (
    <GenericSelect
      {...props}
      isSearchable={true}
      options={[
        {
          label: 'Local',
          options: localOption
        },
        {
          label: 'District',
          options: districtOption
        },
        {
          label: 'National',
          options: nationalOption
        }
      ]}
      isGrouped
      isMulti
      placeholder="Select a church position if applicable"
    />
  );
}
