import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { BreakpointObserverService } from 'src/app/core/services/breakpoint-observer.service';
import { CartService } from 'src/app/core/services/cart.service';
import { NetworkStatusService } from 'src/app/core/services/network-status.service';
import { SnackbarUtilService } from 'src/app/core/services/snackbar-util.service';
import { CartItem } from 'src/app/data/types/cart-item.model';
import { Meal } from 'src/app/data/types/meal.model';

@Component({
  selector: 'app-foods-grid',
  templateUrl: './foods-grid.component.html',
  styleUrls: ['./foods-grid.component.scss'],
})
export class FoodsGridComponent implements OnInit {
  constructor(
    private readonly breakpointObserver: BreakpointObserverService,
    private readonly cart: CartService,
    private readonly router: Router,
    private readonly snackbar: SnackbarUtilService,
    private readonly currency: CurrencyPipe,
    private readonly auth: AuthService,
    private readonly networkStatus: NetworkStatusService
  ) {}

  @Input() meals: Meal[] = [];
  columns$ = new Observable<number>();
  isOnline$ = this.networkStatus.isOnline$;
  isUserLoggedIn$ = this.auth.authState$.pipe(map(user => (user ? true : false)));

  /**
   * define the number of grid columns based on the screen size
   */
  ngOnInit(): void {
    this.columns$ = this.breakpointObserver.currentScreenSize$.pipe(
      map(screenSize => {
        switch (screenSize) {
          case 'XSmall':
            return 1;
          case 'Small':
            return 2;
          case 'Medium':
            return 3;
          case 'Large':
            return 4;
          default:
            return 5;
        }
      })
    );
  }

  addToCart(item: CartItem): void {
    this.cart.addItem(item).subscribe({
      next: () => {
        const price = this.currency.transform(item.price * item.quantity, 'HUF');
        const msg = `${item.quantity} piece of ${item.name} added to cart - ${price}`;
        return this.snackbar.open(msg, 'success');
      },
      error: error => this.snackbar.open(error.message, 'error'),
    });
  }

  view(item: Meal): void {
    this.router.navigateByUrl('/food/' + item.idMeal);
  }
}
