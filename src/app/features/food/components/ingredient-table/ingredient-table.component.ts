import { Component, Input } from '@angular/core';
import { Ingredient } from 'src/app/data/types/ingredient.model';

@Component({
  selector: 'app-ingredient-table',
  templateUrl: './ingredient-table.component.html',
  styleUrls: ['./ingredient-table.component.scss'],
})
export class IngredientTableComponent {
  @Input() ingredients: Ingredient[] = [];
  displayedColumns = ['ingredient', 'measure'];
}
