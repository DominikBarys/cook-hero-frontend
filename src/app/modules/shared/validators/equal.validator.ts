import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const equalValidator = (
  passwordControlName: string,
  repeatedPasswordControlName: string,
): ValidatorFn => {
  return (abstractControl: AbstractControl): ValidationErrors | null => {
    const passwordControl: AbstractControl<any, any> | null =
      abstractControl.get(passwordControlName);
    const repeatedPasswordControl: AbstractControl<any, any> | null =
      abstractControl.get(repeatedPasswordControlName);

    if (
      repeatedPasswordControl?.value &&
      repeatedPasswordControl?.value !== passwordControl?.value
    ) {
      repeatedPasswordControl.setErrors({
        passwordsNotEqual: true,
      });
    }

    return null;
  };
};
