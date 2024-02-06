import { Injectable, inject } from '@angular/core';
import { BaseHttpService } from '../../base-http.service';
import { Observable } from 'rxjs';
import { TMT171 } from '@app/model/tmt-model/tmt171_paymethd.model';
import * as Const from '@app/common/const';
@Injectable({
  providedIn: 'root'
})
export class Tmt171Service {

  http = inject(BaseHttpService);

  constructor() { }

  public getListPaymethd() : Observable<TMT171[]> {
    return this.http.post(Const.Tmt171listpaymethd, {});
  }
}
