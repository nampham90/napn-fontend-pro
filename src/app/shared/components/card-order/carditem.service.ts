import { Injectable, signal } from '@angular/core';
import { CardItem } from './card-order.component';

@Injectable({
  providedIn: 'root'
})
export class CarditemService {

  constructor() { }

  cartItem = signal<CardItem[]>([]);

  addTocard(item: CardItem) : void {
    this.cartItem.update(items => [...items, item]);
  }

  remove(cItem: CardItem): void {
    this.cartItem.update(items => 
      items.filter(item=> item.soOD !== cItem.soOD));
  }

  update(cItem: CardItem): void {
    this.cartItem.update(items => 
      items.map(item => item.soOD === cItem.soOD ? cItem : item));
  }
}
