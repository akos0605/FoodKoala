import { Component } from '@angular/core';
import { catchError, map, tap } from 'rxjs';
import { BreakpointObserverService } from 'src/app/core/services/breakpoint-observer.service';
import { MealDataService } from 'src/app/data/services/meal-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(
    private readonly mealData: MealDataService,
    private readonly breakpointObserver: BreakpointObserverService
  ) {}

  altImageUrl = 'assets/images/food-placeholder.png';
  randomMeal$ = this.mealData.randomMeal$.pipe(
    map(randomMeal => randomMeal.strMealThumb),
    catchError(() => this.altImageUrl)
  );
  isMobile$ = this.breakpointObserver.currentScreenSize$.pipe(
    map(size => size.includes('Small'))
  );
}
