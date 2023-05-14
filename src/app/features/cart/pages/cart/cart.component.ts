import { Component, OnDestroy, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { combineLatest, first, map, tap } from 'rxjs';
import { BreakpointObserverService } from 'src/app/core/services/breakpoint-observer.service';
import { CartService } from 'src/app/core/services/cart.service';
import { NetworkStatusService } from 'src/app/core/services/network-status.service';
import { CartItem } from 'src/app/data/types/cart-item.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  constructor(
    private readonly cartService: CartService,
    private readonly breakpointObserver: BreakpointObserverService,
    private readonly networkStatusService: NetworkStatusService
  ) {}

  isOnline$ = this.networkStatusService.isOnline$;
  cart$ = this.cartService.cart$;
  totalPrice$ = this.cart$.pipe(
    map(item =>
      item
        .map((x: CartItem) => x.price * x.quantity)
        .reduce((acc: number, curr: number) => (acc += curr), 0)
    )
  );
  isMobile$ = this.breakpointObserver.currentScreenSize$.pipe(
    map((size: string) => size === 'XSmall' || size === 'Small')
  );
  vm$ = combineLatest([
    this.cart$,
    this.isMobile$,
    this.totalPrice$,
    this.isOnline$,
  ]).pipe(
    map(([cart, isMobile, totalPrice, isOnline]) => ({
      cart,
      isMobile,
      totalPrice,
      isOnline,
    }))
  );

  onQuantityChange({ quantity, item }: { quantity: number; item: CartItem }) {
    const newItem = { ...item, quantity: quantity };
    this.cartService.updateItem(newItem).pipe(first()).subscribe();
  }

  onRemoveFromCart(item: CartItem) {
    this.cartService.removeItem(item).pipe(first()).subscribe();
  }
}
