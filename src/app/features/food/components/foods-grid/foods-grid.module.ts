import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodsGridComponent } from 'src/app/features/food/components/foods-grid/foods-grid.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { FoodsGridItemModule } from 'src/app/features/food/components/foods-grid-item/foods-grid-item.module';
import { NgLetModule } from 'ng-let';

@NgModule({
  declarations: [FoodsGridComponent],
  imports: [CommonModule, MatGridListModule, FoodsGridItemModule, NgLetModule],
  exports: [FoodsGridComponent],
})
export class FoodsGridModule {}
