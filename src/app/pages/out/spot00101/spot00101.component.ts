import { NgClass } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActionCode } from '@app/config/actionCode';
import { Tmt050, Tmt050Service } from '@app/core/services/http/master/tmt050/tmt050.service';
import { AbsComponent } from '@app/pages/system/abs.component';
import { AntTableConfig } from '@app/shared/components/ant-table/ant-table.component';
import { PageHeaderComponent } from '@app/shared/components/page-header/page-header.component';
import { ModalBtnStatus } from '@app/widget/base-modal';
import { CartService } from '@app/widget/biz-widget/out/product-list/cart.service';
import { ProductListService } from '@app/widget/biz-widget/out/product-list/product-list.service';
import { ResultUserService } from '@app/widget/biz-widget/out/result-user/result-user.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { CardTableWrapComponent } from "../../../shared/components/card-table-wrap/card-table-wrap.component";
import { AuthDirective } from '@app/shared/directives/auth.directive';

@Component({
    selector: 'app-spot00101',
    standalone: true,
    templateUrl: './spot00101.component.html',
    styleUrl: './spot00101.component.less',
    imports: [
        ReactiveFormsModule,
        PageHeaderComponent,
        NzIconModule,
        NzDatePickerModule,
        NzSelectModule,
        FormsModule,
        NzInputModule,
        NzFormModule,
        NzGridModule,
        NzButtonModule,
        NzTabsModule,
        NgClass,
        NzCardModule,
        CardTableWrapComponent,
        AuthDirective,
    ]
})
export class Spot00101Component extends AbsComponent{
  tmt050Service = inject(Tmt050Service);
  private productListService = inject(ProductListService);
  private resultUserService = inject(ResultUserService);
  override destroyRef = inject(DestroyRef);
  private cartService = inject(CartService)
  private fb = inject(FormBuilder); 
  public message = inject(NzMessageService);
  listPaymeth = signal<Tmt050[]>([]);
  listDelimth = signal<Tmt050[]>([]);


  headerForm!: FormGroup;

  // table process
  tableConfig!: AntTableConfig;
  ActionCode = ActionCode;
  checkedCashArray: any[] = [];
  dataList = signal<any[]>([]);

  getDataList(e?: NzTableQueryParams): void {
    
  }

  tableChangeDectction(): void {
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

  // end table process

  override ngOnInit(): void {
    super.ngOnInit();
    this.initFormHeader();
    this.initTable();
  }

  initFormHeader() : void {
    this.headerForm = this.fb.group({
      SOODNO: [null, [Validators.required]],
      DELIMTHDCD: [null],
      PAYMETHDCD: [null],
      STATUS: [null, [Validators.required]],
      ORDERDATE: [null],
      SHIPDATE: [null],
      SOREMARK: [null],
      CSTMCD: [null],
      CSTNAME: [null],
      CSTMOBILE: [null],
      CSTADDRESS: [null]
    });
  }

  get f():{ [key: string]: AbstractControl } {
    return this.headerForm.controls;
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
        this.headerForm.patchValue({
          CSTMCD: res.modalValue.id,
          CSTNAME: res.modalValue.name,
          CSTMOBILE: "0" + res.modalValue.dienthoai,
          CSTADDRESS: (res.modalValue.BUYERADRS1ENC==null? "": res.modalValue.BUYERADRS1ENC) + " " + 
                      (res.modalValue.BUYERADRS2ENC==null? "": res.modalValue.BUYERADRS2ENC) + " " + 
                      (res.modalValue.BUYERADRS3ENC==null? "": res.modalValue.BUYERADRS3ENC)
        })
        // console.log(res.modalValue);
      }
    )
  }

  onChangeOrddate($event: any) {
    
  }

  onChangeShipdate($event: any) {
    
  }

  submitForm() : void {

  }

  private initTable(): void {
    this.tableConfig = {
      showCheckbox: false,
      headers: [

      ],
      total: 0,
      loading: true,
      pageSize: 10,
      pageIndex: 1
    }
  }

}
