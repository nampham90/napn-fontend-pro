import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Tmt050, Tmt050Service } from '@app/core/services/http/master/tmt050/tmt050.service';
import { AbsComponent } from '@app/pages/system/abs.component';
import { PageHeaderComponent } from '@app/shared/components/page-header/page-header.component';
import { ModalBtnStatus } from '@app/widget/base-modal';
import { ProductListService } from '@app/widget/biz-widget/out/product-list/product-list.service';
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

  listPaymeth = signal<Tmt050[]>([]);
  listDelimth = signal<Tmt050[]>([]);
  override destroyRef = inject(DestroyRef);

  override ngOnInit(): void {
    super.ngOnInit();
  }

  showProdutList() {
     this.productListService.show({nzTitle: "Danh sách sản phẩm", nzWidth: 1024},{showCart: true})
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
