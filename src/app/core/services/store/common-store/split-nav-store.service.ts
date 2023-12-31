import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Menu } from '../../types';

/**
 * Khi menu được tự động chia nhỏ, việc lưu trữ menu bên trái
 */
@Injectable({
  providedIn: 'root'
})
export class SplitNavStoreService {
  private splitLeftNavArray$ = new BehaviorSubject<Menu[]>([]);

  setSplitLeftNavArrayStore(menu: Menu[]): void {
    this.splitLeftNavArray$.next(menu);
  }

  getSplitLeftNavArrayStore(): Observable<Menu[]> {
    return this.splitLeftNavArray$.asObservable();
  }
}
