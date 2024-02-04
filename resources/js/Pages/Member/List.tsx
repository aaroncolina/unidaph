import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps, Member } from '@/types';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { LabelValue, Pagination } from '@/types/generic';
import { useCallback, useEffect } from 'react';
import { Link, router, useForm } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
import { SearchInput } from '@/Components/SearchInput';
import PerPageSelect from '@/Components/Select/PerPageSelect';
import { GetRoutes } from '@/const';
import { OnChangeValue } from 'react-select';

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
    get(route(GetRoutes.Members), {
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

  const onPerPageSelect = (newValue: OnChangeValue<unknown, false>) => {
    setData('per_page', (newValue as LabelValue).value as string);
  };

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setData('search', e.target.value);
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      headerName="Members"
      leftActions={<PerPageSelect selected={data.per_page} onChange={onPerPageSelect} />}
      rightActions={
        <>
          <SearchInput
            placeholder="Search..."
            value={data.search}
            autoFocus
            onChange={onSearchChange}
          />
          <Link className="flex" href={route(GetRoutes.CreateMember)}>
            <PrimaryButton>Create</PrimaryButton>
          </Link>
          <SecondaryButton>Export</SecondaryButton>
        </>
      }
    >
      <form className="flex flex-col gap-y-4">
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
              onClick: (member: Member) =>
                router.visit(route(GetRoutes.EditMember, { id: member.id }))
            }
          ]}
          onRowClick={(member: Member) =>
            router.visit(route(GetRoutes.ViewMember, { id: member.id }))
          }
        />
      </form>
    </AuthenticatedLayout>
  );
}
