import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  pure: true,
  name: 'strToArray',
  standalone: true,
})
export class StrToArrayPipe implements PipeTransform {
  transform(value: string, separator: string): string[] {
    return value ? value.split(separator) : [];
  }
}
