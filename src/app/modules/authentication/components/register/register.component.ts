import { Component, OnDestroy } from '@angular/core';
import { FormService } from '../../../core/services/form.service';
import { FormControl, FormGroup } from '@angular/forms';
import { RegisterForm } from '../../../core/models/forms/user.forms.models';
import * as AuthenticationActions from '../../store/authentication.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.reducer';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnDestroy {
  registerForm: FormGroup<RegisterForm> = this.formService.initRegisterForm();
  passwordsNotEqualErrorMessage: string | null = null;

  constructor(
    private formService: FormService,
    private store: Store<AppState>,
  ) {}

  get controls() {
    return this.registerForm.controls;
  }

  getErrorMessage(formControl: FormControl): string {
    return this.formService.getErrorMessage(formControl);
  }

  onRegister() {
    const { username, email, password, repeatPassword } =
      this.registerForm.getRawValue();

    if (password !== repeatPassword) {
      this.passwordsNotEqualErrorMessage = 'Hasła nie są takie same.';
      return;
    }

    this.store.dispatch(
      AuthenticationActions.register({
        userRegister: { username, email, password },
      }),
    );
  }

  ngOnDestroy(): void {
    this.store.dispatch(AuthenticationActions.clearError());
  }
}
