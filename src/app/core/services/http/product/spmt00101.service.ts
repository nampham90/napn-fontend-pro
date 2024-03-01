import { Injectable, inject } from '@angular/core';
import { BaseHttpService } from '../base-http.service';
import { PageInfo, SearchCommonVO } from '../../types';
import { Observable } from 'rxjs';
import { Product } from '@app/model/product.model';
import * as Const from '@app/common/const';
@Injectable({
  providedIn: 'root'
})
export class Spmt00101Service {
  http = inject(BaseHttpService);

  constructor() { }

  public findCondition(params: SearchCommonVO<any>): Observable<PageInfo<Product>> {
    return this.http.post(Const.Spmt00101FindCondition, params, {needSuccessInfo: false});
  }

  public add(param: Product): Observable<any> {
    return this.http.post(Const.Spmt00101AddNew, param, {needSuccessInfo: true});
  }

  public edit(param: Product): Observable<any> {
    return this.http.post(Const.Spmt00101Edit, param, {needSuccessInfo: true});
  }
}
