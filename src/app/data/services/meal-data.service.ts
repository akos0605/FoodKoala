import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Observable,
  Subject,
  catchError,
  map,
  of,
  shareReplay,
  startWith,
  switchMap,
} from 'rxjs';
import { MealResponseMapperService } from 'src/app/core/services/meal-response-mapper.service';
import { MealFilter, MealFilterType } from 'src/app/data/types/meal-filter.model';
import { MealResponse } from 'src/app/data/types/meal-response.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class MealDataService {
  constructor(
    private readonly http: HttpClient,
    private readonly httpMapper: MealResponseMapperService
  ) {}

  private url = environment.mealDbUrl;

  private mealFilterActionSubject = new Subject<MealFilter>();
  mealFilterAction$ = this.mealFilterActionSubject.asObservable();

  /**
   * List of meals filtered by the filter
   */
  meals$ = this.mealFilterAction$.pipe(
    startWith({ type: 'first letter', value: 'a' } as MealFilter),
    switchMap(this.createRequest.bind(this)),
    catchError(err => of([])),
    map((meals: MealResponse[]) => meals.map(this.httpMapper.mapMeal))
  );

  getMealById(id: string) {
    return this.http.get(this.url + 'lookup.php?i=' + id).pipe(
      map((resp: any) => resp.meals[0]),
      this.httpMapper.mapMealOperator,
      catchError(err => of(null))
    );
  }

  /**
   * Emit a random meal
   */
  randomMeal$ = this.http.get(this.url + 'random.php').pipe(
    map((resp: any) => resp.meals[0]),
    this.httpMapper.mapMealOperator
  );

  private mapFilterType = (key: string) => {
    return (source: Observable<any>): Observable<string[]> => {
      return source.pipe(
        map((resp: any) => resp.meals),
        map(resp => resp.map((x: any) => x[key])),
        shareReplay(1)
      );
    };
  };

  /**
   * Emit a list of all categories
   */
  allCategory$ = this.http
    .get(this.url + 'list.php?c=list')
    .pipe(this.mapFilterType('strCategory'));

  /**
   * Emit a list of all areas
   */
  allArea$ = this.http
    .get(this.url + 'list.php?a=list')
    .pipe(this.mapFilterType('strArea'));

  /**
   * Emit a list of all ingredients
   */
  allIngredient$ = this.http
    .get(this.url + 'list.php?i=list')
    .pipe(this.mapFilterType('strIngredient'));

  /**
   * Change the filter of the meals
   * @param type MealFilterType
   * @param value value of the filter
   */
  changeFilter(type: MealFilterType, value: string) {
    this.mealFilterActionSubject.next({ type, value });
  }

  /**
   * Create a request based on the MealFilter
   */
  private createRequest({ type, value }: MealFilter) {
    let url = this.url;
    let param = '';
    switch (type) {
      case 'first letter':
        url += 'search.php';
        param = 'f';
        break;
      case 'category':
        url += 'filter.php';
        param = 'c';
        break;
      case 'area':
        url += 'filter.php';
        param = 'a';
        break;
      case 'main ingredient':
        url += 'filter.php';
        param = 'i';
        break;
    }
    const options = { params: new HttpParams().set(param, value) };
    return this.http.get(url, options).pipe(map((resp: any) => resp.meals));
  }
}
