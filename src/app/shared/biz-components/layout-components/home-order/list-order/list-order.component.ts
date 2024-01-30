import { CommonModule } from '@angular/common';
import { Component, DestroyRef, Input, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Spot00101Service } from '@app/core/services/http/out/spot00101.service';
import { NzIconModule } from 'ng-zorro-antd/icon';

export interface Order {
  soodno : string;// mã hóa đơn
  createdate: Date;// ngay tao
  qtests: boolean; // trang thai bao gia
  ordsts: boolean;// trang thai dat hang
  ordappsts: boolean; // trạng thái duyệt đơn hàng
  paysts: boolean; // trạng thái thanh toán
  shipsts: boolean;// trạng thái xuất hàng
  cstmcd: string | null; // mã khác hàng
  cstmmn: string | null; // ten khách hàng
}

@Component({
  selector: 'app-list-order',
  standalone: true,
  imports: [ NzIconModule, CommonModule],
  templateUrl: './list-order.component.html',
  styleUrl: './list-order.component.less'
})
export class ListOrderComponent {
  spot00101Service = inject(Spot00101Service);
  destroyRef = inject(DestroyRef);
  _listOrder: Order[] = [];

  @Input()
  get listOrder() {
     return this._listOrder;
  }

  set listOrder(listOrder: Order[]) {
     this._listOrder = listOrder;
  }

  @Input()
  isNewOrder: boolean = false;


  newOrder() {
    this.spot00101Service.newOrder()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(res => {
      console.log(res);
    })
  }

}
