import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from 'src/app/data/types/cart-item.model';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss'],
})
export class CartListComponent {
  @Input() cart: CartItem[] = [];
  @Output() quantityChange = new EventEmitter<{ quantity: number; item: CartItem }>();
  @Output() removeFromCart = new EventEmitter<CartItem>();

  onQuantityChange(quantity: number, item: CartItem) {
    this.quantityChange.emit({ quantity, item });
  }

  onRemoveFromCart(item: CartItem) {
    this.removeFromCart.emit(item);
  }
}
