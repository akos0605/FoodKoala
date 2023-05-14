import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: NumberInputComponent,
    },
  ],
})
export class NumberInputComponent implements ControlValueAccessor {
  @Output() numChange = new EventEmitter<number>();
  @Input() num = 1;
  touched = false;
  disabled = false;

  onChange = (num: number) => {
    this.numChange.emit(num);
  };
  onTouched = () => {};

  writeValue(num: number): void {
    this.num = num;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onAdd() {
    if (this.disabled) return;
    this.markAsTouched();
    this.num++;
    this.onChange(this.num);
  }

  onSubstract() {
    if (this.disabled || this.num === 1) return;
    this.markAsTouched();
    this.num--;
    this.onChange(this.num);
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  reset() {
    this.num = 1;
  }
}
