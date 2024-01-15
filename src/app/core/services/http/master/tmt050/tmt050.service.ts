import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from '../../base-http.service';
import * as Const from 'src/app/common/const';
export interface Tmt050{
  RCDKBN: string,
  DATACD: string,
  DATANM: string,
  STRRSRV1: string,
  STRRSRV2: string,
  STRRSRV3: string,
  STRRSRV4: string,
  STRRSRV5: string,
  createdAt: Date,
  updatedAt: Date
}

@Injectable({
  providedIn: 'root'
})
export class Tmt050Service {
  http = inject(BaseHttpService);

  public listRcdkbn(rcdkbn: string): Observable<Tmt050[]> {
    return this.http.post(Const.Tmt050listRcdkbn,{RCDKBN:rcdkbn});
  }
}
