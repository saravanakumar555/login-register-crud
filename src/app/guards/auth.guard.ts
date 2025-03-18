import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { RegistrationformService } from '../services/registrationform.service';

// export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
//   console.log(route,state)
//   return true;
//   // return inject(RegistrationformService).canActivate(inject(''), route.params['accessTokenObj']);
// };
@Injectable({ providedIn: 'root' })
export class authGuard implements CanActivate {
  constructor(
      private router: Router,
      private authservice: RegistrationformService
  ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const currentUser = this.authservice.getAuthenticatedUser;
      if (currentUser) {
          // authorised so return true
          return true;
      }
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/login']);
      return false;
  }
}