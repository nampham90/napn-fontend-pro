import { ChangeDetectorRef, Component, DestroyRef, OnInit, TemplateRef, ViewChild, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActionCode } from '@app/config/actionCode';
import { TIN040 } from '@app/model/tin-model/tin040_plantdl.model';
import { AntTableComponent, AntTableConfig } from '@app/shared/components/ant-table/ant-table.component';
import { CardTableWrapComponent } from '@app/shared/components/card-table-wrap/card-table-wrap.component';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Observable, finalize, of } from 'rxjs';
import { ListProductComponent } from './list-product/list-product.component';
import { Categorie } from '@app/model/product-model/categorie.model';
import { ProductcategoryService } from '@app/core/services/http/product/productcategory.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Spmt00101Service } from '@app/core/services/http/product/spmt00101.service';
import { SearchCommonVO } from '@app/core/services/types';
import { Product } from '@app/model/product.model';
import { NgClass } from '@angular/common';
import { ProductStoreService } from './product-store.service';
interface SearchParam {
  category_id: number;
  product_name: string;
}
@Component({
  selector: 'app-product-sub',
  standalone: true,
  imports: [  
    NzGridModule,
    NzCardModule,
    FormsModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzButtonModule,
    NzIconModule,
    CardTableWrapComponent,
    AntTableComponent,
    NzBadgeModule,
    ListProductComponent,
    NgClass
  ],
  templateUrl: './product-sub.component.html',
  styleUrl: './product-sub.component.less'
})
export class ProductSubComponent implements OnInit {

  // inject
  destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);
  readonly nzModalData: any = inject(NZ_MODAL_DATA);
  public message = inject(NzMessageService);
  private spmt00101Service = inject(Spmt00101Service);
  private productCategoriesService = inject(ProductcategoryService);
  private productStoreService = inject(ProductStoreService);

  dataList = signal<Product[]>([]);
  tableConfig!: AntTableConfig;
  checkedCashArray: Product[] = [];
  @ViewChild('operationTpl', { static: true }) operationTpl!: TemplateRef<NzSafeAny>;
  ActionCode = ActionCode;
  ishowCart = signal(false);
  searchParam = signal<Partial<SearchParam>>({});

  cartCount = computed(()=> this.productStoreService.products().length);
  lstCat = signal<Categorie[]>([]);

  constructor( private modalRef: NzModalRef) {}
  
  protected getAsyncFnData(modalValue: NzSafeAny): Observable<NzSafeAny> {
    return of(modalValue);
  }

  protected getCurrentValue(): Observable<NzSafeAny> {
    if(this.productStoreService.products().length ===0 ) {
      this.message.info("Vùi lòng thêm linh kiên !")
      return of(false);
    }
    return  of(this.productStoreService.products());
  }

  showcart(ishowCart: boolean) {
    this.ishowCart.set(!ishowCart);

  }

  resetForm() {
   
  }

  add() {
 
  }

  addCart(productcd: string) {
    let product = this.dataList().find(item => item.id === productcd);
    if(product) {
      product.isaddproduct = true;
      let tin040: TIN040 = {
        QTYCD: "01",
        SIPLNNO: "",
        ARVLPLNQTY: 1,
        ARVLPLNREMAINQTY: 0,
        GUARANTEQTY: 0,
        LIMITDATE: null,
        product: product,
        SIDTLREMARK: "",
        SIPRICE: 0,
        SODTLNO: 1
      }
      this.productStoreService.addProduct(tin040);
      setTimeout(() => {
        product!.isaddproduct = false
      }, 500);
    } else {
      this.message.error("Linh kiện không có trong danh sách !");
    }
  }

  ngOnInit(): void {
    this.initTable();
    this.apiProductCategories();
    this.searchParam.set({
      category_id: 3
   })
  }

  apiProductCategories() : void {
    this.productCategoriesService.category()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(res => {
      this.lstCat.set(res);
    })
  }

  getDataList(e?: NzTableQueryParams): void {
    const params: SearchCommonVO<any> = {
      pageSize: this.tableConfig.pageSize!,
      pageNum: e?.pageIndex || 1,
      filters: this.searchParam()
    };
    this.spmt00101Service.findCondition(params)
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
      this.checkedCashArray = [...this.checkedCashArray];
    })
  }

  
  tableLoading(isLoading: boolean): void {
    this.tableConfig.loading = isLoading;
    this.tableChangeDectction();
  }

  
  reloadTable(): void {
    this.message.info('Làm mới thành công');
    this.getDataList();
  }

  tableChangeDectction(): void {
    this.cdr.detectChanges();
  }

  changePageSize(e: number): void {
    this.tableConfig.pageSize = e;
  }


  private initTable(): void {
    this.tableConfig = {
      showCheckbox: false,
      headers: [
        {
          title: 'Mã sản phẩm',
          width: 100,
          field: 'id'
        },
        {
          title: 'Tên sản phẩm',
          width: 250,
          field: 'product_name'
        },
        {
          title: "Cập nhật",
          tdTemplate: this.operationTpl,
          width: 150,
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


