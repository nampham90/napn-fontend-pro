import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Tmt050, Tmt050Service } from '@app/core/services/http/master/tmt050/tmt050.service';
import { AbsComponent } from '@app/pages/system/abs.component';
import { PageHeaderComponent } from '@app/shared/components/page-header/page-header.component';
import { ModalBtnStatus } from '@app/widget/base-modal';
import { CartService } from '@app/widget/biz-widget/out/product-list/cart.service';
import { ProductListService } from '@app/widget/biz-widget/out/product-list/product-list.service';
import { ResultUserService } from '@app/widget/biz-widget/out/result-user/result-user.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
interface Spot00101Header {
  SOODNO: string;
  PAYMETHDCD: string;// ngày phat hành
  DELIMTHDCD: string;
  ORDERDATE: string;
  SOREMARK: string;
  CSTMCD: string; // ma khach hang
}

@Component({
  selector: 'app-spot00101',
  standalone: true,
  imports: [PageHeaderComponent, FormsModule , NzInputModule, NzFormModule, NzGridModule, NzButtonModule, NzTabsModule, NzCardModule],
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

  header: Partial<Spot00101Header>  = {}

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
