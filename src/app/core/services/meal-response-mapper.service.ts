import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Ingredient } from 'src/app/data/types/ingredient.model';
import { MealResponse } from 'src/app/data/types/meal-response.model';
import { Meal } from 'src/app/data/types/meal.model';

@Injectable({
  providedIn: 'root',
})
export class MealResponseMapperService {
  constructor() {}

  mapMeal = (meal: MealResponse): Meal => {
    return {
      idMeal: meal.idMeal,
      strMeal: meal.strMeal,
      strDrinkAlternate: meal.strDrinkAlternate,
      strCategory: meal.strCategory,
      strArea: meal.strArea,
      strInstructions: meal.strInstructions,
      strMealThumb: meal.strMealThumb,
      strTags: meal.strTags,
      strYoutube: meal.strYoutube,
      strSource: meal.strSource,
      strImageSource: meal.strImageSource,
      strCreativeCommonsConfirmed: meal.strCreativeCommonsConfirmed,
      dateModified: meal.dateModified,
      ingredients: this.mapIngredients(meal),
      // genearate a price deterministically based on the idMeal
      price: Math.round((+meal.idMeal % 5000) / 100) * 100,
    };
  };

  mapIngredients(meal: MealResponse): Ingredient[] {
    const mealKeyValues = Object.entries(meal);

    const ingredients = mealKeyValues
      .filter(([key, value]) => key.includes('strIngredient') && value)
      .map(([_, value]) => value);

    const measures = mealKeyValues
      .filter(([key, value]) => key.includes('strMeasure') && value)
      .map(([_, value]) => value);

    return ingredients.map(
      (ingredient, index) =>
        ({
          ingredient: ingredient,
          measure: measures[index],
        } as Ingredient)
    );
  }

  mapMealOperator = (source: Observable<MealResponse>): Observable<Meal> => {
    return source.pipe(map(this.mapMeal));
  };
}
