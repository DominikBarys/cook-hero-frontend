import { Component, OnInit } from '@angular/core';
import { AppState } from './store/app.reducer';
import { Store } from '@ngrx/store';
import * as AuthenticationActions from '../app/modules/authentication/store/authentication.actions';
import { Router } from '@angular/router';
import { UserInterface } from './modules/core/models/authentication/authentication.models';
import { AuthenticationService } from './modules/core/services/authentication.service';
import { map, Observable, take } from 'rxjs';
import { NotificationService } from './modules/core/services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'CookHero-fe';
  //user$: Observable<UserInterface> | null = null;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService,
  ) {}

  isHomePage() {
    return this.router.url === '/';
  }

  ngOnInit(): void {
    this.store.dispatch(AuthenticationActions.autoLogin());
    this.authenticationService
      .getUser()
      .pipe()
      .subscribe({
        next: (resp) => {
          console.log(resp.uuid);
        },
      });
    this.notificationService.getNotifications().subscribe();
  }
}
