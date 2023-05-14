import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { MealDataService } from 'src/app/data/services/meal-data.service';
import { MealFilter } from 'src/app/data/types/meal-filter.model';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.scss'],
})
export class FoodsComponent implements OnInit {
  constructor(private readonly mealData: MealDataService) {}

  meals$ = this.mealData.meals$;

  ngOnInit(): void {}

  onFilterChange({ type, value }: MealFilter) {
    this.mealData.changeFilter(type, value);
  }
}
