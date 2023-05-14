import { Component, EventEmitter, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import {
  ErrorUtilService,
  NestedGroupErrorStateMatcher,
} from 'src/app/core/services/error-util.service';
import { User } from 'src/app/data/types/user.model';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent {
  @Output() register = new EventEmitter<User>();

  constructor(
    private readonly fb: FormBuilder,
    public readonly error: ErrorUtilService
  ) {}

  passwordsEqualsValidator = (control: AbstractControl): ValidationErrors | null => {
    const pwd = this.registerForm?.get('passwordFormGroup.password')?.value;
    const pwdConfirm = this.registerForm?.get(
      'passwordFormGroup.passwordConfirmation'
    )?.value;

    if (pwd === pwdConfirm) {
      return null;
    }
    return { passwordsNotEquals: true };
  };

  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    passwordFormGroup: this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        passwordConfirmation: ['', [Validators.required, Validators.minLength(6)]],
      },
      { validators: this.passwordsEqualsValidator }
    ),
  });

  /**
   * Error state matcher for the password form group
   */
  passwordGroupErrorStateMatcher = new NestedGroupErrorStateMatcher(
    this.registerForm['controls'].passwordFormGroup
  );

  /**
   * Register a new user, if the form is valid.
   */
  onSubmit(event: any) {
    if (this.registerForm.invalid) return;

    const email = this.registerForm.get('email')!.value!;
    const password = this.registerForm.get('passwordFormGroup.password')!.value!;

    this.register.emit({ email, password } as User);
  }

  getPasswordErrors(errorName: string) {
    return this.error.getError(
      this.registerForm,
      'passwordFormGroup.password',
      errorName
    );
  }

  getPasswordsNotEqualsError() {
    return this.registerForm['controls'].passwordFormGroup.errors?.['passwordsNotEquals'];
  }
}
