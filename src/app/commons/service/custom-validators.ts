import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {}

export function patternValidator(
  regex: RegExp,
  error: ValidationErrors
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const passwordValid = regex.test(value);

    return !passwordValid ? error : null;
  };
}

export function passwordMatchValidator(control: AbstractControl) {
  const password = control.get('password')!.value;
  const confirmPassword = control.get('confirmPassword')!.value;
  const currentErrors = control.get('confirmPassword')!.errors;
  const confirmControl = control.get('confirmPassword');

  if (compare(password, confirmPassword)) {
    confirmControl!.setErrors({ ...currentErrors, NoPassswordMatch: true });
  } else {
    confirmControl!.setErrors(currentErrors);
  }
}

function compare(password: string, confirmPassword: string) {
  return password !== confirmPassword && confirmPassword !== '';
}
