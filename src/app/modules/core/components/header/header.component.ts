import { Component } from '@angular/core';
import { AppState } from '../../../../store/app.reducer';
import { Store } from '@ngrx/store';
import * as AuthenticationActions from '../../../authentication/store/authentication.actions';
import { AuthenticationService } from '../../services/authentication.service';
import {
  AuthenticationResponse,
  User,
  UserInterface,
} from '../../models/authentication/authentication.models';
import { Observable } from 'rxjs';
import { selectAuthenticationUser } from '../../../authentication/store/authentication.selectors';

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

  user$: Observable<User | null> = this.store.select(selectAuthenticationUser);

  logout() {
    this.store.dispatch(AuthenticationActions.logout());
  }
}
