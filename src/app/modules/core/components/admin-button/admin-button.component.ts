import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.reducer';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../models/authentication/authentication.models';
import { selectAuthenticationUser } from '../../../authentication/store/authentication.selectors';

@Component({
  selector: 'app-admin-button',
  templateUrl: './admin-button.component.html',
  styleUrls: ['./admin-button.component.scss'],
})
export class AdminButtonComponent {
  constructor(private store: Store<AppState>) {}

  user$: Observable<User | null> = this.store.select(selectAuthenticationUser);

  isAdmin(role: string): boolean {
    return role === 'ADMIN';
  }
}
