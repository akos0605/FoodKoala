import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, debounceTime, finalize, of, startWith, tap } from 'rxjs';
import { MealDataService } from 'src/app/data/services/meal-data.service';
import { MealFilter, MealFilterType } from 'src/app/data/types/meal-filter.model';

@Component({
  selector: 'app-foods-filter',
  templateUrl: './foods-filter.component.html',
  styleUrls: ['./foods-filter.component.scss'],
})
export class FoodsFilterComponent implements OnInit {
  constructor(
    private readonly mealData: MealDataService,
    private readonly fb: FormBuilder
  ) {}

  @Output() filterChange = new EventEmitter<MealFilter>();

  filterTypes: MealFilterType[] = ['first letter', 'category', 'area', 'main ingredient'];
  filterValues$ = new Observable<string[]>();
  filterForm = this.fb.group({
    filterType: ['first letter', Validators.required],
    filterValue: ['A', Validators.required],
  });

  alphabet = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];

  ngOnInit(): void {
    this.filterForm.valueChanges
      .pipe(startWith(this.filterForm.value))
      .subscribe(form => {
        this.setFilterValues(form.filterType as MealFilterType);
      });
  }

  /**
   * Set the filter values observable based on the filter type.
   */
  setFilterValues(type: MealFilterType) {
    let values$ = of([] as string[]);
    switch (type) {
      case 'first letter':
        values$ = of(this.alphabet);
        break;
      case 'category':
        values$ = this.mealData.allCategory$;
        break;
      case 'area':
        values$ = this.mealData.allArea$;
        break;
      case 'main ingredient':
        values$ = this.mealData.allIngredient$;
        break;
    }

    //need to wait for the values of mat select to be updated before emitting the filter change
    this.filterValues$ = values$.pipe(
      finalize(() => {
        const value = this.filterForm.get('filterValue')?.value;
        this.filterChange.emit({ type: type as MealFilterType, value: value! });
      })
    );
  }
}
