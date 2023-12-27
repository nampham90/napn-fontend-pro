import { Injectable, inject } from '@angular/core';

import { NzIconService } from 'ng-zorro-antd/icon';

//Nhận thư viện biểu tượng Ali
@Injectable({
  providedIn: 'root'
})
export class LoadAliIconCdnService {
  private iconService = inject(NzIconService);
  load(): void {
    // Bạn phải truy cập trang web chính thức của Thư viện Biểu tượng Alibaba để tự tạo js này.
    this.iconService.fetchFromIconfont({
      scriptUrl: 'https://at.alicdn.com/t/font_3303907_htrdo3n69kc.js'
    });
  }
}
