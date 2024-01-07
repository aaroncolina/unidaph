import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps, Member } from '@/types';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { Pagination } from '@/types/generic';
import TextInput from '@/Components/TextInput';
import { Link } from '@inertiajs/react';
import { useCallback, useEffect } from 'react';
import cx from 'classnames';
import { useForm } from '@inertiajs/react';
const PER_PAGE_OPTIONS = ['5', '15', '50', '100'];

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
        <div className="flex flex-row gap-x-4 justify-center">
          <div className="relative w-fit">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <TextInput
              className="block w-fit p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Search..."
              value={data.search}
              autoFocus
              onChange={onSearchChange}
            />
          </div>

          <div className="flex flex-row gap-x-4 w-full">
            <select
              id="countries_disabled"
              className="w-fit text-sm bg-gray-50 py-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              onChange={onPerPageSelect}
            >
              <option disabled selected>
                Per page
              </option>
              {PER_PAGE_OPTIONS.map((option, index) => (
                <option key={index} value={option} selected={option === data.per_page}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="relative overflow-x-auto sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Church
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {members?.data?.map((member, index) => {
                return (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {member?.name}
                    </th>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {member?.church?.name} - {member?.church?.parent_church?.name}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <a
                        href="#"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <nav
            className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
            aria-label="Table navigation"
          >
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
              Showing &nbsp;
              <span className="font-semibold text-gray-900 dark:text-white">
                {members?.meta?.from}-{members?.meta?.to}
              </span>
              &nbsp; of &nbsp;
              <span className="font-semibold text-gray-900 dark:text-white">
                {members?.meta?.total}
              </span>
            </span>
            <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
              <li>
                <Link
                  href={members?.links?.first ?? ''}
                  method="get"
                  only={['users', 'request']}
                  className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  First
                </Link>
              </li>
              {members?.meta?.links?.map((link, index) => {
                if (!link.url) return;
                return (
                  <li key={index}>
                    <Link
                      href={link.url}
                      className={cx('flex items-center justify-center px-3 h-8', {
                        'text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white':
                          link?.active,
                        'leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white':
                          !link?.active
                      })}
                      only={['users', 'request']}
                      dangerouslySetInnerHTML={{ __html: link?.label ?? '' }}
                    />
                  </li>
                );
              })}
              <li>
                <Link
                  href={members?.links?.last ?? ''}
                  method="get"
                  only={['users', 'request']}
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Last
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </form>
    </AuthenticatedLayout>
  );
}
