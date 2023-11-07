import { Component, OnDestroy } from '@angular/core';
import { FormService } from '../../../core/services/form.service';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginForm } from '../../../core/models/user/user.forms.models';
import * as AuthenticationActions from '../../store/authentication.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.reducer';
import { Observable } from 'rxjs';
import {
  selectAuthenticationError,
  selectAuthenticationLoading,
} from '../../store/authentication.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  loginForm: FormGroup<LoginForm> = this.formService.initLoginForm();
  errorMessage$: Observable<string | null> = this.store.select(
    selectAuthenticationError,
  );
  loading$: Observable<boolean> = this.store.select(
    selectAuthenticationLoading,
  );

  get controls() {
    return this.loginForm.controls;
  }
  constructor(
    private formService: FormService,
    private store: Store<AppState>,
  ) {}

  getErrorMessage(formControl: FormControl): string {
    return this.formService.getErrorMessage(formControl);
  }

  onLogin() {
    this.store.dispatch(
      AuthenticationActions.login({ userLogin: this.loginForm.getRawValue() }),
    );
  }

  ngOnDestroy(): void {
    this.store.dispatch(AuthenticationActions.clearError());
  }
}
