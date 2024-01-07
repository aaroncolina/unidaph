export interface Member {
  id: number;
  name: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  suffix: string;
  email: string;
  username: string;
  email_verified_at?: string;
  civil_status?: string;
  date_of_birth?: string;
  date_of_death?: string;
  church?: Church;
}

export interface Church {
  id: number;
  name: string;
  category?: string;
  description?: string;
  parent_church?: Church;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
  auth: {
    user: Member;
  };
};
