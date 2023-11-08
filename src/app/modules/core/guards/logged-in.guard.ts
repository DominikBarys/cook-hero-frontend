import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { catchError, map, Observable, of, take } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class LoggedInGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router,
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.isUserLoggedIn().pipe(
      take(1),
      map((resp) => {
        console.log(resp);
        const isLoggedIn = resp.loggedIn;
        console.log(isLoggedIn);
        if (isLoggedIn) {
          this.router.navigate(['/']);
          return false;
        }
        return true;
      }),
      catchError(() => {
        return of(true);
      }),
    );
  }
}
