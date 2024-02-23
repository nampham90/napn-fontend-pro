import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import * as Const from '@app/common/const';
import { Categorie } from '@app/model/product-model/categorie.model';
import { BaseHttpService } from '../base-http.service';
@Injectable({
  providedIn: 'root'
})
export class ProductcategoryService {

  http = inject(BaseHttpService);

  constructor() { }

  category(): Observable<Categorie[]> {
    return this.http.post(Const.ProductCategogy, {}, {needSuccessInfo: false});
  }
}
