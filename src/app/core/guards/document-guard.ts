import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { inject } from '@angular/core';

export const documentGuard: CanActivateFn = (route, state) => {
 const authService = inject(AuthenticationService);
  const router = inject(Router);

  if(authService.isAuthenticated() && 
      authService.isInRole("admin,documentmanager,payrollmanager") 
    ) {

    return true;

  }else {
    router.navigate(['/forbidden']);
    return false;
  }
};
