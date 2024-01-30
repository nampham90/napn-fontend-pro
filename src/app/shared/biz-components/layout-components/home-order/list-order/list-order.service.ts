import { Injectable, signal } from '@angular/core';
import { Order } from './list-order.component';

@Injectable({
  providedIn: 'root'
})
export class ListOrderService {

  listOrder = signal<Order[]>([]);


  

  constructor() { }
}
