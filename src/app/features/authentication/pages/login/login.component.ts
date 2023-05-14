import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { SnackbarUtilService } from 'src/app/core/services/snackbar-util.service';
import { User } from 'src/app/data/types/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private readonly snackbar: SnackbarUtilService,
    private readonly auth: AuthService,
    private readonly router: Router
  ) {}

  /**
   *  Login a user, if the form is valid. The user is redirected to the shop page.
   * @param param0
   */
  onLogin({ email, password }: User) {
    this.auth
      .login(email, password!)
      .then(() => {
        this.snackbar.open('User logged in successfully!');
        this.router.navigate(['/home']);
      })
      .catch(err => this.snackbar.open(err.message, 'error'));
  }
}
