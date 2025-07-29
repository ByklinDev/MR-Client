import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mrPatientSex',
})
export class MrPatientSexPipe implements PipeTransform {
  transform(value: number | string): string {
    if (typeof value === 'string') {
      value = parseInt(value, 10);
    }
    switch (value) {
      case 1:
        return 'Male';
      case 2:
        return 'Female';
      default:
        return '';
    }
  }
}
