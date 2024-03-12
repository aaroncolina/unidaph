import { GenderType, ImportMemberKeys, MaritalStatusType, TagType } from './enums';
import { ToastDetail } from './generic';

export type Primitive = string | number;

export interface Member {
  id: number;
  name: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  suffix: string;
  email: string;
  username?: string;
  email_verified_at?: string;
  civil_status?: MaritalStatusType;
  date_of_birth?: string;
  date_of_death?: string;
  address?: string;
  contact_number?: string;
  gender: GenderType;
  church?: Church;
  church_managed?: Church[];
  church_ministries?: Tag<TagType.ChurchMinistry>[];
  church_positions?: Tag<TagType.ChurchPosition>[];
  occupations?: Tag<TagType.Occupation>[];
  spiritual_profile?: MemberSpiritualProfile;
}

export interface Tag<T> {
  id: number;
  uuid: string;
  type: T;
  value: string;
  category: string;
}

export interface Church {
  id: number;
  name: string;
  category?: string;
  description?: string;
  parent_church?: Church;
}

export interface MemberSpiritualProfile {
  id: number;
  date_of_baptism: string;
  date_of_conversion?: string;
  baptismal_location?: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
  auth: {
    user: Member;
  };
  occupations: Tag<TagType.Occupation>[];
  church_positions: Tag<TagType.ChurchPosition>[];
  church_ministries: Tag<TagType.ChurchMinistry>[];
  local_church: Church[];
  flash?: {
    toast: ToastDetail;
  };
};

export type ImportMember = Record<ImportMemberKeys, string>;
