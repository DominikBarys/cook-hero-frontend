import { Component, OnInit } from '@angular/core';
import { AppState } from '../../../../store/app.reducer';
import { Store } from '@ngrx/store';
import * as AuthenticationActions from '../../../authentication/store/authentication.actions';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../models/authentication/authentication.models';
import { BehaviorSubject, catchError, map, Observable, of, take } from 'rxjs';
import { selectAuthenticationUser } from '../../../authentication/store/authentication.selectors';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { Notification } from '../../models/tutorial/tutorial.models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private store: Store<AppState>,
    private authenticationService: AuthenticationService,
    private notifierService: NotifierService,
    private router: Router,
    private notificationService: NotificationService,
  ) {}

  user$: Observable<User | null> = this.store.select(selectAuthenticationUser);
  notifications$ = new BehaviorSubject<Notification[]>([]);
  notificationCount = 0;

  ngOnInit(): void {
    this.notifications$ = this.notificationService.notifications;
    this.notificationService.getNotifications().subscribe({
      next: (notifications) => {
        this.notificationCount = notifications.filter(
          (notification) => !notification.isChecked,
        ).length;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

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
