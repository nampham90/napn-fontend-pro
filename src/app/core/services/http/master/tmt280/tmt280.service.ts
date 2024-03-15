import { Injectable, inject } from '@angular/core';
import { BaseHttpService } from '../../base-http.service';
import { Observable } from 'rxjs';
import * as Const from '@app/common/const';
import { TMT280 } from '@app/model/tmt-model/tmt280_div.model';

@Injectable({
  providedIn: 'root'
})
export class Tmt280Service {
  http = inject(BaseHttpService);
  constructor() { }

  getListDivKbn(): Observable<TMT280[]> {
    return this.http.post(Const.Tmt280listdivkbn,{},{needSuccessInfo: false});
  }
  
}
