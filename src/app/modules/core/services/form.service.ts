import { Injectable } from '@angular/core';
import {
  Form,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  LoginForm,
  RegisterForm,
  RecoveryPasswordForm,
  ResetPasswordForm,
  ChangeUsernameForm,
  AddCategoryForm,
  PostTutorial,
  AddIngredientForm,
  AddDishForm,
  ManageUserForm,
  ChangeUserIngredientForm,
  AddUserIngredientForm,
} from '../models/forms/user.forms.models';
import { equalValidator } from '../../shared/validators/equal.validator';
import { F } from '@angular/cdk/keycodes';
import { dateValidator } from '../../shared/validators/date.validator';

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

  initAddDishForm(): FormGroup<AddDishForm> {
    return new FormGroup({
      name: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
    });
  }

  initAddIngredientForm(): FormGroup<AddIngredientForm> {
    return new FormGroup({
      name: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
    });
  }

  initManageUserForm(): FormGroup<ManageUserForm> {
    return new FormGroup({
      username: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
    });
  }

  initAddTutorialForm(): FormGroup<PostTutorial> {
    return new FormGroup({
      name: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      timeToPrepare: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      difficulty: new FormControl('', {
        validators: [Validators.required, Validators.min(1), Validators.max(5)],
        nonNullable: true,
      }),
      dishShortId: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      shortDescription: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      categoryShortId: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      parameters: new FormArray([
        new FormGroup({
          key: new FormControl('', {
            nonNullable: true,
          }),
          value: new FormControl('', {
            nonNullable: true,
          }),
        }),
      ]),
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

  initChangeUserIngredientForm(): FormGroup<ChangeUserIngredientForm> {
    return new FormGroup({
      expirationDate: new FormControl('', {
        validators: [Validators.required, dateValidator()],
        nonNullable: true,
      }),
      quantity: new FormControl('', {
        validators: [Validators.required, Validators.min(0)],
        nonNullable: true,
      }),
    });
  }

  initAddUserIngredientForm(): FormGroup<AddUserIngredientForm> {
    return new FormGroup({
      ingredientShortId: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      expirationDate: new FormControl('', {
        validators: [Validators.required, dateValidator()],
        nonNullable: true,
      }),
      quantity: new FormControl('', {
        validators: [Validators.required, Validators.min(0)],
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
    if (formControl.hasError('min')) {
      return `Minimalna wartość to ${formControl.errors?.['min'].min}`;
    }
    if (formControl.hasError('max')) {
      return `Maksymalna war wartość to ${formControl.errors?.['max'].max}`;
    }
    if (formControl.hasError('invalidDate')) {
      return 'Data powinna być w formacie yyyy-mm-dd';
    }
    if (formControl.hasError('noExistingDate')) {
      return 'Taka data nie istnieje';
    }
    return 'f';
  }
}
