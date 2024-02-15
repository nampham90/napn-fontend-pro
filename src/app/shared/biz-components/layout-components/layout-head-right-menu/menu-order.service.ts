import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuOrderService {

  isShowMenuOrder = signal(true);

  update(ishow:boolean) {
    this.isShowMenuOrder.set(ishow);
  }

  constructor() { }
}
