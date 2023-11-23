import { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface AddCategoryForm {
  name: FormControl<string>;
}

export interface AddDishForm {
  name: FormControl<string>;
}

export interface AddIngredientForm {
  name: FormControl<string>;
}

export interface ManageUserForm {
  username: FormControl<string>;
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

export interface PostTutorial {
  name: FormControl<string>;
  timeToPrepare: FormControl<string>;
  difficulty: FormControl<string>;
  shortDescription: FormControl<string>;
  categoryShortId: FormControl<string>;
  dishShortId: FormControl<string>;
  parameters: FormArray<
    FormGroup<{ value: FormControl<string>; key: FormControl<string> }>
  >;
}
