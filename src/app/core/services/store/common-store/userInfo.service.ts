import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { JwtHelperService } from '@auth0/angular-jwt';

export interface UserInfo {
  userId: string;
  username: string;
  authCode: string[];
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  private userInfo$ = new BehaviorSubject<UserInfo>({ userId: '-1',username: '-1', authCode: [], email: '-1'});

  constructor() {}

  parsToken(token: string): UserInfo {
    const helper = new JwtHelperService();
    try {
      console.log(token);
      const { userId, username, roles, permission } = helper.decodeToken(token);
      return {
        userId,
        username: username,
        authCode: permission.split(','),
        email: '-1',
  
      };
    } catch (e) {
      return {
        userId: '-1',
        authCode: [],
        username: '-1',
        email: '-1',
      };
    }
  }

  setUserInfo(userInfo: UserInfo): void {
    this.userInfo$.next(userInfo);
  }

  getUserInfo(): Observable<UserInfo> {
    return this.userInfo$.asObservable();
  }
}
