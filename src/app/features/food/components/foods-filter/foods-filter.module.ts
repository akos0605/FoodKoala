import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodsFilterComponent } from 'src/app/features/food/components/foods-filter/foods-filter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { NgLetModule } from 'ng-let';

@NgModule({
  declarations: [FoodsFilterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCardModule,
    NgLetModule,
  ],
  exports: [FoodsFilterComponent],
})
export class FoodsFilterModule {}
