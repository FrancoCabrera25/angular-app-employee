import {
  Router,
  CanActivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

export const isAuthenticated = (role: string) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated() && role === authService.userRole()) return true;

  authService.loguout();
  router.navigate(['login']);
  return false;
};

export const roleGuardCanMatch: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  return isAuthenticated(route.data['role']);
};

export const roleGuardCanActivate: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  return isAuthenticated(route.data['role']);
};
