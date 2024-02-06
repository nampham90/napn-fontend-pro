import { CommonModule, JsonPipe, NgClass } from '@angular/common';
import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
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
import { OrderService } from './order.service';
import { TMT171 } from '@app/model/tmt-model/tmt171_paymethd.model';
import { TMT170 } from '@app/model/tmt-model/tmt170_delimthd.model';
import { Tmt170Service } from '@app/core/services/http/master/tmt170/tmt170.service';
import { Tmt171Service } from '@app/core/services/http/master/tmt171/tmt171.service';

@Component({
    selector: 'app-spot00101',
    standalone: true,
    templateUrl: './spot00101.component.html',
    styleUrl: './spot00101.component.less',
    imports: [
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
        ReactiveFormsModule,
        JsonPipe
    ]
})
export class Spot00101Component extends AbsComponent{

  tmt050Service = inject(Tmt050Service);
  private orderService = inject(OrderService);
  private productListService = inject(ProductListService);
  private resultUserService = inject(ResultUserService);
  override destroyRef = inject(DestroyRef);
  private cartService = inject(CartService)
  private fb = inject(FormBuilder); 
  public message = inject(NzMessageService);
  private tmt170Service = inject(Tmt170Service);
  private tmt171Service = inject(Tmt171Service);
  listPaymeth = signal<TMT171[]>([]);
  listDelimth = signal<TMT170[]>([]);
  order = computed(() => this.orderService.order());
  headerForm!: FormGroup ;

  constructor() {
    super();
    
  }
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
    this.apiGetListDelimthd();
    this.apiGetListPaymethd();
    this.initTable();

   // console.log(this.order().tot020_ordhed.DELIMTHDCD + ":" + this.DELIMTHDCD());
  }

  initFormHeader() : void {
    this.headerForm = this.fb.group({
      SOODNO: [ this.order().SOODNO, [Validators.required]],
      DELIMTHCD: [this.order().tot020_ordhed.DELIMTHDCD],
      PAYMTHDCD: [this.order().tot020_ordhed.PAYMETHDCD],
      // STATUS: [null, [Validators.required]],
      // ORDERDATE: [null],
      // SHIPDATE: [null],
      // SOREMARK: [null],
      // CSTMCD: [null],
      // CSTNAME: [null],
      // CSTMOBILE: [null],
      // CSTADDRESS: [null]
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

  // lấy danh sách phương thức thanh toán
  apiGetListPaymethd():void {
    this.tmt171Service.getListPaymethd()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(res => {
      this.listPaymeth.set(res);
    })
  }

  // lấy danh sách phương thức vận chuyển
  apiGetListDelimthd(): void {
    this.tmt170Service.getListDelimthd()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(res => {
      this.listDelimth.set(res);
    })
  }

  onChangeOrddate($event: any) {
    
  }

  onChangeShipdate($event: any) {
    
  }

  submitForm() : void {

  }

  changeDelimthd($event: any) {
     this.orderService.updateDelimthd($event);
    // console.log(this.order().tot020_ordhed.DELIMTHDCD);
  }

  onSubmit() {
    
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
