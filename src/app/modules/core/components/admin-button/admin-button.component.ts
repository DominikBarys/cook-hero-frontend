import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.reducer';
import { Observable } from 'rxjs';
import { User } from '../../models/authentication/authentication.models';
import { selectAuthenticationUser } from '../../../authentication/store/authentication.selectors';

@Component({
  selector: 'app-admin-button',
  templateUrl: './admin-button.component.html',
  styleUrls: ['./admin-button.component.scss'],
})
export class AdminButtonComponent {
  user$: Observable<User | null> = this.store.select(selectAuthenticationUser);

  constructor(private store: Store<AppState>) {}

  isAdmin(role: string): boolean {
    return role === 'ADMIN';
  }
}
