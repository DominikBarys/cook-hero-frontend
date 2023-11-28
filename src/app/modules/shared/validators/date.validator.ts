import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const dateValidator = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value;

    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!datePattern.test(value)) {
      control.setErrors({ invalidDate: true });
      return { invalidDate: true };
    }

    const date = new Date(value);
    if (isNaN(date.getTime())) {
      control.setErrors({ invalidDate: true });
      return { noExistingDate: true };
    }

    control.setErrors(null);
    return null;
  };
};
