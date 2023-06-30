import { Inject, Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

// import { MENU_TOKEN } from '@config/menu';
import { Menu } from '@core/services/types';
import { BaseHttpService } from '@services/base-http.service';
import { MenusService } from '@services/system/menus.service';

export interface UserLogin {
  name: string;
  password: string;
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

  public login(params: UserLogin): Observable<string> {
    return this.http.post('user/login', params, { needSuccessInfo: false });
  }

  public getMenuByUserId(userId: string): Observable<Menu[]> {
    return this.http.get(`user/menu`);
  }
}
