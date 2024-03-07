import { Injectable, computed, signal } from '@angular/core';
import { User } from '@app/core/services/http/system/account.service';

@Injectable({
  providedIn: 'root'
})
export class UserDetailService {

  userDetail = signal<User>({})

  phongban_id = computed(() => this.userDetail().phongban_id)

  constructor() { }
}
