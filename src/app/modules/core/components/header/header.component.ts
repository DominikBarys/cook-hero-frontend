import { Component } from '@angular/core';
import { AppState } from '../../../../store/app.reducer';
import { Store } from '@ngrx/store';
import * as AuthenticationActions from '../../../authentication/store/authentication.actions';
import { AuthenticationService } from '../../services/authentication.service';
import {
  AuthenticationResponse,
  UserInterface,
} from '../../models/authentication/authentication.models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    private store: Store<AppState>,
    private authenticationService: AuthenticationService,
  ) {}

  logout() {
    this.store.dispatch(AuthenticationActions.logout());
  }

  test() {
    console.log('dziala');
    let siema = this.authenticationService.isUserLoggedIn().subscribe({
      next: (value) => {
        console.log(value.loggedIn);
      },
    });
  }
}
