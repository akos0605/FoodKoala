import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FoodsGridItemComponent } from 'src/app/features/food/components/foods-grid-item/foods-grid-item.component';
import { MatIconModule } from '@angular/material/icon';
import { NumberInputModule } from 'src/app/features/food/components/number-input/number-input.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [FoodsGridItemComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    NumberInputModule,
    MatIconModule,
  ],
  exports: [FoodsGridItemComponent],
  providers: [CurrencyPipe],
})
export class FoodsGridItemModule {}
