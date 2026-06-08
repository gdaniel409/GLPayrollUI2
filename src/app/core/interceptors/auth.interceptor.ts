
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthenticationService } from '../services/authentication/authentication.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  
  const authService = inject(AuthenticationService);

  if(!authService.authResponse?.token) {
    return next(req);
  }

  const authReq = req.clone({

     setHeaders: { Authorization: `Bearer ${authService.authResponse.token}` }

  });

  return next(authReq);
};


