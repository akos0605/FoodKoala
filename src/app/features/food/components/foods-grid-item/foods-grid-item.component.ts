import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/data/types/cart-item.model';
import { Meal } from 'src/app/data/types/meal.model';
import { NumberInputComponent } from 'src/app/features/food/components/number-input/number-input.component';

@Component({
  selector: 'app-foods-grid-item',
  templateUrl: './foods-grid-item.component.html',
  styleUrls: ['./foods-grid-item.component.scss'],
})
export class FoodsGridItemComponent {
  @Input() meal!: Meal;
  @Input() isAddToCartShowing = false;
  @Input() isViewButtonShowing = false;
  @Output() addToCartClick = new EventEmitter<CartItem>();
  @Output() viewClick = new EventEmitter<Meal>();
  @ViewChild('quantityInput') quantityInput?: NumberInputComponent;

  onAddToCartClick() {
    const quantity = this.quantityInput!.num;
    const cartItem = {
      name: this.meal.strMeal,
      productId: this.meal.idMeal,
      quantity: quantity,
      price: this.meal.price,
    } as CartItem;
    this.addToCartClick.emit(cartItem);
    this.quantityInput!.reset();
  }

  onViewClick() {
    this.viewClick.emit(this.meal);
  }
}
