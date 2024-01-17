import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Tmt050, Tmt050Service } from '@app/core/services/http/master/tmt050/tmt050.service';
import { AbsComponent } from '@app/pages/system/abs.component';
import { PageHeaderComponent } from '@app/shared/components/page-header/page-header.component';
import { ModalBtnStatus } from '@app/widget/base-modal';
import { CartService } from '@app/widget/biz-widget/out/product-list/cart.service';
import { ProductListService } from '@app/widget/biz-widget/out/product-list/product-list.service';
import { ResultUserService } from '@app/widget/biz-widget/out/result-user/result-user.service';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-spot00101',
  standalone: true,
  imports: [PageHeaderComponent, NzButtonModule],
  templateUrl: './spot00101.component.html',
  styleUrl: './spot00101.component.less'
})
export class Spot00101Component extends AbsComponent{


  tmt050Service = inject(Tmt050Service);
  private productListService = inject(ProductListService);
  private resultUserService = inject(ResultUserService);

  listPaymeth = signal<Tmt050[]>([]);
  listDelimth = signal<Tmt050[]>([]);
  override destroyRef = inject(DestroyRef);

  private cartService = inject(CartService)

  override ngOnInit(): void {
    super.ngOnInit();
  }

  // hiển thị modal tìm kiếm sản phẩm
  showProdutList() {
     this.productListService.show({nzTitle: "Trong Kho", nzWidth: 1224},{showCart: true})
     .pipe(takeUntilDestroyed(this.destroyRef))
     .subscribe(
        res => {
          if (!res || res.status === ModalBtnStatus.Cancel) {
            this.cartService.cartItems.set([]);
            return;
          }
          console.log(res.modalValue);
        }
     )
  }

  // hiển thị modal tìm kiếm user
  resultUser() {
    this.resultUserService.show({nzTitle: "User Info", nzWidth: 1424}, {showcomfirm: false})
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(
      res => {
        if (!res || res.status === ModalBtnStatus.Cancel) {
          return;
        }
        console.log(res.modalValue);
      }
    )
  }

}
