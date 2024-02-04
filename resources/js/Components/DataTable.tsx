import { Pagination } from '@/types/generic';
import { Link } from '@inertiajs/react';
import cx from 'classnames';

export interface DataTableColumn<T> {
  name: string;
  selector: (row: T, rowIndex?: number) => string | number | boolean;
}

export interface DataTableColumnActions<T> {
  name: string;
  onClick: (value: T) => void;
}

export interface DataTableProps<T> {
  pagination: Pagination<T>;
  columns: DataTableColumn<T>[];
  actions?: DataTableColumnActions<T>[];
  onRowClick?: (value: T) => void;
  partialLoadKeys: string[];
}

export default function DataTable<T>({
  pagination,
  columns,
  actions = [],
  onRowClick,
  partialLoadKeys
}: DataTableProps<T>) {
  return (
    <div className="relative overflow-x-auto sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {columns.map((item, index) => {
              return (
                <th key={index} scope="col" className="px-6 py-3">
                  {item?.name}
                </th>
              );
            })}
            {actions?.length > 0 && (
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {pagination?.data?.map((item, index) => {
            return (
              <tr
                key={index}
                className={cx(['bg-white border-b hover:bg-gray-50'], {
                  'cursor-pointer': onRowClick
                })}
                onClick={() => onRowClick?.(item)}
              >
                {columns.map((columnItem, index) => {
                  return (
                    <td
                      key={index}
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {columnItem?.selector(item)}
                    </td>
                  );
                })}
                {actions?.length > 0 && (
                  <td className="px-6 py-4">
                    {actions?.map((action, index) => {
                      return (
                        <>
                          {index >= 1 && ' | '}
                          <a
                            key={index}
                            href="#"
                            onClick={() => action?.onClick?.(item)}
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            {action?.name}
                          </a>
                        </>
                      );
                    })}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
      <nav
        className={cx(['flex items-center flex-column flex-wrap md:flex-row justify-between pt-4'])}
        aria-label="Table navigation"
      >
        <span
          className={cx([
            'text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0',
            'block w-full md:inline md:w-auto'
          ])}
        >
          Showing &nbsp;
          <span className="font-semibold text-gray-900 dark:text-white">
            {pagination?.meta?.from}-{pagination?.meta?.to}
          </span>
          &nbsp; of &nbsp;
          <span className="font-semibold text-gray-900 dark:text-white">
            {pagination?.meta?.total}
          </span>
        </span>
        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
          <li>
            <Link
              href={pagination?.links?.first ?? ''}
              method="get"
              only={partialLoadKeys}
              className={cx([
                'flex items-center justify-center px-3 h-8 ms-0 leading-tight',
                'text-gray-500 bg-white border border-gray-300 rounded-s-lg',
                'hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800',
                'dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700',
                'dark:hover:text-white'
              ])}
            >
              First
            </Link>
          </li>
          {pagination?.meta?.links?.map((link, index) => {
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
                  only={partialLoadKeys}
                  dangerouslySetInnerHTML={{ __html: link?.label ?? '' }}
                />
              </li>
            );
          })}
          <li>
            <Link
              href={pagination?.links?.last ?? ''}
              method="get"
              only={partialLoadKeys}
              className={cx([
                'flex items-center justify-center px-3 h-8 leading-tight',
                'text-gray-500 bg-white border border-gray-300 rounded-e-lg',
                'hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 ',
                'dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 ',
                'dark:hover:text-white'
              ])}
            >
              Last
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
