import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartTableComponent } from 'src/app/features/cart/components/cart-table/cart-table.component';
import { NumberInputModule } from 'src/app/features/food/components/number-input/number-input.module';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [CartTableComponent],
  imports: [
    CommonModule,
    NumberInputModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [CartTableComponent],
})
export class CartTableModule {}
