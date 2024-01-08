import GenericSelect, { GenericSelectProps } from './GenericSelect';

const DEFAULT_PER_PAGE_OPTIONS = {
  '5': '5',
  '15': '15',
  '50': '50',
  '100': '100'
};

export interface PerPageSelectProps extends Pick<GenericSelectProps, 'selected' | 'onChange'> {}

export default function PerPageSelect({ ...props }: PerPageSelectProps) {
  return <GenericSelect {...props} label={'Per page'} options={DEFAULT_PER_PAGE_OPTIONS} />;
}
