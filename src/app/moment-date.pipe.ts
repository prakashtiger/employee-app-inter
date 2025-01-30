import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'momentDate',
  standalone: true
})
export class MomentDatePipe implements PipeTransform {

  transform(value: string | Date, format = 'D MMM YYYY'): unknown {
    return moment(value).format(format);
  }

}
