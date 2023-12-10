import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { catchError, map, Observable, of, switchMap, take } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducer';
import { selectAuthenticationUser } from '../../authentication/store/authentication.selectors';

@Injectable({
  providedIn: 'root',
})
export class IsAdminGuard implements CanActivate {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private store: Store<AppState>,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authenticationService.isUserLoggedIn().pipe(
      take(1),
      switchMap((resp) => {
        const loggedIn = resp.loggedIn;

        if (loggedIn) {
          return this.store.select(selectAuthenticationUser).pipe(
            map((user) => {
              if (user && user.role === 'ADMIN') {
                return true;
              }
              this.router.navigate(['/']);
              return false;
            }),
          );
        }

        return of(false);
      }),
      catchError(() => {
        return of(true);
      }),
    );
  }
}
