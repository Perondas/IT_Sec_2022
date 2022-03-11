import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

export function ConfirmedValidator(
  controlName: string,
  matchingControlName: string
) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (
      matchingControl.errors &&
      !matchingControl.errors['confirmedValidator']
    ) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmedValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}

export function PasswordMatchValidator(
  control: AbstractControl
): ValidationErrors | null {
  if (control) {
    const pass1 = control.get('password')?.value;
    const pass2 = control.get('password2')?.value;
    const err1 = control.get('password')?.errors;
    const err2 = control.get('password2')?.errors;
    if (err2 && !err2['confirmedValidator']) {
      return null;
    }
    if (pass1 !== pass2) {
      control.get('password2')?.setErrors({ confirmedValidator: true });
    } else {
      control.get('password2')?.setErrors(null);
    }
  }
  return null;
}
