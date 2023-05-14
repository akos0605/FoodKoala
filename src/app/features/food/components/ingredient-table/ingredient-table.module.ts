import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { IngredientTableComponent } from 'src/app/features/food/components/ingredient-table/ingredient-table.component';

@NgModule({
  declarations: [IngredientTableComponent],
  imports: [CommonModule, MatTableModule],
  exports: [IngredientTableComponent],
})
export class IngredientTableModule {}
