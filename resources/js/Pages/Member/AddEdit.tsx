import PrimaryButton from '@/Components/Button/PrimaryButton';
import TextInput from '@/Components/Input/TextInput';
import { Link, useForm } from '@inertiajs/react';
import { RequestPayload } from '@inertiajs/core';
import { useCallback, useMemo } from 'react';
import { Member, PageProps } from '@/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SecondaryButton from '@/Components/Button/SecondaryButton';
import { GetRoutes, PostRoutes } from '@/const';
import { OnChangeValue } from 'react-select';
import { FormInputGroup } from '@/Components/Form/FormInputGroup';
import { FormGroup } from '@/Components/Form/FormGroup';
import { FormRow } from '@/Components/Form/FormRow';
import person from '@/assets/images/user/person.png';

import { DatePicker } from '@/Components/Input/DatePicker';
import GenderSelect from '@/Components/Select/GenderSelect';
import MaritalStatusSelect from '@/Components/Select/MaritalStatusSelect';
import OccupationSelect from '@/Components/Select/OccupationSelect';
import ChurchPositionSelect from '@/Components/Select/ChurchPositionSelect';
import ChurchMinistrySelect from '@/Components/Select/ChurchMinistrySelect';
import ChurchSelect from '@/Components/Select/ChurchSelect';
import { LabelValue } from '@/types/generic';
import { computeDateOfBirth, dateToDateString } from '@/helper/date';
import { getOrganizationType } from '@/helper/organization';
import { ChurchCategory, GenderType, MaritalStatusType } from '@/types/enums';
import { humanize } from '@/helper/word';
import { extractTagIds } from '@/helper/tag';
import { upperFirst } from 'lodash';

enum Mode {
  Add = 'add',
  Edit = 'edit',
  View = 'view'
}

interface Payload {
  id?: number;
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  email?: string;
  contact_number?: string;
  date_of_birth?: string;
  address?: string;
  gender?: GenderType;
  occupation?: number;
  civil_status?: MaritalStatusType;

  date_of_conversion?: string;
  date_of_baptism?: string;
  church_positions?: number[];
  church_ministries?: number[];
  church?: number;
}

export interface AddEditProps
  extends PageProps<{
    request: Payload;
    member?: Member;
    viewOnly?: boolean;
  }> {}

export default function AddEdit({ auth, request, member, viewOnly = false }: AddEditProps) {
  const { data, setData, post, put, errors, isDirty } = useForm(
    `AddEditMember${member?.id ? `:${member.id}` : ''}`,
    {
      id: member?.id ?? 0,
      first_name: request?.first_name ?? member?.first_name,
      middle_name: request?.middle_name ?? member?.middle_name,
      last_name: request?.last_name ?? member?.last_name,
      email: request?.email ?? member?.email,
      contact_number: request?.contact_number ?? member?.contact_number,
      date_of_birth: request?.date_of_birth ?? member?.date_of_birth,
      address: request?.address ?? member?.address,
      gender: request?.gender ?? member?.gender,
      civil_status: request?.civil_status ?? member?.civil_status,
      occupation: request?.occupation ?? member?.occupations?.[0]?.id,
      date_of_conversion:
        request?.date_of_conversion ?? member?.spiritual_profile?.date_of_conversion,
      date_of_baptism: request?.date_of_baptism ?? member?.spiritual_profile?.date_of_baptism,
      church_positions: request?.church_positions ?? extractTagIds(member?.church_positions),
      church_ministries: request?.church_ministries ?? extractTagIds(member?.church_ministries),
      church: request?.church ?? member?.church?.id
    } as Payload
  );

  const submitForm = useCallback(() => {
    const payload = { data: data as RequestPayload };
    if (data.id) {
      put(route(PostRoutes.UpdateMember, { id: data.id }), payload);
    } else {
      post(route(PostRoutes.StoreMember), {
        ...payload,
        onSuccess: (test) => {
          console.log('test', test);
        }
      });
    }
  }, [data, member]);

  const onSelect = (key: keyof Payload, newValue: OnChangeValue<unknown, false>) => {
    setData(key, (newValue as LabelValue).value as string);
  };

  const onDateSelect = (key: keyof Payload, date: Date | null) => {
    setData(key, date ? dateToDateString(date) : undefined);
  };

  const dateOfBirth = data.date_of_birth ? new Date(data.date_of_birth) : null;
  const age = dateOfBirth ? computeDateOfBirth(dateOfBirth) : 0;

  const mode = useMemo(() => {
    if (member?.id) {
      if (viewOnly) return Mode.View;

      return Mode.Edit;
    }

    return Mode.Add;
  }, [member, viewOnly]);

  return (
    <AuthenticatedLayout
      user={auth.user}
      headerName={`${upperFirst(mode)} member`}
      rightActions={
        <>
          {[Mode.Edit, Mode.Add].includes(mode) && (
            <PrimaryButton onClick={submitForm} disabled={data?.id ? !isDirty : false}>
              {data.id ? 'Update' : 'Save'}
            </PrimaryButton>
          )}
          {mode === Mode.View && (
            <Link href={route(GetRoutes.EditMember, { id: member?.id })}>
              <PrimaryButton>Edit</PrimaryButton>
            </Link>
          )}
          <SecondaryButton onClick={() => window.history.back()}>Back</SecondaryButton>
        </>
      }
      showBackLink
    >
      <section className="bg-white dark:bg-gray-900 rounded-lg">
        <div className="w-full flex flex-row gap-x-5 p-6">
          <FormGroup className="!w-1/5 items-center">
            <img src={person} className="w-32 pt-10" />
          </FormGroup>
          <FormGroup className="!w-4/5 flex flex-col gap-y-10">
            <FormGroup label="Personal Information">
              <FormRow>
                <FormInputGroup label="First name" error={errors?.first_name} required>
                  <TextInput
                    viewMode={viewOnly}
                    type="text"
                    name="first_name"
                    defaultValue={data.first_name}
                    onChange={(e) => setData('first_name', e.target.value)}
                  />
                </FormInputGroup>
                <FormInputGroup label="Middle name" error={errors?.middle_name}>
                  <TextInput
                    viewMode={viewOnly}
                    type="text"
                    name="middle_name"
                    defaultValue={data.middle_name}
                    onChange={(e) => setData('middle_name', e.target.value)}
                  />
                </FormInputGroup>
                <FormInputGroup label="Last name" error={errors?.last_name} required>
                  <TextInput
                    viewMode={viewOnly}
                    type="text"
                    name="last_name"
                    defaultValue={data.last_name}
                    onChange={(e) => setData('last_name', e.target.value)}
                  />
                </FormInputGroup>
              </FormRow>
              <FormRow>
                <FormInputGroup label="Email" error={errors?.email}>
                  <TextInput
                    viewMode={viewOnly}
                    type="text"
                    name="email"
                    defaultValue={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                  />
                </FormInputGroup>
                <FormInputGroup label="Contact number" error={errors?.contact_number}>
                  <TextInput
                    viewMode={viewOnly}
                    type="text"
                    name="contact_number"
                    defaultValue={data.contact_number}
                    onChange={(e) => setData('contact_number', e.target.value)}
                  />
                </FormInputGroup>
                <FormRow>
                  <FormInputGroup
                    label="Birth date"
                    className="w-2/3"
                    error={errors?.date_of_birth}
                    required
                  >
                    <DatePicker
                      viewMode={viewOnly}
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      selected={dateOfBirth}
                      onChange={(date) => onDateSelect('date_of_birth', date)}
                      openToDate={data.date_of_birth ? undefined : new Date('1970/01/1')}
                    />
                  </FormInputGroup>
                  <FormInputGroup label="Age" className="w-1/3">
                    <TextInput viewMode={viewOnly} type="text" disabled value={age} />
                  </FormInputGroup>
                </FormRow>
              </FormRow>
              {viewOnly && <hr />}
              <FormRow>
                <FormInputGroup label="Address" className="w-2/3" error={errors?.address} required>
                  <TextInput
                    viewMode={viewOnly}
                    type="text"
                    name="address"
                    defaultValue={data.address}
                    onChange={(e) => setData('address', e.target.value)}
                  />
                </FormInputGroup>
                <FormInputGroup label="Gender" className="w-1/3" error={errors?.gender} required>
                  <GenderSelect
                    viewMode={viewOnly}
                    selected={data.gender}
                    onChange={(value) => onSelect('gender', value)}
                  />
                </FormInputGroup>
              </FormRow>
              <FormRow>
                <FormInputGroup label="Occupation" className="w-2/3" error={errors?.occupation}>
                  <OccupationSelect
                    viewMode={viewOnly}
                    selected={data.occupation}
                    onChange={(value) => onSelect('occupation', value)}
                  />
                </FormInputGroup>
                <FormInputGroup
                  label="Civil status"
                  className="w-1/3"
                  error={errors?.civil_status}
                  required
                >
                  <MaritalStatusSelect
                    viewMode={viewOnly}
                    selected={data.civil_status}
                    onChange={(value) => onSelect('civil_status', value)}
                  />
                </FormInputGroup>
              </FormRow>
            </FormGroup>

            {viewOnly && <hr />}
            <FormGroup label="Church related">
              <FormRow>
                <FormInputGroup label="Date of Conversion" error={errors?.date_of_conversion}>
                  <DatePicker
                    viewMode={viewOnly}
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    selected={data.date_of_conversion ? new Date(data.date_of_conversion) : null}
                    onChange={(date) => onDateSelect('date_of_conversion', date)}
                  />
                </FormInputGroup>
                <FormInputGroup label="Date of Baptism" error={errors?.date_of_baptism}>
                  <DatePicker
                    viewMode={viewOnly}
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    selected={data.date_of_baptism ? new Date(data.date_of_baptism) : null}
                    onChange={(date) => onDateSelect('date_of_baptism', date)}
                  />
                </FormInputGroup>
              </FormRow>
              <FormRow>
                <FormInputGroup label="Church positions" error={errors?.church_positions}>
                  <ChurchPositionSelect
                    viewMode={viewOnly}
                    selected={data.church_positions}
                    isMulti
                    onChange={(value) => {
                      setData(
                        'church_positions',
                        (value as LabelValue[]).map((value) => value.value) as number[]
                      );
                    }}
                  />
                </FormInputGroup>
                <FormInputGroup label="Ministries" error={errors?.church_ministries}>
                  <ChurchMinistrySelect
                    viewMode={viewOnly}
                    selected={data.church_ministries}
                    onChange={(value) => {
                      setData(
                        'church_ministries',
                        (value as LabelValue[]).map((value) => value.value) as number[]
                      );
                    }}
                  />
                </FormInputGroup>
              </FormRow>
              <FormRow>
                <FormInputGroup label="Organization">
                  <TextInput
                    viewMode={viewOnly}
                    type="text"
                    value={
                      age != 0 && data.gender && data.civil_status
                        ? humanize(getOrganizationType(age, data.gender, data.civil_status))
                        : ''
                    }
                    disabled
                  />
                </FormInputGroup>
                <FormInputGroup label="Church" error={errors?.church}>
                  <ChurchSelect
                    viewMode={viewOnly}
                    selected={data.church}
                    type={ChurchCategory.Local}
                    onChange={(value) => onSelect('church', value)}
                  />
                </FormInputGroup>
              </FormRow>
            </FormGroup>
          </FormGroup>
        </div>
      </section>
    </AuthenticatedLayout>
  );
}
