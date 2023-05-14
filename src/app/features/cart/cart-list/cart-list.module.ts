import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartListComponent } from 'src/app/features/cart/cart-list/cart-list.component';
import { MatCardModule } from '@angular/material/card';
import { NumberInputModule } from 'src/app/features/food/components/number-input/number-input.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [CartListComponent],
  imports: [
    CommonModule,
    MatCardModule,
    NumberInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [CartListComponent],
})
export class CartListModule {}
