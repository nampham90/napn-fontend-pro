import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { ModalWrapService } from '@widget/base-modal';

import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { ModalOptions } from 'ng-zorro-antd/modal';
import { HuongdanModalComponent } from './huongdan-modal.component';


@Injectable({
  providedIn: 'root'
})
export class HuongdanModalService {
  private modalWrapService = inject(ModalWrapService);
  protected getContentComponent(): NzSafeAny {
    return HuongdanModalComponent;
  }

  public show(modalOptions: ModalOptions = {}, params?: object): Observable<NzSafeAny> {
    return this.modalWrapService.show(this.getContentComponent(), modalOptions, params);
  }
}