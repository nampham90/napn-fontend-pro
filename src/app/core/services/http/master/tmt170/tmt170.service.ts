import { Injectable, inject } from '@angular/core';
import { BaseHttpService } from '../../base-http.service';
import { Observable } from 'rxjs';
import * as Const from 'src/app/common/const';
export interface Delimth{
  delimthcd: string;
  delimthnm: string;
}

@Injectable({
  providedIn: 'root'
})
export class Tmt170Service {
  http = inject(BaseHttpService);

  public listDelimthcd(): Observable<Delimth[]> {
    return this.http.post(Const.Tmt170listdelimthcd,{}, {needSuccessInfo: true});
  }
}
