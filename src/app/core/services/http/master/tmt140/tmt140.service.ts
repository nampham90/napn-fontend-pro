import { Injectable, inject } from '@angular/core';
import { BaseHttpService } from '../../base-http.service';
import { Observable } from 'rxjs';
import * as Const from '@app/common/const';
import { TMT140 } from '@app/model/tmt-model/tmt140_qualitie.model';
@Injectable({
  providedIn: 'root'
})
export class Tmt140Service {

  http = inject(BaseHttpService);

  constructor() { }

  listQualities(): Observable<TMT140[]> {
    return this.http.post(Const.Tmt140listqualities, {}, {needSuccessInfo: false});
  }
}
