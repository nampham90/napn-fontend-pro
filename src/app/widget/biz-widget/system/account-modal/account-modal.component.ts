import { NgIf, NgFor } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { OptionsInterface } from '@core/services/types';
import { ValidatorsService } from '@core/services/validators/validators.service';
import { AccountService, User } from '@services/system/account.service';
import { DeptService } from '@services/system/dept.service';
import { RoleService } from '@services/system/role.service';
import { fnCheckForm } from '@utils/tools';
import { fnAddTreeDataGradeAndLeaf, fnFlatDataHasParentToTree } from '@utils/treeTableTools';
import { NzTreeNodeOptions } from 'ng-zorro-antd/core/tree';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NZ_MODAL_DATA,NzModalRef } from 'ng-zorro-antd/modal';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { ValidationFormService } from '@app/core/services/common/message-errors.service';

@Component({
  selector: 'app-account-modal',
  templateUrl: './account-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FormsModule, NzFormModule, ReactiveFormsModule, NzGridModule, NzInputModule, NgIf, NzRadioModule, NzSwitchModule, NzTreeSelectModule, NzSelectModule, NgFor]
})
export class AccountModalComponent implements OnInit {
  addEditForm!: FormGroup;
  params!: User;
  readonly nzModalData: User = inject(NZ_MODAL_DATA);
  roleOptions: OptionsInterface[] = [];
  isEdit = false;
  value?: string;
  deptNodes: NzTreeNodeOptions[] = [];

  isReadonly = false;
  messageErrors: any = [];

  listDept: any = [];
  listRole: any = [];

  private fb = inject(FormBuilder); 
  private validatorsService = inject(ValidatorsService); 
  private accountService = inject(AccountService);
  private roleService = inject(RoleService); 
  private vf = inject(ValidationFormService);
  private deptService = inject(DeptService)

  constructor(private modalRef: NzModalRef) {}

  protected getAsyncFnData(modalValue: NzSafeAny): Observable<NzSafeAny> {
    return of(modalValue);
  }

  protected getCurrentValue(): Observable<NzSafeAny> {
    if (!fnCheckForm(this.addEditForm)) {
      return of(false);
    }
    console.log(this.addEditForm.value);
    return of(this.addEditForm.value);
  }

  getRoleList(): Promise<void> {
    return new Promise<void>(resolve => {
      this.roleService.getRoles({ pageNum: 0, pageSize: 0 }).subscribe(({ list }) => {
        this.roleOptions = [];
        list.forEach(({ id, rolename }) => {
          const obj: OptionsInterface = {
            label: rolename,
            value: id!
          };
          this.roleOptions.push(obj);
        });
        resolve();
      });
    });
  }

  getDeptList(): Promise<void> {
    return new Promise<void>(resolve => {
      this.deptService.getDepts({ pageNum: 1, pageSize: 10  }).subscribe(({ list }) => {
        list.forEach(item => {
          // @ts-ignore
          item.title = item.tenphongban;
          // @ts-ignore
          item.key = item.id;
        });

        const target = fnAddTreeDataGradeAndLeaf(fnFlatDataHasParentToTree(list));
        this.deptNodes = target;
        resolve();
      });
    });
  }

  initForm(): void {
    this.addEditForm = this.fb.group({
      name: [null, [Validators.required]],
      password: ['a123456', [Validators.required, this.validatorsService.passwordValidator()]],
      sex: [1],
      available: [true],
      // zalo: [null, [this.validatorsService.mobileValidator()]],
      dienthoai: [null, [this.validatorsService.mobileValidator()]],
      email: [null, [this.validatorsService.emailValidator()]],
      role_id: [null, [Validators.required]],
      phongban_id: [null, [Validators.required]],
    });
  }

  get f():{ [key: string]: AbstractControl } {
    return this.addEditForm.controls;
  }

  async ngOnInit(): Promise<void> {
    this.initForm();
    this.isEdit = !!this.nzModalData.id;
    await Promise.all([this.getRoleList(), this.getDeptList()]);
    if (this.isEdit) {
      this.addEditForm.patchValue(this.nzModalData);
      this.addEditForm.controls['password'].disable();
      this.isReadonly = !this.isReadonly;
    }
  }

  checkEmail(email: string) {
    if(!email) {
      this.addEditForm.controls['email'].setErrors({'message': this.vf.errorMessages.email.required});
    } else {
      this.accountService.checkEmail(email).subscribe(check =>{
        if(check) {
           this.addEditForm.controls['email'].setErrors({'message': this.vf.errorMessages.email.emaildb});
        }
      })
    }

  }

  checkName(name: string) {
    if(!name) {
      this.addEditForm.controls['name'].setErrors({'message': this.vf.errorMessages.name.required});
    } else {
      this.accountService.checkName(name).subscribe(check => {
        if(check) {
          this.addEditForm.controls['name'].setErrors({'message': this.vf.errorMessages.name.namedb});
        }
      })
    }

  }
}
