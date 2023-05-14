import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoodRoutingModule } from './food-routing.module';
import { FoodComponent } from 'src/app/features/food/pages/food/food.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { StrToArrayPipe } from 'src/app/core/pipes/str-to-array.pipe';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { IngredientTableModule } from 'src/app/features/food/components/ingredient-table/ingredient-table.module';
import { NgLetModule } from 'ng-let';

@NgModule({
  declarations: [FoodComponent],
  imports: [
    CommonModule,
    FoodRoutingModule,
    MatGridListModule,
    StrToArrayPipe,
    MatChipsModule,
    IngredientTableModule,
    MatTableModule,
    NgLetModule,
  ],
  exports: [FoodComponent],
  providers: [],
})
export class FoodModule {}
