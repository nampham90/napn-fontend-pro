import { Injectable, inject } from '@angular/core';
import { ModalWrapService } from '@app/widget/base-modal';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { ResultUserComponent } from './result-user.component';
import { Observable } from 'rxjs';
import { ModalOptions } from 'ng-zorro-antd/modal';

@Injectable({
  providedIn: 'root'
})
export class ResultUserService {
  private modalWrapService = inject(ModalWrapService);
  protected getContentComponent(): NzSafeAny {
    return ResultUserComponent;
  }

  public show(modalOptions: ModalOptions = {}, params?: object): Observable<NzSafeAny> {
    return this.modalWrapService.show(this.getContentComponent(), modalOptions, params);
  }
}
