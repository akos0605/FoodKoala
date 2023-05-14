import { Component, Input, ViewChild } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';
import { CartItem } from 'src/app/data/types/cart-item.model';
import { Meal } from 'src/app/data/types/meal.model';
import { NumberInputComponent } from 'src/app/features/food/components/number-input/number-input.component';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss'],
})
export class AddToCartComponent {
  @Input() meal!: Meal;
  @ViewChild('quantityInput') quantityInput!: NumberInputComponent;

  constructor(private readonly cart: CartService) {}

  onAddToCartClick() {
    const quantity = this.quantityInput.num;
    const cartItem = {
      name: this.meal.strMeal,
      productId: this.meal.idMeal,
      quantity: quantity,
      price: this.meal.price,
    } as CartItem;
    this.cart.addItem(cartItem);
    this.quantityInput.reset();
  }
}
