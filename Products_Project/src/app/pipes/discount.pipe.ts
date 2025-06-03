import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount',
  standalone: true
})
export class DiscountPipe implements PipeTransform {
  transform(price: number, discountPercentage: number): number {
    if (!discountPercentage || discountPercentage <= 0) {
      return price;
    }

    // Calculate the discounted price
    const discountAmount = (price * discountPercentage) / 100;
    const discountedPrice = price - discountAmount;

    // Return the price with 2 decimal places
    return Math.round(discountedPrice * 100) / 100;
  }
}
