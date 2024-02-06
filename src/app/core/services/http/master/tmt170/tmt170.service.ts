import { Injectable, inject } from '@angular/core';
import { BaseHttpService } from '../../base-http.service';
import { Observable } from 'rxjs';
import { TMT170 } from '@app/model/tmt-model/tmt170_delimthd.model';
import * as Const from '@app/common/const';
@Injectable({
  providedIn: 'root'
})
export class Tmt170Service {

  http = inject(BaseHttpService);

  constructor() { }

  public getListDelimthd() : Observable<TMT170[]> {
    return this.http.post(Const.Tmt170listdelimthd, {});
  }
}
