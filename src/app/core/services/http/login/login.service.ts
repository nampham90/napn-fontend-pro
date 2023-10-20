import { Inject, Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

// import { MENU_TOKEN } from '@config/menu';
import { Menu } from '@core/services/types';
import { BaseHttpService } from '@services/base-http.service';
import { MenusService } from '@services/system/menus.service';
import * as Const from '@app/common/const';

export interface UserLogin {
  name?: string;
  email: string;
  mobile?: string;
  password: string;
}

export interface Params {
   pageNum?: number;
   pageSize?: number;
   filters: UserLogin;
}

export interface ParamsUP {
   filters: {}
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    public http: BaseHttpService,
    // @Inject(MENU_TOKEN) public menus: Menu[],
    private menuService: MenusService
  ) {}

  public login(params: Params): Observable<string> {
    return this.http.post(Const.Ant100UserLogin, params, { needSuccessInfo: false });
  }

  public getMenuByUserId(params: ParamsUP): Observable<Menu[]> {
    return this.http.post(Const.Ant100UserPermission,params, { needSuccessInfo: false });
  }
}
