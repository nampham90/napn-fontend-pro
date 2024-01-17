import { Injectable, signal } from '@angular/core';
import { User } from '@app/core/services/http/system/account.service';

@Injectable({
  providedIn: 'root'
})
export class UserDetailService {

  userDetail = signal<User>({})

  constructor() { }
}
