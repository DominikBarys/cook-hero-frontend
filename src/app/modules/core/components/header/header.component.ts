import { Component } from '@angular/core';
import { AppState } from '../../../../store/app.reducer';
import { Store } from '@ngrx/store';
import * as AuthenticationActions from '../../../authentication/store/authentication.actions';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../models/authentication/authentication.models';
import { catchError, map, Observable, of, take } from 'rxjs';
import { selectAuthenticationUser } from '../../../authentication/store/authentication.selectors';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    private store: Store<AppState>,
    private authenticationService: AuthenticationService,
    private notifierService: NotifierService,
    private router: Router,
  ) {}

  user$: Observable<User | null> = this.store.select(selectAuthenticationUser);

  logout() {
    this.store.dispatch(AuthenticationActions.logout());
  }

  isLoggedIn(path: string) {
    this.authenticationService
      .isUserLoggedIn()
      .pipe(
        take(1),
        map((resp) => {
          //console.log(resp.loggedIn);
          const isLoggedIn = resp.loggedIn;
          if (!isLoggedIn) {
            this.notifierService.notify(
              'warning',
              'Zaloguj się aby mieć dostęp do tej sekcji',
            );
          }
          return isLoggedIn;
        }),
        catchError(() => {
          return of(false);
        }),
      )
      .subscribe((isLoggedIn) => {
        if (isLoggedIn) {
          this.router.navigate(['/' + path]);
        }
      });
  }
}
