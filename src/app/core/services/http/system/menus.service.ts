import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Menu, PageInfo, SearchCommonVO } from '@core/services/types';
import { BaseHttpService } from '@services/base-http.service';
import * as Const from 'src/app/common/const';

export interface MenuListObj {
  menuName: string;
  code: string;
  alIcon: string;
  icon: string;
  orderNum: number;
  menuType: 'C' | 'F'; // c: menu，f nút
  path: string;
  visible: 0 | 1;
  status: boolean;
  newLinkFlag: 0 | 1;
}

export interface DatascObj {
  stt: number;
  title1: string;
  title2: string;
  idyoutube: string;
}

@Injectable({
  providedIn: 'root'
})
export class MenusService {
  http = inject(BaseHttpService);

  public getMenuList(param: SearchCommonVO<any>): Observable<PageInfo<Menu>> {
    return this.http.post(Const.Ant100ListMenu, param);
  }

  public getMenuListParams(param: SearchCommonVO<any>): Observable<PageInfo<Menu>> {
    return this.http.post(Const.Ant100ListMenuParams, param);
  }

  public addMenus(param: MenuListObj): Observable<void> {
    return this.http.post(Const.Ant100AddMenu, param, { needSuccessInfo: true });
  }

  public editMenus(param: MenuListObj): Observable<void> {
    return this.http.put(Const.Ant100EditMenu, param, { needSuccessInfo: true });
  }

  public delMenus(id: any): Observable<any> {
    return this.http.post(Const.Ant100DelMenu, { ids: [id] }, { needSuccessInfo: true });
  }

  public getMenuDetail(id: any): Observable<MenuListObj> {
    return this.http.post(Const.Ant100PostDetailMenu, { menuId: id }, { needSuccessInfo: true });
  }

  public getMenuDetailFromUrl(url: string): Observable<DatascObj[]> {
    return this.http.post(Const.Ant100PostUrlParams, { url: url }, { needSuccessInfo: true });
  }
}
