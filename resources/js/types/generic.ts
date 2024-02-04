import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Primitive } from '.';

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
  links: {
    first?: string;
    last?: string;
    next?: string;
    prev?: string;
  };
  meta: {
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
