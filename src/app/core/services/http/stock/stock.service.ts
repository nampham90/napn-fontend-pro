import { Injectable, inject } from '@angular/core';
import { BaseHttpService } from '../base-http.service';
import { TST010_STCK } from '@app/model/tst010_stck.model';
import { Observable } from 'rxjs';
import { SearchCommonVO, PageInfo } from '../../types';
import * as Const from '@app/common/const'
@Injectable({
  providedIn: 'root'
})
export class StockService {
  http = inject(BaseHttpService);

  constructor() { }

  findAllStck(parmas: SearchCommonVO<any>): Observable<PageInfo<TST010_STCK>> {
    return this.http.post(Const.StockListProduct, parmas);
  }
}
