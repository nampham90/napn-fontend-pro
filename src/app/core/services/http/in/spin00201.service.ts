import { Injectable, inject } from '@angular/core';
import { BaseHttpService } from '../base-http.service';
import { PageInfo, SearchCommonVO } from '../../types';
import { Observable } from 'rxjs';
import { TIN020 } from '@app/model/tin-model/tin020_planhed.model';
import * as Const from '@app/common/const';
@Injectable({
  providedIn: 'root'
})
export class Spin00201Service {
  http = inject(BaseHttpService)


  findConditon(param: SearchCommonVO<any>) : Observable<PageInfo<TIN020[]>> {
    return this.http.post(Const.Spin00201FindCondition, param, {needSuccessInfo:false});
  }

  constructor() { }
}
