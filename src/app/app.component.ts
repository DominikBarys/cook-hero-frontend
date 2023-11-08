import { Component, OnInit } from '@angular/core';
import { AppState } from './store/app.reducer';
import { Store } from '@ngrx/store';
import * as AuthenticationActions from '../app/modules/authentication/store/authentication.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'CookHero-fe';

  constructor(
    private store: Store<AppState>,
    private router: Router,
  ) {}

  isHomePage() {
    return this.router.url === '/';
  }

  ngOnInit(): void {
    this.store.dispatch(AuthenticationActions.autoLogin());
  }
}
