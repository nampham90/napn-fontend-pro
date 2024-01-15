import { Injectable, signal } from '@angular/core';
import { DataScObj } from '@app/core/services/http/system/datasc.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  cartItems = signal<DataScObj[]>([]);

  // add to cart
  addToCart(item: DataScObj) : void {
    this.cartItems.update(items => [...items, item]);
  }

  // remove the item from the cart
  removeFromCart(cartItem: DataScObj) : void {
    this.cartItems.update(items =>  items.filter(item => item.vitri !== cartItem.vitri));
  }

  // update in cart
  updateInCart(cartItem: DataScObj) : void {
    this.cartItems.update(items => 
       items.map(item => item.vitri === cartItem.vitri ? cartItem : item)  
    )
  }
}
