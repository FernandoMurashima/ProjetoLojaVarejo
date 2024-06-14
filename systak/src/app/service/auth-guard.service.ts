import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    // If the user is authenticated, just skip
    console.log('Checking if the user is authenticated');
    return this.auth.isAuthenticated().pipe(
      take(1),
      map(isAuthenticated => {
        if (!isAuthenticated) {
          console.log('User is not authenticated. Redirecting to login');
          const redirectUrl = state.url;
          this.router.navigateByUrl(
            this.router.createUrlTree(['/login'], { queryParams: { redirectUrl } })
          );
          return false;
        }
        console.log('User is authenticated');
        return true;
      })
    );
  }
}
