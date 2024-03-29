import { Injectable, inject, signal } from '@angular/core';
import { soodno } from '@app/config/constant';
import { WindowService } from '@app/core/services/common/window.service';
import { TOT010 } from '@app/model/tot-model/tot010_sts.model';
import { TOT040 } from '@app/model/tot-model/tot040_orddtl.model';
import { UserDetail } from './spot00101.component';
import { customer } from '@app/model/tot-model/tot020_ordhed.model';

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
      DELIMTHDCD: "",
      PAYMETHDCD: "",
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
      customer: null,
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

  updateCustomer(userDetail: UserDetail){
    let cust : customer = {
      name : userDetail.CSTNAME,
      dienthoai: userDetail.CSTMOBILE,
      email: userDetail.CSTEMAIL
    }
    this.order().tot020_ordhed.CSTMCD = userDetail.CSTMCD;
    this.order().tot020_ordhed.customer = cust;
  }

  updateListDetail(tot040: TOT040[]) {
     this.order().tot020_ordhed.tot040_orddtls = tot040;
  }

  constructor() { }
}
