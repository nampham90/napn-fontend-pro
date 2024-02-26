import { Injectable, computed, signal } from '@angular/core';
import { TOT010 } from '@app/model/tot-model/tot010_sts.model';

@Injectable({
  providedIn: 'root'
})
export class ListOrderService {

  listOrderNew = signal<TOT010[]>([]);
  totalOrdernew = computed(() => this.listOrderNew().length);
  updateListNew(list: TOT010[]) {
    this.listOrderNew.set(list);
  }

  listOrderQTESTS = signal<TOT010[]>([]);
  totalOrderQTESTS = computed(() => this.listOrderQTESTS().length);
  updateListQTESTS(list: TOT010[]) {
    this.listOrderQTESTS.set(list);
  }

  listOrderORDSTS = signal<TOT010[]>([]);
  totalOrderORDSTS = computed(() => this.listOrderORDSTS().length);
  updateListORDSTS(list: TOT010[]) {
    this.listOrderORDSTS.set(list);
  }

  listOrderORDAPPSTS = signal<TOT010[]>([]);
  totalOrderORDAPPSTS = computed(() => this.listOrderORDAPPSTS().length);
  updateListORDAPPSTS(list: TOT010[]) {
    this.listOrderORDAPPSTS.set(list);
  }

  listOrderPAYSTS = signal<TOT010[]>([]);
  totalOrderPAYSTS = computed(() => this.listOrderPAYSTS().length);
  updateListPAYSTS(list: TOT010[]) {
    this.listOrderORDAPPSTS.set(list);
  }

  listOrderSHIPSTS = signal<TOT010[]>([]);
  totalOrderSHIPSTS = computed(() => this.listOrderSHIPSTS().length);
  updateListSHIPSTS(list: TOT010[]) {
    this.listOrderSHIPSTS.set(list);
  }


  constructor() { }
}
