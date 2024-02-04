import { faDashboard } from '@fortawesome/free-solid-svg-icons/faDashboard';
import { NavItem } from './types/generic';
import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers';

export enum GetRoutes {
  Dashboard = 'dashboard.index',

  Members = 'members.index',
  ViewMember = 'members.show',
  CreateMember = 'members.create',
  EditMember = 'members.edit'
}

export enum PostRoutes {
  StoreMember = 'members.store',
  UpdateMember = 'members.update'
}

export const navItems: NavItem[] = [
  {
    name: 'Dashboard',
    route: GetRoutes.Dashboard,
    icon: faDashboard
  },
  {
    name: 'Members',
    route: GetRoutes.Members,
    icon: faUsers
  }
];
