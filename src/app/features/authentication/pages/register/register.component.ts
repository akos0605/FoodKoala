import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { SnackbarUtilService } from 'src/app/core/services/snackbar-util.service';
import { User } from 'src/app/data/types/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(
    private readonly snackbar: SnackbarUtilService,
    private readonly auth: AuthService,
    private readonly router: Router
  ) {}

  onRegister({ email, password }: User) {
    this.auth
      .register(email, password!)
      .then(() => {
        this.snackbar.open('User registered successfully!', 'success');
        this.router.navigateByUrl('/foods');
      })
      .catch(error => this.snackbar.open(error.message, 'error'));
  }
}
