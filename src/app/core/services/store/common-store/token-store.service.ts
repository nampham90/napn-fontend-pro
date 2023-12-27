import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenStoreService {

  private globalToken$ = new BehaviorSubject<string>('');

  setGlobalTokenStore(token: string):void {
    this.globalToken$.next(token);
  }


  getGlobalTokenStore():Observable<string> {
    return this.globalToken$.asObservable();
  }
}
