import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Primitive } from '.';
import { ImportMemberKeys } from './enums';

export interface KeyValue {
  key: Primitive;
  value: Primitive;
}
export interface LabelValue {
  label: Primitive;
  value: Primitive;
}
export interface GroupedLabelValue {
  label: Primitive;
  options: LabelValue[];
}

export interface Pagination<T> {
  data: T[];
  links?: {
    first?: string;
    last?: string;
    next?: string;
    prev?: string;
  };
  meta?: {
    current_page?: number;
    from?: number;
    last_page?: number;
    links?: PaginationItemLink[];
    path?: string;
    per_page?: number;
    to?: number;
    total?: number;
  };
}

export interface PaginationItemLink {
  url?: string;
  label?: string;
  active?: boolean;
}

export interface NavItem {
  name: string;
  route: string;
  icon: IconDefinition;
}

export interface ToastDetail {
  message: string;
  type: 'default' | 'success' | 'error' | 'warning' | 'info';
}

export const ImportMemberMappedKeys: Record<ImportMemberKeys, string> = {
  [ImportMemberKeys.FirstName]: 'first_name',
  [ImportMemberKeys.MiddleName]: 'middle_name',
  [ImportMemberKeys.LastName]: 'last_name',
  [ImportMemberKeys.Email]: 'email',
  [ImportMemberKeys.ContactNumber]: 'contact_number',
  [ImportMemberKeys.Birthdate]: 'date_of_birth',
  [ImportMemberKeys.Address]: 'address',
  [ImportMemberKeys.Gender]: 'gender',
  [ImportMemberKeys.CivilStatus]: 'civil_status',
  [ImportMemberKeys.DateOfConversion]: 'date_of_conversion',
  [ImportMemberKeys.DateOfBaptism]: 'date_of_baptism',
  [ImportMemberKeys.ChurchPosition]: 'church_position',
  [ImportMemberKeys.Ministries]: 'ministries'
};
