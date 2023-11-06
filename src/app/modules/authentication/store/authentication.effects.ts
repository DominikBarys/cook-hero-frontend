import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthenticationService } from '../../core/services/authentication.service';
import * as AuthenticationActions from './authentication.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticationActions.login),
      switchMap((action) => {
        return this.authenticationService.login(action.userLogin).pipe(
          map((user) =>
            AuthenticationActions.loginSuccess({ user: { ...user } }),
          ),
          catchError((err) =>
            of(AuthenticationActions.loginFailure({ error: 'Wystąpił błąd.' })),
          ),
        );
      }),
    ),
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticationActions.register),
      switchMap((action) => {
        return this.authenticationService.register(action.userRegister).pipe(
          map((user) => {
            this.router.navigate(['/logowanie']);
            return AuthenticationActions.registerSuccess();
          }),
          catchError((err) =>
            of(
              AuthenticationActions.registerFailure({
                error: 'Wystąpił błąd.',
              }),
            ),
          ),
        );
      }),
    ),
  );

  constructor(
    private actions$: Actions,
    private authenticationService: AuthenticationService,
    private router: Router,
  ) {}
}
