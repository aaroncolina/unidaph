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
