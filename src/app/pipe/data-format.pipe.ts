import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataFormat'
})
export class DataFormatPipe extends DatePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return super.transform(value, 'MM/dd/yyyy');
  }

}
