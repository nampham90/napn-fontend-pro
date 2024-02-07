import { Injectable, inject, signal } from '@angular/core';
import { soodno } from '@app/config/constant';
import { WindowService } from '@app/core/services/common/window.service';
import { TOT010 } from '@app/model/tot-model/tot010_sts.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  windownService = inject(WindowService)

  order = signal<TOT010>({
    SOODNO: "",
    QTESTS: false,
    ORDSTS: false,
    ORDAPPSTS: false,
    PAYSTS: false,
    SHIPSTS: false,
    RSLTSENDFLG: false,
    SOCNCLORDFLG: false,
    SOCNCLCOMPFLG: false,
    EXCHANGEFLG: false,
    EXCHANGECOMPFLG: false,
    STSNM: "",
    tot020_ordhed: {
      SOODNO: "",
      CSTMCD: "",
      DELIMTHDCD: "0002",
      PAYMETHDCD: "02",
      DELIPLNDATE: null,
      ORDERDATE: null,
      PAYOFDATE: null,
      SHIPDATE: null,
      SOPLNDATE: null,
      DEPOSIT: 0,
      PACKQTY: 0,
      INSTALLFEE: 0,
      ODDISCONT: 0,
      TAX: 0,
      POSTPAIDFLG: false,
      SOREMARK: "",
      USERCD: "",
      tot040_orddtls: [],
      createdAt: null,
      updatedAt: null,
    },
    createdAt: null,
    updatedAt: null
  })

  updateOrder(order: TOT010) {
    this.order.set(order);
  }

  updateDelimthd(delimthd: string) {
    this.order().tot020_ordhed.DELIMTHDCD = delimthd;
  }

  updateLocalStorageSelectedOD(od: TOT010) {
    this.windownService.setStorage(soodno, JSON.stringify(od));
  }

  updateCSTMCD(cstmcd: string) {
     this.order().tot020_ordhed.CSTMCD = cstmcd;
  }

  constructor() { }
}
