import { inject } from '@angular/core';
import {
  CanActivateChildFn,
  CanMatchFn,
  Router,
  type CanActivateFn,
} from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

export const isAuthenticated = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    if (authService.userRole() === 'ADMIN') {
      router.navigate(['employee/list']);
    } else if (authService.userRole() === 'USER') {
      router.navigate(['employee/profile']);
    } else{
      return true;
    }
  }

  return true;
};

export const loginGuardCanMatch: CanMatchFn = isAuthenticated;
export const loginGuardCanActivate: CanActivateFn = isAuthenticated;
export const loginGuardCanActivateChild: CanActivateChildFn = isAuthenticated;
