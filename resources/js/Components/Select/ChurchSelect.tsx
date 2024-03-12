import { usePage } from '@inertiajs/react';
import GenericSelect, { GenericSelectProps } from './GenericSelect';
import { PageProps } from '@/types';
import { ChurchCategory } from '@/types/enums';

export interface ChurchSelectProps
  extends Pick<
    GenericSelectProps,
    | 'selected'
    | 'onChange'
    | 'isSearchable'
    | 'label'
    | 'className'
    | 'viewMode'
    | 'isMulti'
    | 'placeholder'
  > {
  type?: ChurchCategory;
}

export default function ChurchSelect({ type, ...props }: ChurchSelectProps) {
  const churches = usePage<PageProps>().props.auth.user.church_managed;

  const options =
    churches?.map((church) => {
      return {
        label: church.name,
        value: church.id,
        category: church.category
      };
    }) ?? [];

  const localOption = options.filter((option) => option.category === ChurchCategory.Local);
  const districtOption = options.filter((option) => option.category === ChurchCategory.District);
  const nationalOption = options.filter((option) => option.category === ChurchCategory.National);

  return (
    <GenericSelect
      {...props}
      isSearchable={true}
      options={[
        ...(type === undefined || type === ChurchCategory.Local
          ? [
              {
                label: 'Local',
                options: localOption
              }
            ]
          : []),
        ...(type === undefined || type === ChurchCategory.District
          ? [
              {
                label: 'District',
                options: districtOption
              }
            ]
          : []),
        ...(type === undefined || type === ChurchCategory.National
          ? [
              {
                label: 'National',
                options: nationalOption
              }
            ]
          : [])
      ]}
      isGrouped
      placeholder={props.placeholder ?? 'Select a church'}
    />
  );
}
