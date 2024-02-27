import { CommonModule } from '@angular/common';
import { Component, DestroyRef, Input, OnDestroy, computed, inject, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Spot00101Service } from '@app/core/services/http/out/spot00101.service';
import { TOT010 } from '@app/model/tot-model/tot010_sts.model';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ListOrderService } from './list-order.service';
import { Router } from '@angular/router';
import { OrderService } from '@app/pages/out/spot00101/order.service';
import { MenuOrderService } from '../../layout-head-right-menu/menu-order.service';
import { CartService } from '@app/widget/biz-widget/out/product-list/cart.service';
import { NzMessageService } from 'ng-zorro-antd/message';


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
  orderService = inject(OrderService);
  router = inject(Router);
  listOrderService = inject(ListOrderService);
  destroyRef = inject(DestroyRef);
  private cartService = inject(CartService);
  private menuorderService = inject(MenuOrderService);
  private message = inject(NzMessageService);
  _listOrder = input([], {
    alias: 'lstOrder',
    transform: (_listOrder: TOT010[]) => _listOrder
  }) ;


  @Input()
  isNewOrder: boolean = false;

  totalNewOrder = computed(() => this.listOrderService.totalOrdernew());




  newOrder() {
    if(this.totalNewOrder() < 10) {
      this.spot00101Service.newOrder()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(res => {
        this.listOrderService.updateListNew(res.lstnewOd);
      })
    } else {
      this.message.info("Không được tạo quá 10 đơn hàng mới !")
    }
  }

  setOrder(order: TOT010) {
    const defaultUrl = '/default/out/spot00101'
    this.menuorderService.update(false);
    this.orderService.updateOrder(order);
    this.orderService.updateLocalStorageSelectedOD(order);
    this.cartService.refeshCart();
    let currentUrl = this.router.url;
    if(defaultUrl === currentUrl) {
      this.reloadCurrentRoute();
    } else {
      this.router.navigateByUrl(defaultUrl);
    }
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }

}
