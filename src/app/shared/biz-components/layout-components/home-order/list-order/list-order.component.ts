import { CommonModule } from '@angular/common';
import { Component, DestroyRef, Input, OnDestroy, computed, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Spot00101Service } from '@app/core/services/http/out/spot00101.service';
import { TOT010 } from '@app/model/tot-model/tot010_sts.model';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ListOrderService } from './list-order.service';
import { Router } from '@angular/router';
import { OrderService } from '@app/pages/out/spot00101/order.service';
import { MenuOrderService } from '../../layout-head-right-menu/menu-order.service';
import { CartService } from '@app/widget/biz-widget/out/product-list/cart.service';


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
  _listOrder = computed(() => this.listOrderService.listOrderNew());


  @Input()
  isNewOrder: boolean = false;


  newOrder() {
    this.spot00101Service.newOrder()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(res => {
      this.listOrderService.updateList(res.lstnewOd);
    })
  }

  setOrder(order: TOT010) {
    const defaultUrl = '/default/out/spot00101'
    this.menuorderService.update(false);
    console.log(this.menuorderService.isShowMenuOrder());
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
