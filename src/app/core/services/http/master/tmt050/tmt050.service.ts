import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from '../../base-http.service';
import * as Const from 'src/app/common/const';
export interface Paymeth{
  paymethcd: string;
  paymethnm: string;
}

@Injectable({
  providedIn: 'root'
})
export class Tmt050Service {
  http = inject(BaseHttpService);

  public listPaymethcd(): Observable<Paymeth[]> {
    return this.http.post(Const.Tmt050listpaymethcd,{});
  }
}
