import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidationFormService } from '@app/core/services/common/message-errors.service';
import { DataScObj } from '@app/core/services/http/system/datasc.service';
import { OptionsInterface } from '@app/core/services/types';
import { fnCheckForm } from '@app/utils/tools';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-datasc-modal',
  templateUrl: './datasc-modal.component.html',
  styleUrls: ['./datasc-modal.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FormsModule, NzFormModule, NzButtonModule, ReactiveFormsModule, NgIf, NgFor, NzSelectModule, NzInputNumberModule, NzInputModule
  ]
})
export class DatascModalComponent implements OnInit{
  readonly nzModalData: DataScObj = inject(NZ_MODAL_DATA);
  addEditForm!: FormGroup;
  params!: DataScObj;
  isEdit = false;
  value?: string;

  isReadonly = false;
  messageErrors: any = [];
  lang : OptionsInterface[] = [
];
  menuName = "";
  listdatasc : DataScObj[] = [];
  tieudeNew = "";

  showBtnAddList = false;
  private fb = inject(FormBuilder);
  public vf = inject(ValidationFormService);
  public message = inject(NzMessageService);
  constructor(
    private modalRef: NzModalRef) {
    this.lang = [
      {
        value: 'vi',
        label: 'Tiếng việt'
      },
      {
        value: 'en',
        label: 'Tiếng Anh'
      },
      {
        value: 'ja',
        label: 'Tiếng Nhật'
      },
    ]
  }

  protected getAsyncFnData(modalValue: NzSafeAny): Observable<NzSafeAny> {
    return of(modalValue);
  }

  protected getCurrentValue(): Observable<NzSafeAny> {
    this.addEditForm.value.list = this.listdatasc;
    return of(this.addEditForm.value);
  }

  get f():{ [key: string]: AbstractControl } {
    return this.addEditForm.controls;
  }

  ngOnInit(): void {
    this.initForm();
    this.isEdit = !!this.nzModalData;
    if (this.isEdit) {
      if(this.nzModalData._id) {
          this.isEdit = true;
          this.addEditForm.patchValue(this.nzModalData);
          this.showBtnAddList = true;
      }
    }
  }

  addList() {
    if (!fnCheckForm(this.addEditForm)) {
      return of(false);
    }
    let obj : DataScObj = {
      idmenu: this.nzModalData.idmenu,
      title1: this.addEditForm.value.title1,
      title2:  this.addEditForm.value.title2,
      lang: this.addEditForm.value.lang,
      vitri: this.addEditForm.value.vitri,
      status:  this.addEditForm.value.status
    }
    this.listdatasc.push(obj);
    this.tieudeNew = obj.title1;
    this.addEditForm.reset({status: true});
    return "";
  }

  initForm(): void {
    this.addEditForm = this.fb.group({
      title1: [null, [Validators.required]],
      title2: [null],
      status: [true],
      lang: ['vi', [Validators.required]],
      vitri: [null],
      list: this.listdatasc
    });
  }

}
