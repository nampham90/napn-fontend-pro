import { ChangeDetectorRef, Component, DestroyRef, OnInit, TemplateRef, ViewChild, inject, signal } from '@angular/core';
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
import { Observable, of } from 'rxjs';
import { ActionCode } from '@app/config/actionCode';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CardTableWrapComponent } from "../../../../shared/components/card-table-wrap/card-table-wrap.component";
import { NzBadgeModule } from 'ng-zorro-antd/badge';
interface SearchParam {
  catcd: string; // danh mục san phẩm
  qtycd: string; // chât lượng sản phẩm
  manufcd: string; // hãng
  supplycd: string; // nhà cũng cấp
}
@Component({
    selector: 'app-product-list',
    standalone: true,
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.less',
    imports: [NzGridModule, NzCardModule, FormsModule, NzFormModule,
        NzSelectModule,
        NzButtonModule,
        NzBadgeModule,
        NzIconModule, CardTableWrapComponent, AntTableComponent]
})
export class ProductListComponent implements OnInit {
  readonly nzModalData: any = inject(NZ_MODAL_DATA);
  ishowCart = signal(false);
  tableConfig!: AntTableConfig;
  dataList: any[] = [];
  ActionCode = ActionCode;
  public message = inject(NzMessageService);
  destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);
  constructor(private modalRef: NzModalRef) {}
  addEditForm!: FormGroup;
  searchParam: Partial<SearchParam> = {};
  qtycds = signal([]);
  catcds = signal([]);
  manufcds = signal([]);
  supplycds = signal([]);

  @ViewChild('operationTpl', { static: true }) operationTpl!: TemplateRef<any>;

  protected getAsyncFnData(modalValue: NzSafeAny): Observable<NzSafeAny> {
    return of(modalValue);
  }

  protected getCurrentValue(): Observable<NzSafeAny> {
    if (!fnCheckForm(this.addEditForm)) {
      return of(false);
    }
    return of(this.addEditForm.value);
  }

  ngOnInit(): void {
    this.initTable();
  
  }

  getDataList(e?: NzTableQueryParams): void{
    this.tableLoading(false);
  }

  removeCart(sericd: string) {
    
  }

  addCart(sericd: string) {
    
  }

  resetForm(): void {}

  showcart(ishowCart: boolean) {
     this.ishowCart.set(!ishowCart);
  }

  // Phát hiện thay đổi bảng kích hoạt
  tableChangeDectction(): void {
    // Thay đổi tham chiếu sẽ kích hoạt phát hiện thay đổi.
    this.dataList = [...this.dataList];
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
          title: '',
          field: 'img',
          width: 120
        },
        {
          title: 'Tên sản phẩm',
          field: 'prodname',
          width: 300
        },
        {
          title: 'Số lượng',
          field: 'quantity',
          width: 120
        },
        {
          title: 'Giá',
          field: 'price',
          width: 120
        },
        {
          title: 'Ngày hết hạn',
          field: 'expdate',
          width: 120
        },
        {
          title: 'Cập nhật',
          tdTemplate: this.operationTpl,
          width: 200,
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
