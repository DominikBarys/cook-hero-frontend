import { FormControl } from '@angular/forms';

export interface AddCategoryForm {
  name: FormControl<string>;
}

export interface LoginForm {
  username: FormControl<string>;
  password: FormControl<string>;
}

export interface RegisterForm extends LoginForm {
  email: FormControl<string>;
  repeatPassword: FormControl<string>;
}

export interface RecoveryPasswordForm {
  email: FormControl<string>;
}

export interface ResetPasswordForm {
  password: FormControl<string>;
  repeatPassword: FormControl<string>;
}

export interface ChangeUsernameForm {
  newUsername: FormControl<string>;
}
