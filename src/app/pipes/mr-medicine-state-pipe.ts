import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mrMedicineState',
})
export class MrMedicineStatePipe implements PipeTransform {
  transform(value: number | string): string {
    if (typeof value === 'string') {
      value = parseInt(value, 10);
    }
    switch (value) {
      case 1:
        return 'Ok';
      case 2:
        return 'Damaged';
      case 3:
        return 'Lost';
      default:
        return 'Unknown State';
    }
  }
}
