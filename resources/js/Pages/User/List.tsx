import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps, Member } from '@/types';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { Pagination } from '@/types/generic';
import { useCallback, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
import { SearchInput } from '@/Components/SearchInput';
import PerPageSelect from '@/Components/Select/PerPageSelect';

export interface MemberListProps
  extends PageProps<{
    members: Pagination<Member>;
    request: {
      search?: string;
      page?: number;
      per_page?: string;
    };
  }> {}

export default function MemberList({ auth, members, request }: MemberListProps) {
  const { data, setData, get, isDirty } = useForm({
    search: request.search,
    page: request.page,
    per_page: request?.per_page ?? '15'
  });

  const submitForm = useCallback(() => {
    get(route('members'), {
      data: {
        search: data.search,
        page: data.page,
        per_page: data.per_page
      }
    });
  }, [data]);

  useEffect(() => {
    if (isDirty) {
      submitForm();
    }
  }, [isDirty, data]);

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const onPerPageSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setData('per_page', e.target.value);
  };

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setData('search', e.target.value);
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      headerName="Members"
      actions={
        <>
          <PrimaryButton>Create</PrimaryButton>
          <SecondaryButton>Export</SecondaryButton>
        </>
      }
    >
      <form onSubmit={onFormSubmit} className="flex flex-col gap-y-4">
        <div className="flex flex-row gap-x-4">
          <SearchInput
            placeholder="Search..."
            value={data.search}
            autoFocus
            onChange={onSearchChange}
          />
          <PerPageSelect selected={data.per_page} onChange={onPerPageSelect} />
        </div>
        <DataTable
          pagination={members}
          columns={[
            {
              name: 'Name',
              selector: (member: Member) => member?.name
            },
            {
              name: 'Church',
              selector: (member: Member) =>
                `${member?.church?.name ?? ''}
                  -
                ${member?.church?.parent_church?.name ?? ''}`
            }
          ]}
          partialLoadKeys={['members', 'request']}
          actions={[
            {
              name: 'Edit',
              onClick: (member: Member) => alert(`Pseudo edit click ${member.name}`)
            }
          ]}
        />
      </form>
    </AuthenticatedLayout>
  );
}
