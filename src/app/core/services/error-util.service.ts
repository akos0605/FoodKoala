import { Injectable } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/**
 * Error when invalid control is dirty, or parent form is invalid.
 */
export class NestedGroupErrorStateMatcher implements ErrorStateMatcher {
  formGroup: FormGroup;
  constructor(formGroup: FormGroup) {
    this.formGroup = formGroup;
  }

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null) {
    if (
      (control?.parent?.dirty || control?.parent?.touched) &&
      (control?.parent?.invalid || this.formGroup.invalid)
    ) {
      return true;
    }
    return false;
  }
}

@Injectable({
  providedIn: 'root',
})
export class ErrorUtilService {
  constructor() {}

  getError(form: FormGroup, formControlName: string, errorName: string) {
    return form.get(formControlName)?.errors?.[errorName];
  }
}
