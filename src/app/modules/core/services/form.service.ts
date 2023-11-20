import { Injectable } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  LoginForm,
  RegisterForm,
  RecoveryPasswordForm,
  ResetPasswordForm,
  ChangeUsernameForm,
  AddCategoryForm,
} from '../models/forms/user.forms.models';
import { equalValidator } from '../../shared/validators/equal.validator';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  initAddCategoryForm(): FormGroup<AddCategoryForm> {
    return new FormGroup({
      name: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
    });
  }

  initLoginForm(): FormGroup<LoginForm> {
    return new FormGroup({
      username: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(30),
        ],
        nonNullable: true,
      }),
      password: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(50),
        ],
        nonNullable: true,
      }),
    });
  }

  initRegisterForm(): FormGroup<RegisterForm> {
    return new FormGroup(
      {
        username: new FormControl('', {
          validators: [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(30),
          ],
          nonNullable: true,
        }),
        email: new FormControl('', {
          validators: [Validators.required, Validators.email],
          nonNullable: true,
        }),
        password: new FormControl('', {
          validators: [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(50),
          ],
          nonNullable: true,
        }),
        repeatPassword: new FormControl('', {
          validators: [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(50),
          ],
          nonNullable: true,
        }),
      },
      { validators: [equalValidator('password', 'repeatPassword')] },
    );
  }

  initRecoveryPasswordForm(): FormGroup<RecoveryPasswordForm> {
    return new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        nonNullable: true,
      }),
    });
  }

  initResetPasswordForm(): FormGroup<ResetPasswordForm> {
    return new FormGroup(
      {
        password: new FormControl('', {
          validators: [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(50),
          ],
          nonNullable: true,
        }),
        repeatPassword: new FormControl('', {
          validators: [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(50),
          ],
          nonNullable: true,
        }),
      },
      { validators: [equalValidator('password', 'repeatPassword')] },
    );
  }

  initChangeUsernameForm(): FormGroup<ChangeUsernameForm> {
    return new FormGroup({
      newUsername: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(30),
        ],
        nonNullable: true,
      }),
    });
  }

  getErrorMessage(formControl: FormControl): string {
    if (formControl.hasError('required')) {
      return 'To pole jest wymagane';
    }
    if (formControl.hasError('minlength')) {
      return `Minimalna długość to ${formControl.errors?.['minlength'].requiredLength}`;
    }
    if (formControl.hasError('maxlength')) {
      return `Minimalna długość to ${formControl.errors?.['maxlength'].requiredLength}`;
    }
    if (formControl.hasError('email')) {
      return 'Niepoprawny adres email';
    }
    if (formControl.hasError('passwordsNotEqual')) {
      return 'Hasła nie są takie same';
    }
    return '';
  }
}
