import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { LoginType } from '@app/pages/other-login/login1/login1.component';

// Đây là cửa hàng lưu trữ login1, thuộc về cửa hàng doanh nghiệp
@Injectable({
  providedIn: 'root'
})
export class Login1StoreService {
  private loginType$ = new BehaviorSubject<LoginType>(LoginType.Normal);
  private isLogin1OverModel$ = new BehaviorSubject<boolean>(false);

  setLoginTypeStore(type: LoginType): void {
    this.loginType$.next(type);
  }

  getLoginTypeStore(): Observable<LoginType> {
    return this.loginType$.asObservable();
  }

  setIsLogin1OverModelStore(type: boolean): void {
    this.isLogin1OverModel$.next(type);
  }

  getIsLogin1OverModelStore(): Observable<boolean> {
    return this.isLogin1OverModel$.asObservable();
  }
}
