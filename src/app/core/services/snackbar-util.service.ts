import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarUtilService {
  constructor(private readonly snackbar: MatSnackBar) {}

  /**
   * Open a snackbar the bottom of the screen
   * @param message message to display
   * @param type type of message: 'error' or 'success'
   * @param action message to display on action button
   * @param duration duration of the snackbar
   */
  open(
    message: string,
    type: 'error' | 'success' = 'success',
    action: string = '',
    duration: number = 5000
  ) {
    const config = {
      duration: duration,
      panelClass: [type === 'success' ? 'snackbar-success' : 'snackbar-error'],
    };
    this.snackbar.open(message, action, config);
  }
}
