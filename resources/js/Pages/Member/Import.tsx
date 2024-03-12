import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps, ImportMember } from '@/types';
import { ImportMemberMappedKeys } from '@/types/generic';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import DataTable from '@/Components/DataTable/DataTable';
import ChurchSelect from '@/Components/Select/ChurchSelect';
import { Button, ButtonVariant } from '@/Components/Button';
import { FileUpload } from '@/Components/FileUpload/FileUpload';
import Papa from 'papaparse';
import { ChurchCategory, ImportMemberKeys } from '@/types/enums';
import { toast } from 'react-toastify';

export interface ImportProps extends PageProps {}

export default function Import({ auth }: ImportProps) {
  const [parsedData, setParsedData] = useState<ImportMember[]>();

  const [columnKeys, setColumnKeys] = useState<string[]>();

  const [file, setFile] = useState<File>();

  const onFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    setFile(event?.target?.files?.[0]);
  };

  const onResetClick = () => {
    setFile(undefined);
    setColumnKeys(undefined);
    setParsedData(undefined);
  };

  useEffect(() => {
    if (!file) return;

    Papa.parse<ImportMember>(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const headerKeys = Object.keys(results.data[0]);
        const filteredHeaderKeys = headerKeys.filter((key) => {
          return Object.values(ImportMemberKeys).includes(key as ImportMemberKeys);
        });

        if (filteredHeaderKeys.length === 0) {
          toast.error('The imported file is invalid.');
          onResetClick();
          return;
        }

        setParsedData(results.data);
        setColumnKeys(filteredHeaderKeys);
      }
    });
  }, [file]);

  const onImportClick = useCallback(() => {
    const mappedData = parsedData?.map((data) => {
      const structuredObject: Record<string, string> = {};
      Object.keys(data).map((key) => {
        structuredObject[ImportMemberMappedKeys[key as ImportMemberKeys]] =
          data[key as ImportMemberKeys];
      });
      return structuredObject;
    });

    console.log(mappedData);
  }, [parsedData]);

  return (
    <AuthenticatedLayout
      user={auth.user}
      headerName="Import members"
      showBackLink
      leftActions={
        <>
          {!file && (
            <FileUpload
              buttonVariant={ButtonVariant.Tertiary}
              buttonLabel="Select file"
              onChange={onFileSelect}
              accept=".xls,.xlsx,.csv"
            />
          )}
          {file && (
            <>
              <Button variant={ButtonVariant.Primary} onClick={onImportClick}>
                Import
              </Button>
              <Button variant={ButtonVariant.Secondary} onClick={onResetClick}>
                Reset
              </Button>
            </>
          )}
        </>
      }
      rightActions={
        <div className="flex flex-row gap-x-3 justify-center items-center">
          <span className="">Church:</span>

          <ChurchSelect selected={auth.user.church?.id} type={ChurchCategory.Local} />
        </div>
      }
    >
      {parsedData && file && columnKeys && (
        <DataTable
          columns={columnKeys?.map((row) => {
            return {
              name: row,
              selector: (member: ImportMember) => member[row as keyof ImportMember]
            };
          })}
          pagination={{ data: parsedData }}
          hidePagination
          hideSummary
        />
      )}
    </AuthenticatedLayout>
  );
}
