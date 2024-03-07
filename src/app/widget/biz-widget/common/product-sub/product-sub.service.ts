import { Injectable, inject } from '@angular/core';
import { ProductSubComponent } from './product-sub.component';
import { ModalWrapService } from '@app/widget/base-modal';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { ModalOptions } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductSubService {

  private modalWrapService = inject(ModalWrapService);

  protected getContentComponent(): NzSafeAny {
    return ProductSubComponent;
  }

  public show(modalOptions: ModalOptions = {}, params?: object): Observable<NzSafeAny> {
    return this.modalWrapService.show(this.getContentComponent(), modalOptions, params);
  }
}
