import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps, Member } from '@/types';
import { LabelValue, Pagination } from '@/types/generic';
import { useCallback, useEffect } from 'react';
import { Link, router, useForm } from '@inertiajs/react';
import DataTable from '@/Components/DataTable/DataTable';
import { SearchInput } from '@/Components/Input/SearchInput';
import PerPageSelect from '@/Components/Select/PerPageSelect';
import { DeleteRoutes, GetRoutes } from '@/const';
import { OnChangeValue } from 'react-select';
import ChurchSelect from '@/Components/Select/ChurchSelect';
import { Button, ButtonVariant } from '@/Components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';

export interface MemberListProps
  extends PageProps<{
    members: Pagination<Member>;
    request: {
      search?: string;
      page?: number;
      church?: number[];
      per_page?: string;
    };
  }> {}

export default function MemberList({ auth, members, request }: MemberListProps) {
  const {
    data,
    setData,
    get,
    isDirty,
    delete: deleteMember
  } = useForm({
    search: request.search,
    page: request.page,
    church: request.church?.map((id) => Number(id)),
    per_page: request?.per_page ?? '15'
  });

  const submitForm = useCallback(() => {
    get(route(GetRoutes.Members), {
      data: {
        search: data.search,
        page: data.page,
        church: data.church,
        per_page: data.per_page
      },
      preserveState: true
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

  const onChurchSelect = (newValue: OnChangeValue<unknown, false>) => {
    setData('church', (newValue as LabelValue[]).map((value) => value.value) as number[]);
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      headerName="Members"
      leftActions={
        <>
          <PerPageSelect
            selected={data.per_page}
            onChange={onPerPageSelect}
            containerClassName="min-w-[170px]"
          />
          <ChurchSelect selected={data.church} onChange={onChurchSelect} isMulti />
        </>
      }
      rightActions={
        <>
          <SearchInput placeholder="Search..." value={data.search} onChange={onSearchChange} />
          <Link className="flex" href={route(GetRoutes.CreateMember)}>
            <Button variant={ButtonVariant.Primary}>Create</Button>
          </Link>
          <Link className="flex" href={route(GetRoutes.ImportMember)}>
            <Button variant={ButtonVariant.Tertiary}>Import</Button>
          </Link>
          <Button variant={ButtonVariant.Secondary}>Export</Button>
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
              name: <FontAwesomeIcon icon={faEye} />,
              variant: ButtonVariant.Secondary,
              onClick: (member: Member) =>
                router.visit(route(GetRoutes.ViewMember, { id: member.id }))
            },
            {
              name: <FontAwesomeIcon icon={faEdit} />,
              variant: ButtonVariant.Primary,
              onClick: (member: Member) =>
                router.visit(route(GetRoutes.EditMember, { id: member.id }))
            },
            {
              name: <FontAwesomeIcon icon={faTrash} />,
              variant: ButtonVariant.Danger,
              onClick: (member: Member) => {
                if (confirm('Are you sure you want to delete this member?')) {
                  deleteMember(route(DeleteRoutes.DeleteMember, { id: member.id }));
                }
                // console.log(route(DeleteRoutes.DeleteMember, { id: member.id }));
              }
            }
          ]}
        />
      </form>
    </AuthenticatedLayout>
  );
}
