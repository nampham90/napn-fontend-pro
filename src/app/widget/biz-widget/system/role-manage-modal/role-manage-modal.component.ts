import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { fnCheckForm } from '@utils/tools';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NZ_MODAL_DATA,NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-role-manage-modal',
  templateUrl: './role-manage-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FormsModule, NzFormModule, ReactiveFormsModule, NzGridModule, NzInputModule]
})
export class RoleManageModalComponent implements OnInit {
  addEditForm!: FormGroup;
  readonly nzModalData: object = inject(NZ_MODAL_DATA);
  params: object;
  private fb = inject(FormBuilder);
  constructor(private modalRef: NzModalRef) {
    this.params = {};
  }

  initForm(): void {
    this.addEditForm = this.fb.group({
      rolename: [null, [Validators.required]],
      mota: [null]
    });
  }

  // Phương pháp này là nếu có dữ liệu không đồng bộ cần được tải, hãy thêm nó vào phương thức này
  protected getAsyncFnData(modalValue: NzSafeAny): Observable<NzSafeAny> {
    return of(modalValue);
  }

  // Trả về false để không đóng hộp thoại
  protected getCurrentValue(): Observable<NzSafeAny> {
    if (!fnCheckForm(this.addEditForm)) {
      return of(false);
    }
    return of(this.addEditForm.value);
  }

  ngOnInit(): void {
    this.initForm();
    if (!!this.nzModalData) {
      this.addEditForm.patchValue(this.nzModalData);
    }
  }
}
