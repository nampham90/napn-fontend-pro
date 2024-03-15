import { Injectable, inject } from '@angular/core';
import { BaseHttpService } from '../base-http.service';
import { TIN020 } from '@app/model/tin-model/tin020_planhed.model';
import { Observable } from 'rxjs';
import * as Const from '@app/common/const'
@Injectable({
  providedIn: 'root'
})
export class Spin00101Service {

  http = inject(BaseHttpService);

  create(tin020: TIN020) : Observable<TIN020> {
    return this.http.post(Const.Spin00101Create, tin020, {needSuccessInfo: true});
  }
  
  constructor() { }
}
