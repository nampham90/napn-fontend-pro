import { NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, DestroyRef, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '@app/core/services/http/master/api/api.service';
import { User } from '@app/core/services/http/system/account.service';
import { AvatarStoreService } from '@app/core/services/store/common-store/avatar-store.service';
import { UserInfo } from '@app/core/services/store/common-store/userInfo.service';
import { ValidatorsService } from '@app/core/services/validators/validators.service';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzUploadChangeParam, NzUploadModule } from 'ng-zorro-antd/upload';
import { BreakpointObserver } from '@angular/cdk/layout';
import * as Const from '@app/common/const';
import { fnCheckForm } from '@app/utils/tools';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-nhacungcap',
  standalone: true,
  imports: [
    NzGridModule,
    FormsModule,
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    NzSelectModule,
    NzButtonModule,
    NzWaveModule,
    NgClass,
    NzAvatarModule,
    NzUploadModule,
    NzIconModule
  ],
  templateUrl: './nhacungcap.component.html',
  styleUrl: './nhacungcap.component.less'
})
export class NhacungcapComponent {
  private fb = inject(FormBuilder); 
  private msg = inject(NzMessageService); 
  private apiService = inject(ApiService);
  private avatarService = inject(AvatarStoreService);
  private cdr = inject(ChangeDetectorRef);
  private validatorsService = inject(ValidatorsService);
  private breakpointObserver = inject(BreakpointObserver);  
  destroyRef = inject(DestroyRef);
  constructor( private modalRef: NzModalRef,){}
  validateForm!: FormGroup;
  selectedProvince = 1;
  selectedCity = 1;
  provinceData: any[] = [];
  formOrder = 1;
  avatarOrder = 0;
  cityData: any[] = [];
  url: string = "";
  serverurl:string = "";

  userDetail!: UserInfo;
  User!: User
  linkavatar = signal("");

  provinceChange(code: number): void {
    this.cityData = this.getCity(code);
    this.selectedProvince = code;
    this.validateForm.get('city')?.setValue(this.cityData);
  }

  getCity(code: any) {
    let lst : any;
    for(let element of this.provinceData) {
       if(element['code'] == code) {
          lst = element['districts'];
          break;
       }
    }
    return lst;
  }

  initForm(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      mobile: [null, [Validators.required, this.validatorsService.mobileValidator()]],
      email: [null],
      desc: [null],
      area: [null, [Validators.required]],
      city: [null, [Validators.required]],
      province: [null, [Validators.required]],
      street: [null, [Validators.required]],
      phongban_id: Const.kythuatcd,
      role_id: [2],
      password: 'a123456',
    });
  }

  submitForm(): void {
    if (!fnCheckForm(this.validateForm)) {
      return;
    }
  }

  handleChange(info: NzUploadChangeParam): void {
    if (info.file.status !== 'uploading') {
    }
    if (info.file.status === 'done') {
     // this.setAvatar();
    } else if (info.file.status === 'error') {
      this.msg.error(`${info.file.name} file upload failed.`);
    }
  }

  obBreakPoint(): void {
    this.breakpointObserver
      .observe(['(max-width: 1200px)'])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(result => {
        if (result.matches) {
          this.formOrder = 1;
          this.avatarOrder = 0;
        } else {
          this.formOrder = 0;
          this.avatarOrder = 1;
        }
        this.cdr.markForCheck();
      });
  }

  getListProvinces() {
      this.apiService.provincesApi()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(res => {
         this.provinceData = res.data;
      })
  }

  ngOnInit(): void {
    this.initForm();
    this.getListProvinces();
    this.obBreakPoint();
    this.avatarService.getAvatarStore()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(avatar => {
       if(avatar) {
         this.linkavatar.set(avatar);
       } else {
         this.linkavatar.set('./assets/imgs/avatar.png');
       }
       
    })
  }
}
