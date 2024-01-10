import { NgTemplateOutlet, NgIf } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, signal, inject, DestroyRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LoginInOutService } from '@core/services/common/login-in-out.service';
import { WindowService } from '@core/services/common/window.service';
import { AccountService, User, UserPsd } from '@services/system/account.service';
import { ScreenLessHiddenDirective } from '@shared/directives/screen-less-hidden.directive';
import { ToggleFullscreenDirective } from '@shared/directives/toggle-fullscreen.directive';
import { SpinService } from '@store/common-store/spin.service';
import { UserInfo, UserInfoService } from '@store/common-store/userInfo.service';
import { ModalBtnStatus } from '@widget/base-modal';
import { ChangePasswordService } from '@widget/biz-widget/change-password/change-password.service';
import { LockWidgetService } from '@widget/common-widget/lock-widget/lock-widget.service';
import { SearchRouteService } from '@widget/common-widget/search-route/search-route.service';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ModalOptions, NzModalService } from 'ng-zorro-antd/modal';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { HomeNoticeComponent } from '../home-notice/home-notice.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AvatarStoreService } from '@app/core/services/store/common-store/avatar-store.service';
import { window } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HomeOrderComponent } from "../home-order/home-order.component";

@Component({
    selector: 'app-layout-head-right-menu',
    templateUrl: './layout-head-right-menu.component.html',
    styleUrls: ['./layout-head-right-menu.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        NgTemplateOutlet,
        ScreenLessHiddenDirective,
        NzToolTipModule,
        NzIconModule,
        NzButtonModule,
        ToggleFullscreenDirective,
        NgIf,
        NzDropDownModule,
        NzBadgeModule,
        NzMenuModule,
        HomeNoticeComponent,
        TranslateModule,
        HomeOrderComponent
    ]
})
export class LayoutHeadRightMenuComponent implements OnInit {
  private router = inject(Router);
  private changePasswordModalService = inject(ChangePasswordService);
  private loginOutService = inject(LoginInOutService);
  private lockWidgetService = inject(LockWidgetService);
  private windowServe = inject(WindowService);
  private searchRouteService = inject(SearchRouteService);
  private message = inject(NzMessageService);
  private userInfoService = inject(UserInfoService);
  private accountService = inject(AccountService);

  private avatarService = inject(AvatarStoreService);
  public translate = inject(TranslateService);
  user!: UserPsd;
  userDetail!: UserInfo;
  totalNotifi = 0;
  linkavatar = signal("");
  destroyRef = inject(DestroyRef);
  User!: User
  constructor() {
    this.translate.setDefaultLang(localStorage.getItem('lang') || 'vi');
  }

  // Khóa màn hình
  lockScreen(): void {
    this.lockWidgetService
      .show({
        nzTitle: 'Khóa màn hình',
        nzStyle: { top: '25px' },
        nzWidth: '520px',
        nzFooter: null,
        nzMaskClosable: true
      })
      .subscribe();
  }

  // Thay đổi mật khẩu
  changePassWorld(): void {
    this.changePasswordModalService.show({ nzTitle: 'Thay đổi mật khẩu' }).subscribe(({ modalValue, status }) => {
      if (status === ModalBtnStatus.Cancel) {
        return;
      }
      this.userInfoService.getUserInfo().subscribe(res => {
        this.user = {
          id: res.userId,
          oldPassword: modalValue.oldPassword,
          newPassword: modalValue.newPassword
        };
      });
      this.accountService.editAccountPsd(this.user)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.loginOutService.loginOut().then();
          this.message.success('Sửa đổi thành công, vui lòng đăng nhập lại');
        });
    });
  }

  showSearchModal(): void {
    const modalOptions: ModalOptions = {
      nzClosable: false,
      nzMaskClosable: true,
      nzStyle: { top: '48px' },
      nzFooter: null,
      nzBodyStyle: { padding: '0' }
    };
    this.searchRouteService.show(modalOptions);
  }

  goLogin(): void {
    this.loginOutService.loginOut().then();
  }

  clean(): void {
    this.windowServe.clearStorage();
    this.windowServe.clearSessionStorage();
    this.loginOutService.loginOut().then();
    this.message.success('Xóa thành công, vui lòng đăng nhập lại');
  }

  isEn = false;
  isVi = true;
  isJa = false;

  showLang(lang: string): void {
     this.windowServe.setStorage('lang',lang);
     this.windowServe.reload();
     
  }

  goPage(path: string): void {
    this.router.navigateByUrl(`/default/page-demo/personal/${path}`);
  }

  lang!: string;
  ngOnInit(): void {
    this.lang = this.windowServe.getStorage('lang') || "en";
    this.configLang(this.lang);
    this.userInfoService.getUserInfo().subscribe(res => {
      this.userDetail = {
        userId: res.userId,
        authCode: [],
        username: res.username,
        email: res.email
      };
    });
    // get avatar
    this.avatarService.getAvatarStore()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(avatar=> {
      if(avatar) {
        this.linkavatar.set(avatar);
      } else {
        this.linkavatar.set('./assets/imgs/avatar.png');
      }
      
    })
  }

  configLang(lang:string) {
    switch(lang) {
      case "en" : {
        this.isEn = true;
        this.isJa = false;
        this.isVi = false;
      }; break;
      case "vi" : {
        this.isEn = false;
        this.isJa = false;
        this.isVi = true;
      }; break;
      case "ja" : {
        this.isEn = false;
        this.isJa = true;
        this.isVi = false;
      }; break;
    }
  }
}
