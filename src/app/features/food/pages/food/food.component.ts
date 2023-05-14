import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, switchMap, tap } from 'rxjs';
import { BreakpointObserverService } from 'src/app/core/services/breakpoint-observer.service';
import { CartService } from 'src/app/core/services/cart.service';
import { MealDataService } from 'src/app/data/services/meal-data.service';

type GridSize = {
  col: number;
  row: number;
};
type FoodGridLayout = {
  image: GridSize;
  details: GridSize;
  ingredients: GridSize;
  instructions: GridSize;
};
type Layout = {
  gridWidth: number;
  gridHeight: number;
  layout: FoodGridLayout;
};
@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss'],
})
export class FoodComponent {
  meal$ = this.route.params.pipe(
    switchMap(params => this.mealData.getMealById(params['id'])),
    tap(meal => meal || this.router.navigateByUrl('not-found'))
  );

  webLayout: FoodGridLayout = {
    image: { col: 10, row: 15 },
    details: { col: 20, row: 15 },
    ingredients: { col: 10, row: 25 },
    instructions: { col: 30, row: 10 },
  };

  phoneLayout: FoodGridLayout = {
    image: { col: 20, row: 15 },
    details: { col: 20, row: 15 },
    ingredients: { col: 40, row: 20 },
    instructions: { col: 40, row: 17 },
  };

  layout$ = this.breakpointObserver.currentScreenSize$.pipe(
    map(this.mapScreenSizeToLayout.bind(this))
  );

  constructor(
    private readonly route: ActivatedRoute,
    private readonly cart: CartService,
    private readonly mealData: MealDataService,
    private readonly router: Router,
    private readonly breakpointObserver: BreakpointObserverService
  ) {}

  mapScreenSizeToLayout(size: string) {
    let gridWidth = 70;
    let gridHeight = 70;
    let layout = this.webLayout;

    switch (size) {
      case 'XSmall':
        gridWidth = 100;
        gridHeight = 100;
        layout = this.phoneLayout;
        break;
      case 'Small':
        gridWidth = 90;
        gridHeight = 100;
        layout = this.phoneLayout;
        break;
      case 'Medium':
        gridWidth = 90;
        gridHeight = 70;
        layout = this.webLayout;
        break;
      case 'Large':
        gridWidth = 70;
        gridHeight = 70;
        layout = this.webLayout;
        break;
      default:
        gridWidth = 70;
        gridHeight = 70;
        layout = this.webLayout;
        break;
    }
    return { gridHeight, gridWidth, layout } as Layout;
  }
}
