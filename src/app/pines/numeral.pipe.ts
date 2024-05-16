import { Pipe, PipeTransform } from '@angular/core';
import numeral from 'numeral';

@Pipe({
  name: 'numeral',
})
export class NumeralPipe implements PipeTransform {
  transform(value: any, format: string = '0,0a'): string {
    return numeral(value).format(format);
  }
}
