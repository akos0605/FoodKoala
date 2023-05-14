import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { CartItem } from 'src/app/data/types/cart-item.model';
import { Cart } from 'src/app/data/types/cart.model';

@Component({
  selector: 'app-cart-table',
  templateUrl: './cart-table.component.html',
  styleUrls: ['./cart-table.component.scss'],
})
export class CartTableComponent {
  @Input() cart: CartItem[] = [];
  @Output() quantityChange = new EventEmitter<{ quantity: number; item: CartItem }>();
  @Output() removeFromCart = new EventEmitter<CartItem>();

  onQuantityChange(quantity: number, item: CartItem) {
    this.quantityChange.emit({ quantity, item });
  }

  onRemoveFromCart(item: CartItem) {
    this.removeFromCart.emit(item);
  }

  sortMeals(sort: Sort) {
    const data = [...this.cart];
    if (!sort.active || sort.direction === '') {
      this.cart = data;
      return;
    }

    this.cart = data.sort((prev, curr) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return this.compare(prev.productId, curr.productId, isAsc);
        case 'unit price':
          return this.compare(prev.price, curr.price, isAsc);
        case 'price':
          return this.compare(
            prev.price * prev.quantity,
            curr.price * curr.quantity,
            isAsc
          );
        case 'quantity':
          return this.compare(prev.quantity, curr.quantity, isAsc);
        default:
          return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
