import { Injectable, inject } from '@angular/core';
import { BaseHttpService } from '../base-http.service';
import { Observable } from 'rxjs';
import { TST010_STCK } from '@app/model/tst010_stck.model';
import { PageInfo, SearchCommonVO } from '../../types';
import * as Const from '@app/common/const'
import { Order } from '@app/shared/biz-components/layout-components/home-order/list-order/list-order.component';
import { TOT010 } from '@app/model/tot-model/tot010_sts.model';

interface ObjectOrder {
  lstnewOd: TOT010[];
  lstQTESTS:TOT010[];
  lstORDSTS: TOT010[];
  lstORDAPPSTS: TOT010[];
  lstPAYSTS: TOT010[];
  lstSHIPSTS: TOT010[];
}

@Injectable({
  providedIn: 'root'
})
export class Spot00101Service {

  http = inject(BaseHttpService)

  constructor() { }

  public newOrder():  Observable<ObjectOrder> {
    return this.http.post(Const.Spot00101NewOrder, {});
  }

  public orderStatus(): Observable<ObjectOrder> {
    return this.http.post(Const.Spot00101OrderStatus, {});
  }

  public updateOD(od: TOT010) : Observable<string> {
    return this.http.post(Const.Spot00101UpdateOrder, {order: od}, {needSuccessInfo: true})
  }

  public inbaogia(od: TOT010): Observable<any> {
    return this.http.downLoadWithBlob(Const.ReportInbaogia, {order: od}, {needSuccessInfo: false})
  }


}
