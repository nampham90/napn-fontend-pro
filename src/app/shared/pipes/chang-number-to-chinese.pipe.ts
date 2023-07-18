import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'changNumberToChinese',
  standalone: true
})
export class ChangNumberToChinesePipe implements PipeTransform {
  transform(value: number): string {
    switch (value) {
      case 1:
        return '2';
      case 2:
        return '3';
      case 3:
        return '4';
      case 4:
        return '5';
      case 5:
        return '6';
      case 6:
        return '7';
      case 7:
        return 'CN';
      case 8:
        return '八';
      case 9:
        return '九';
      case 10:
        return '十';
      default:
        return '';
    }
  }
}
