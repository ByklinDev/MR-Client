import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mrPatientStatusPipe',
})
export class MrPatientStatusPipe implements PipeTransform {
  transform(value: number | string): string {
    if (typeof value === 'string') {
      value = parseInt(value, 10);
    }
    switch (value) {
      case 1:
        return 'Screened';
      case 2:
        return 'Randomized';
      case 3:
        return 'Finished';
      default:
        return 'FinishedEarly';
    }
  }
}
