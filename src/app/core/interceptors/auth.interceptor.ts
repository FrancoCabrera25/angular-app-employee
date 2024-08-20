import type { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.currentToken();
  if (token) {
    req = req.clone({
      setHeaders: {
        authorization: `Bearer ${token}`,
      },
    });
  }
  return next(req);
};
