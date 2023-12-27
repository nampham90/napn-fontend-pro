import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Menu } from '@core/services/types';

// dịch vụ lưu trữ thực đơn
@Injectable({
  providedIn: 'root'
})
export class MenuStoreService {
  private menuArray$ = new BehaviorSubject<Menu[]>([]);

  setMenuArrayStore(menuArray: Menu[]): void {
    this.menuArray$.next(menuArray);
  }

  getMenuArrayStore(): Observable<Menu[]> {
    return this.menuArray$.asObservable();
  }
}
