import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import * as Const from 'src/app/common/const';

import { PageInfo, SearchCommonVO } from '../../types';
import { BaseHttpService } from '../base-http.service';
/*
 *  Quản lý vai trò
 * */
export interface Dept {
  id?: string;
  department_name: string;
  father_id: string;
  state: 1 | 0;
  order_num: number;
  title?: string;
  key?: string;
  value?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DeptService {
  constructor(public http: BaseHttpService) {}

  public getDepts(param: SearchCommonVO<Dept>): Observable<PageInfo<Dept>> {
    return this.http.post(Const.Ant100getAllPhongban, param);
  }

  public getDeptsDetail(id: any): Observable<Dept> {
    return this.http.post(Const.Ant100getIdPhongban, { id: id }, { needSuccessInfo: true });
  }

  public addDepts(param: Dept): Observable<void> {
    return this.http.post(Const.Ant100addPhongban, param);
  }

  public delDepts(ids: number[]): Observable<void> {
    return this.http.post('/department/del/', { ids });
  }

  public editDepts(param: Dept): Observable<void> {
    return this.http.put(Const.Ant100editPhongban, param);
  }
}
