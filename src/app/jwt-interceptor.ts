import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MrAuthService } from './services/mr-auth-service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
   const authService = inject(MrAuthService);
  const token = authService.getAccessToken();
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return next(req);
};
