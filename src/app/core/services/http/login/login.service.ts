import { Inject, Injectable, inject } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

// import { MENU_TOKEN } from '@config/menu';
import { Menu } from '@core/services/types';
import { BaseHttpService } from '@services/base-http.service';
import { MenusService } from '@services/system/menus.service';
import * as Const from '@app/common/const'
export interface UserLogin {
  name: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  http = inject(BaseHttpService);

  public login(params: UserLogin): Observable<string> {
    return this.http.post(Const.Ant100UserLogin, params, { needSuccessInfo: false });
  }

  public getMenuByUserId(): Observable<Menu[]> {
    return this.http.post(Const.Ant100UserGetMenu,  { needSuccessInfo: false });
  }
}
