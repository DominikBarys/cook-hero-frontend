import { Component, OnInit } from '@angular/core';
import VanillaTilt from 'vanilla-tilt';
import { AuthenticationService } from '../../../core/services/authentication.service';
import * as AuthenticationActions from '../../store/authentication.actions';
import { AppState } from '../../../../store/app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  username: string | null = null;
  email: string | null = null;
  rank: string | null = null;
  role: string | null = null;
  amountOfCreatedTutorials: number | null = null;

  constructor(
    private authenticationService: AuthenticationService,
    private store: Store<AppState>,
  ) {}

  ngOnInit(): void {
    VanillaTilt.init(document.querySelector('.vanillaTilt') as any);
    this.authenticationService
      .getUser()
      .pipe()
      .subscribe({
        next: (resp) => {
          this.username = resp.username;
          this.email = resp.email;
          this.rank = resp.rank.toLowerCase();
          this.role = resp.role.toLowerCase();
          this.amountOfCreatedTutorials = resp.amountOfCreatedTutorials;
        },
      });
  }

  logout() {
    this.store.dispatch(AuthenticationActions.logout());
  }
}
