import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddToCartComponent } from 'src/app/features/food/components/add-to-cart/add-to-cart.component';
import { NumberInputModule } from 'src/app/features/food/components/number-input/number-input.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [AddToCartComponent],
  imports: [CommonModule, MatButtonModule, NumberInputModule, MatIconModule],
  exports: [AddToCartComponent],
})
export class AddToCartModule {}
