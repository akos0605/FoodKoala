import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { SnackbarUtilService } from 'src/app/core/services/snackbar-util.service';
import { fadeAnimation } from 'src/app/shared/animations/fade';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimation],
})
export class AppComponent implements OnInit {
  title = 'progressive-web-app';
  isSidenavOpen = false;
  currentRoute$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    map((event: any) => event.url)
  );
  authState$ = this.auth.authState$.pipe(map(user => (user ? true : false)));

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router,
    private readonly snackbar: SnackbarUtilService,
    private readonly swUpdate: SwUpdate,
    private readonly snakcbar: SnackbarUtilService
  ) {}

  ngOnInit(): void {
    this.swUpdate.checkForUpdate().then(data => {
      if (data) {
        this.snackbar.open('New version available!', 'success');
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      }
    });
  }

  onLogoutClick(event: any) {
    this.auth
      .logout()
      .then(() => {
        this.snackbar.open('User logged out successfully!', 'success');
        this.router.navigateByUrl('/home');
      })
      .catch(error => this.snackbar.open(error.message, 'error'));
  }

  toggleSidenav(event: any) {
    this.isSidenavOpen = event;
  }
}
