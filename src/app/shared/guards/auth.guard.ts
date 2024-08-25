import {
  Router,
 CanMatchFn,
  CanActivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

export const isAuthenticated = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) return true;

  authService.loguout();
  router.navigate(['login']);
  return false;
};

export const authGuardCanMatch: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  return isAuthenticated();
};

export const authGuardCanActivate: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  return isAuthenticated();
};
