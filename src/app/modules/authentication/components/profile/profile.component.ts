import { Component, OnDestroy, OnInit } from '@angular/core';
import VanillaTilt from 'vanilla-tilt';
import { AuthenticationService } from '../../../core/services/authentication.service';
import * as AuthenticationActions from '../../store/authentication.actions';
import { AppState } from '../../../../store/app.reducer';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup } from '@angular/forms';
import {
  ChangeUsernameForm,
  ResetPasswordForm,
} from '../../../core/models/forms/user.forms.models';
import { FormService } from '../../../core/services/form.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  isChangingPassword: boolean = false;
  isChangingUsername: boolean = false;
  resetPasswordForm: FormGroup<ResetPasswordForm> =
    this.formService.initResetPasswordForm();
  changeUsernameForm: FormGroup<ChangeUsernameForm> =
    this.formService.initChangeUsernameForm();

  username: string | null = null;
  email: string | null = null;
  rank: string | null = null;
  role: string | null = null;
  amountOfCreatedTutorials: number | null = null;

  constructor(
    private authenticationService: AuthenticationService,
    private store: Store<AppState>,
    private formService: FormService,
    private notifierService: NotifierService,
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

  get passwordControls() {
    return this.resetPasswordForm.controls;
  }

  get usernameControls() {
    return this.changeUsernameForm.controls;
  }

  logout() {
    this.store.dispatch(AuthenticationActions.logout());
  }

  changeUsername() {
    this.isChangingUsername = true;
  }

  changePassword() {
    this.isChangingPassword = true;
  }

  getErrorMessage(formControl: FormControl<string>) {
    return this.formService.getErrorMessage(formControl);
  }

  onResetPassword() {
    const { password, repeatPassword } = this.resetPasswordForm.getRawValue();
    const newPassword: string = password;
    this.authenticationService.passwordResetNoEmail(password).subscribe({
      next: () => {
        this.notifierService.notify('success', 'Hasło zostało zmienione');
        this.isChangingPassword = false;
      },
      error: (err) => {
        this.notifierService.notify('warning', err);
        this.isChangingPassword = false;
      },
    });
  }

  onChangeUsername() {
    const usernameFormValue = this.changeUsernameForm.getRawValue();
    const newUsername = usernameFormValue.newUsername;

    this.authenticationService.changeUsername(newUsername).subscribe({
      next: () => {
        this.notifierService.notify(
          'success',
          'Nazwa użytkownika została zmieniona',
        );
        this.isChangingUsername = false;
        this.username = newUsername;
      },
      error: (err) => {
        this.notifierService.notify('warning', err);
        this.isChangingUsername = false;
      },
    });
  }

  return() {
    this.isChangingUsername = false;
    this.isChangingPassword = false;
  }
}
