import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';

@Injectable()
export class CustomDateAdapter extends NativeDateAdapter {
  // Override `format` method to display date in DD/MM/YYYY format
  override format(date: Date, displayFormat: object): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  // Override `parse` method to correctly parse DD/MM/YYYY format
  override parse(value: any): Date | null {
    if (typeof value === 'string' && value.length === 10) {
      const [day, month, year] = value.split('/').map(Number);
      return new Date(year, month - 1, day);
    }
    return super.parse(value);
  }
}
