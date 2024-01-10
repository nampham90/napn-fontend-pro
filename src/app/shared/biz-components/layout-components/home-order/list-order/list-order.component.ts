import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';

export interface Order {
  soodno : string;// mã hóa đơn
  createdate: Date;// ngay tao
  qtests: boolean; // trang thai bao gia
  ordsts: boolean;// trang thai dat hang
  ordappsts: boolean; // trạng thái duyệt đơn hàng
  paysts: boolean; // trạng thái thanh toán
  shipsts: boolean;// trạng thái xuất hàng
  cstmcd: string; // mã khác hàng
  cstmmn: string; // ten khách hàng
}

@Component({
  selector: 'app-list-order',
  standalone: true,
  imports: [ NzIconModule, CommonModule],
  templateUrl: './list-order.component.html',
  styleUrl: './list-order.component.less'
})
export class ListOrderComponent {
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

}
