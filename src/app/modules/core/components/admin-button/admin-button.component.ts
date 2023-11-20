import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.reducer';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, take } from 'rxjs';
import { User } from '../../models/authentication/authentication.models';
import { selectAuthenticationUser } from '../../../authentication/store/authentication.selectors';

@Component({
  selector: 'app-admin-button',
  templateUrl: './admin-button.component.html',
  styleUrls: ['./admin-button.component.scss'],
})
export class AdminButtonComponent {
  constructor(
    private store: Store<AppState>,
    private authenticationService: AuthenticationService,
    private router: Router,
  ) {}

  user$: Observable<User | null> = this.store.select(selectAuthenticationUser);

  isAdmin(role: string): boolean {
    return role === 'ADMIN';
  }
}
