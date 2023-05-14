import { Ingredient } from 'src/app/data/types/ingredient.model';

export interface Meal {
  dateModified: any;
  idMeal: string;
  ingredients: Ingredient[];
  strArea: string;
  strCategory: string;
  strCreativeCommonsConfirmed?: any;
  strDrinkAlternate: any;
  strImageSource?: any;
  strInstructions: string;
  strMeal: string;
  strMealThumb: string;
  strSource?: string;
  strTags: any;
  strYoutube?: string;
  price?: number;
}
