import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'shortNumber' })
export class ShortNumberPipe implements PipeTransform {

  private powers = [
    { key: 'B', value: Math.pow(10, 9) },
    { key: 'M', value: Math.pow(10, 6) },
    { key: 'K', value: 1000 }
  ];

  transform(value: number): string | null {
    if (isNaN(value) || value === null) {
      return null;
    }
    const rounder = 10;
    let key = '';

    for (let i = 0; i < this.powers.length; i++) {
      let reduced = value / this.powers[i].value;
      reduced = Math.round(reduced * rounder) / rounder;
      if (reduced >= 1) {
        value = reduced;
        key = this.powers[i].key;
        break;
      }
    }

    return value + key;
  }

}
