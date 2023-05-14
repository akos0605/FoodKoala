import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from 'src/app/features/cart/pages/cart/cart.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatSortModule } from '@angular/material/sort';
import { NumberInputModule } from 'src/app/features/food/components/number-input/number-input.module';
import { NgLetModule } from 'ng-let';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CartTableModule } from 'src/app/features/cart/components/cart-table/cart-table.module';
import { CartListModule } from 'src/app/features/cart/cart-list/cart-list.module';

@NgModule({
  declarations: [CartComponent],
  imports: [
    CommonModule,
    CartRoutingModule,
    MatSortModule,
    MatDividerModule,
    NumberInputModule,
    NgLetModule,
    CartTableModule,
    MatIconModule,
    MatButtonModule,
    CartListModule,
  ],
  exports: [CartComponent],
})
export class CartModule {}
