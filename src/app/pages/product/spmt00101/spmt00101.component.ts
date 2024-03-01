import { Component, OnInit , ChangeDetectionStrategy, signal, inject, TemplateRef, ViewChild} from '@angular/core';
import { AbsComponent } from '@app/pages/system/abs.component';
import { PageHeaderComponent, PageHeaderType } from '@app/shared/components/page-header/page-header.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule } from '@angular/forms';
import { Categorie } from '@app/model/product-model/categorie.model';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { Product } from '@app/model/product.model';
import { ActionCode } from '@app/config/actionCode';
import { AntTableConfig, AntTableComponent } from '@app/shared/components/ant-table/ant-table.component';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { OptionsInterface, SearchCommonVO } from '@app/core/services/types';
import { CardTableWrapComponent } from "../../../shared/components/card-table-wrap/card-table-wrap.component";
import { ProductcategoryService } from '@app/core/services/http/product/productcategory.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Spmt00101Service } from '@app/core/services/http/product/spmt00101.service';
import { finalize } from 'rxjs';
import { AuthDirective } from '@app/shared/directives/auth.directive';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Spmt00101ModalService } from '@app/widget/biz-widget/product/spmt00101-modal/spmt00101-modal.service';
import { ModalBtnStatus } from '@app/widget/base-modal';
interface SearchParam {
  category_id: number;
  product_name: string;
}
@Component({
    selector: 'app-spmt00101',
    templateUrl: './spmt00101.component.html',
    styleUrls: ['./spmt00101.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [PageHeaderComponent,
        NzCardModule,
        NzGridModule,
        NzFormModule,
        FormsModule,
        NzSelectModule,
        NzInputModule,
        AuthDirective,
        NzIconModule,
        NzButtonModule, CardTableWrapComponent, AntTableComponent]
})
export class Spmt00101Component extends AbsComponent implements OnInit{
  // inject
  public message = inject(NzMessageService);
  private productCategoriesService = inject(ProductcategoryService);
  private spmt00101Service = inject(Spmt00101Service);
  private spmt00101ModalService = inject(Spmt00101ModalService)

  // avalble
  searchParam = signal<Partial<SearchParam>>({});
  lstCat = signal<Categorie[]>([]);

  // table process
  tableConfig!: AntTableConfig;
  ActionCode = ActionCode;
  dataList = signal<Product[]>([]);
  checkedCashArray: Product[] = [];
  visibleOptions: OptionsInterface[] = [];

  @ViewChild('operationTpl', { static: true }) operationTpl!: TemplateRef<NzSafeAny>;


  getDataList(e?: NzTableQueryParams): void {
    const params: SearchCommonVO<any> = {
      pageSize: this.tableConfig.pageSize!,
      pageNum: e?.pageIndex || this.tableConfig.pageIndex!,
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

  tableChangeDectction(): void {
    this.cdr.detectChanges();
  }

  tableLoading(isLoading: boolean): void {
    this.tableConfig.loading = isLoading;
    this.tableChangeDectction();
  }

  changePageSize(e: number): void {
    this.tableConfig.pageSize = e;
  }

  selectedChecked(e: any[]): void {
    this.checkedCashArray = [...e];
  }

  reloadTable(): void {
    this.message.info('Làm mới thành công');
    this.getDataList();
  }

  
  resetForm(): void {}

  add(): void{
    this.spmt00101ModalService
    .show({nzTitle: "Thêm mới"})
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(
      res => {
        if(!res || res.status === ModalBtnStatus.Cancel) {return;}
        this.tableLoading(true);
        this.addEditData(res.modalValue, 'add');
      },
      error => this.tableLoading(false)
    )
  }

  addEditData(param: Product,  methodName: 'edit' | 'add') : void {
    this.spmt00101Service[methodName](param)
        .pipe(
          finalize(() => {
            this.tableLoading(false);
          }),
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe(() => {
          this.getDataList();
        })
  }

  apiProductCategories() : void {
    this.productCategoriesService.category()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(res => {
      this.lstCat.set(res);
    })
  }


  override ngOnInit(): void {
    super.ngOnInit();
    this.initTable();
    this.searchParam.set({
       category_id: 3
    })
    this.apiProductCategories();
  }

  private initTable(): void {
    this.tableConfig = {
      showCheckbox: false,
      headers: [
        {
          title: 'Mã sản phẩm',
          field: 'id',
          width: 120
        },
        {
          title: 'Tên sản phảm',
          field: 'product_name',
          width: 250
        },
        {
          title: "Cập nhật",
          tdTemplate: this.operationTpl,
          width: 250,
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
