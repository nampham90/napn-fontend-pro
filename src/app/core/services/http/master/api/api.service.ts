import { Injectable, inject } from '@angular/core';
import { BaseHttpService } from '../../base-http.service';
import { Observable } from 'rxjs';
import * as Const from 'src/app/common/const';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  http = inject(BaseHttpService);

  constructor() { }

  public  provincesApi(): Observable<any> {
     return this.http.post(Const.Apiprovinces);
  }
}
