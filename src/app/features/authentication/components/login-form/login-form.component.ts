import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ErrorUtilService } from 'src/app/core/services/error-util.service';
import { User } from 'src/app/data/types/user.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @Output() login = new EventEmitter<User>();

  constructor(
    private readonly fb: FormBuilder,
    public readonly error: ErrorUtilService
  ) {}

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  onSubmit(event: any) {
    if (this.loginForm.invalid) return;

    const email = this.loginForm.get('email')!.value!;
    const password = this.loginForm.get('password')!.value!;
    const user = { email, password } as User;

    this.login.emit(user);
  }
}
