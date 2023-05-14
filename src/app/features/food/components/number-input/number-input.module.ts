import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberInputComponent } from 'src/app/features/food/components/number-input/number-input.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [NumberInputComponent],
  imports: [CommonModule, MatIconModule],
  exports: [NumberInputComponent],
})
export class NumberInputModule {}
