import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, effect, inject, signal } from '@angular/core';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { Observable, of } from 'rxjs';
import { AccountComponent } from "../../../../pages/system/account/account.component";
import { SearchUserComponent } from "./search-user/search-user.component";
import { AddUserComponent } from "./add-user/add-user.component";
import { UserDetailService } from './user-detail.service';
import { ThemeSkinService } from '@app/core/services/common/theme-skin.service';

@Component({
    selector: 'app-result-user',
    standalone: true,
    templateUrl: './result-user.component.html',
    styleUrl: './result-user.component.less',
    imports: [NzBadgeModule,
        CommonModule,
        NzIconModule, AccountComponent, SearchUserComponent, AddUserComponent]
})
export class ResultUserComponent implements OnInit{

  readonly nzModalData: any = inject(NZ_MODAL_DATA);
  userDetailService = inject(UserDetailService);

  ishowPlus = signal(false);

  searchDepartment = computed(() => this.nzModalData.department)


  constructor(private modalRef: NzModalRef) {}
  
  ngOnInit(): void {
    
  }

  protected getAsyncFnData(modalValue: NzSafeAny): Observable<NzSafeAny> {
    return of(modalValue);
  }

  protected getCurrentValue(): Observable<NzSafeAny> {
    if(this.userDetailService.userDetail()){
      return of(false);
    } 
    return  of(this.userDetailService.userDetail());
  }

  showPlus(ishow: boolean): void {
    this.ishowPlus.set(!ishow);
  }

}
