import { Routes } from '@angular/router';
import { authGuardCanActivate } from './shared/guards/auth.guard';
import { roleGuardCanActivate } from './shared/guards/role.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component'),
    /*    canActivate: [loginGuardCanActivate], */
  },

  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.component'),
    /*  canActivate: [loginGuardCanActivate], */
  },

  {
    path: 'employee',
    loadComponent: () => import('./pages/employee/employee.component'),
    canActivate: [authGuardCanActivate],
    canActivateChild: [roleGuardCanActivate],
    children: [
      {
        path: 'list',
        loadComponent: () =>
          import('./pages/employee/employee-list/employee-list.component'),
        data: {
          role: 'ADMIN',
        },
      },

      {
        path: 'profile',
        loadComponent: () =>
          import(
            './pages/employee/employee-profile/employee-profile.component'
          ),
      },
    ],
  },
];
