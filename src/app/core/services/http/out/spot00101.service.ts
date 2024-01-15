import { Injectable, inject } from '@angular/core';
import { BaseHttpService } from '../base-http.service';
import { Observable } from 'rxjs';
import { TST010_STCK } from '@app/model/tst010_stck.model';
import { PageInfo, SearchCommonVO } from '../../types';
import * as Const from '@app/common/const'

@Injectable({
  providedIn: 'root'
})
export class Spot00101Service {

  http = inject(BaseHttpService)

  constructor() { }


}
