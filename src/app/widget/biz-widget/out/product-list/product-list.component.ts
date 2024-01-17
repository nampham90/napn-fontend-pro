import { ChangeDetectorRef, Component, DestroyRef, OnInit, TemplateRef, ViewChild, computed, inject, signal } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { AntTableConfig, AntTableComponent } from '@app/shared/components/ant-table/ant-table.component';
import { fnCheckForm } from '@app/utils/tools';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { Observable, finalize, of } from 'rxjs';
import { ActionCode } from '@app/config/actionCode';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CardTableWrapComponent } from "../../../../shared/components/card-table-wrap/card-table-wrap.component";
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { StockService } from '@app/core/services/http/stock/stock.service';
import { SearchCommonVO } from '@app/core/services/types';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TST010_STCK } from '@app/model/tst010_stck.model';
import { CommonModule } from '@angular/common';
import { CartService } from './cart.service';
import { rollOutAnimation } from 'angular-animations';
import { ListCartComponent } from "./list-cart/list-cart.component";
import { CartItem } from './model/Cart';
interface SearchParam {
  CATCD: string; // danh mục san phẩm
  QTYCD: string; // chât lượng sản phẩm
  SUPPLYCD: string; // hãng
  MANUFACTTURECD: string; // nhà cũng cấp
}
@Component({
    selector: 'app-product-list',
    standalone: true,
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.less',
    animations: [rollOutAnimation()],
    imports: [NzGridModule, NzCardModule, FormsModule, NzFormModule,
        NzSelectModule,
        NzButtonModule,
        NzBadgeModule,
        CommonModule,
        NzIconModule, CardTableWrapComponent, AntTableComponent, ListCartComponent]
})
export class ProductListComponent implements OnInit {
  readonly nzModalData: any = inject(NZ_MODAL_DATA);
  ishowCart = signal(false);
  tableConfig!: AntTableConfig;
  dataList = signal<TST010_STCK[]>([]);
  ActionCode = ActionCode;
  public message = inject(NzMessageService);
  destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);
  private stockService = inject(StockService);
  private cartService = inject(CartService);
  constructor(private modalRef: NzModalRef) {}
  addEditForm!: FormGroup;
  searchParam: Partial<SearchParam> = {};
  qtycds = signal([]);
  catcds = signal([]);
  manufcds = signal([]);
  supplycds = signal([]);
  isAddtocart = signal(false);

  animationState = false;

  cartCount = computed(() => this.cartService.cartItems().length)

  @ViewChild('operationTpl', { static: true }) operationTpl!: TemplateRef<any>;
  @ViewChild('productnameTpl', { static: true }) productnameTpl!: TemplateRef<any>;
  @ViewChild('sellpirceTpl', { static: true }) sellpirceTpl!: TemplateRef<any>;
  @ViewChild('imageTpl', { static: true }) imageTpl!: TemplateRef<any>;

  protected getAsyncFnData(modalValue: CartItem[] | boolean): Observable<CartItem[]|boolean> {
    return of(modalValue);
  }

  protected getCurrentValue(): Observable<CartItem[] | boolean> {
    if(this.cartService.cartItems().length === 0) {
      this.message.info("Vùi lòng thêm sản phẩm vào giỏ hàng !")
      return of(false);
    }
    return of(this.cartService.cartItems());
  }

  ngOnInit(): void {
    this.initTable();
  
  }

  getDataList(e?: NzTableQueryParams): void{
    const params: SearchCommonVO<any> = {
       pageSize: this.tableConfig.pageSize,
       pageNum:  e?.pageIndex || this.tableConfig.pageIndex!,
       filters: this.searchParam
    }

    this.stockService.findAllStck(params)
    .pipe(
      finalize(() => {
        this.tableLoading(false);
      }),
      takeUntilDestroyed(this.destroyRef)
    )
    .subscribe(data => {
      const { list, total, pageNum } = data;
      this.dataList.set(list);
      this.tableConfig.total = total!;
      this.tableConfig.pageIndex = pageNum!;
      this.tableLoading(false);
    })
  }

  removeCart() {
    
  }

  addCart(productcd: string) {
    let item = this.dataList().find(product => product.PRODUCTCD === productcd);

    this.cartService.addToCart(item!);
    
    if(item) {
      item.ISADDTOCART = true;
          setTimeout(() => {
            item!.ISADDTOCART = false
      }, 1000);
    }

    console.log(this.cartService.cartItems());
  }

  resetForm(): void {}

  showcart(ishowCart: boolean) {
     this.ishowCart.set(!ishowCart);
  }

  // Phát hiện thay đổi bảng kích hoạt
  tableChangeDectction(): void {
    // Thay đổi tham chiếu sẽ kích hoạt phát hiện thay đổi.
  //  this.dataList = [...this.dataList];
    this.cdr.detectChanges();
  }

  tableLoading(isLoading: boolean): void {
    this.tableConfig.loading = isLoading;
    this.tableChangeDectction();
  }

  reloadTable(): void {
    this.message.info('Làm mới thành công');
    this.getDataList();
  }

  changePageSize(e: number): void {
    this.tableConfig.pageSize = e;
  }

  private initTable(): void {
    this.tableConfig = {
      showCheckbox: false,
      headers: [
        {
          title: 'Hình ảnh',
          field: 'IMAGE',
          tdTemplate: this.imageTpl,
          width: 60
        },
        {
          title: 'Tên sản phẩm',
          field: 'prodname',
          tdTemplate: this.productnameTpl,
          width: 300
        },
        {
          title: 'Số lượng',
          field: 'TOTALALLWQTY',
          width: 80
        },
        {
          title: 'Đơn giá',
          field: 'SELLPIRCE',
          tdTemplate: this.sellpirceTpl,
          width: 120
        },
        {
          title: 'Ngày hết hạn',
          field: 'LIMITDATE',
          pipe: 'date: dd/MM/yyyy',
          width: 120
        },
        {
          title: 'Thêm vào giỏ hàng',
          tdTemplate: this.operationTpl,
          width: 120,
          fixed: true,
          fixedDir: 'right'
        }
      ],
      total: 0,
      loading: true,
      pageSize: 10,
      pageIndex: 1
    }
  }


   

}
