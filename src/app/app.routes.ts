import { Routes } from '@angular/router';
import EmployeeComponent from './pages/employee/employee.component';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component'),
  },

  {
    path: 'employee',
    loadComponent: () => import('./pages/employee/employee.component'),
    children: [
      {
        path: 'list',
        loadComponent: () => import('./pages/employee/list/list.component'),
      },

      {
        path: 'profile',
        loadComponent: () =>
          import('./pages/employee/profile/profile.component'),
      },
    ],
  },
];
