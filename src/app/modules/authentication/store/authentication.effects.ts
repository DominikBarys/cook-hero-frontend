import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthenticationService } from '../../core/services/authentication.service';
import * as AuthenticationActions from './authentication.actions';
import { catchError, EMPTY, map, of, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Injectable()
export class AuthenticationEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticationActions.login),
      switchMap((action) => {
        return this.authenticationService.login(action.userLogin).pipe(
          map((user) => {
            this.router.navigate(['/']);
            this.notifierService.notify('success', 'Zalogowano pomyślnie.');
            return AuthenticationActions.loginSuccess({ user: { ...user } });
          }),
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
            this.notifierService.notify(
              'success',
              'Zarejestrowano pomyślnie. Został wysłany link aktywacyjny na podanego emaila',
            );
            return AuthenticationActions.registerSuccess();
          }),
          catchError((err) => {
            return of(
              AuthenticationActions.registerFailure({
                error: err,
              }),
            );
          }),
        );
      }),
    ),
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticationActions.logout),
      switchMap(() => {
        return this.authenticationService.logout().pipe(
          map(() => {
            this.router.navigate(['/']);
            this.notifierService.notify('success', 'Wylogowano pomyślnie.');
            return AuthenticationActions.logoutSuccess();
          }),
          catchError((err) => {
            this.notifierService.notify('warning', err);
            return of(AuthenticationActions.logoutFailure());
          }),
        );
      }),
    ),
  );

  autoLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticationActions.autoLogin),
      switchMap(() => {
        return this.authenticationService.autoLogin().pipe(
          map((user) => {
            this.notifierService.notify(
              'success',
              'Witaj ponownie ' + user.username,
            );
            return AuthenticationActions.autoLoginSuccess({
              user: { ...user },
            });
          }),
          catchError((err) => of(AuthenticationActions.autoLoginFailure())),
        );
      }),
    ),
  );

  constructor(
    private actions$: Actions,
    private authenticationService: AuthenticationService,
    private router: Router,
    private notifierService: NotifierService,
  ) {}
}
