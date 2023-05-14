import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoodsRoutingModule } from './foods-routing.module';
import { FoodsComponent } from 'src/app/features/food/pages/foods/foods.component';
import { FoodsFilterModule } from 'src/app/features/food/components/foods-filter/foods-filter.module';
import { FoodsGridModule } from 'src/app/features/food/components/foods-grid/foods-grid.module';

@NgModule({
  declarations: [FoodsComponent],
  imports: [CommonModule, FoodsGridModule, FoodsRoutingModule, FoodsFilterModule],
  exports: [FoodsComponent],
})
export class FoodsModule {}
