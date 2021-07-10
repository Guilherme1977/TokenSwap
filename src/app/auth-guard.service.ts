// @Injectable({
//   providedIn: 'root'
// })
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private authService: AuthService, private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.inMaintenance) {
      // alert('This Site Is Under Maintenance')
      this.router.navigate(['/maintenance']);
      return false;
    } else {
      return true;
    }
  }

}