import { Injectable, computed, signal } from '@angular/core';
import { TOT010 } from '@app/model/tot-model/tot010_sts.model';

@Injectable({
  providedIn: 'root'
})
export class ListOrderService {

  listOrderNew = signal<TOT010[]>([]);

  totalOrdernew = computed(() => this.listOrderNew().length);


  updateList(list: TOT010[]) {
    this.listOrderNew.set(list);
  }




  

  constructor() { }
}
