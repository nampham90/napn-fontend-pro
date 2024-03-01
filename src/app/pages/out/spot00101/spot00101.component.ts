import { CommonModule, CurrencyPipe, JsonPipe, NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, DestroyRef, OnInit, TemplateRef, ViewChild, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActionCode } from '@app/config/actionCode';
import { Tmt050, Tmt050Service } from '@app/core/services/http/master/tmt050/tmt050.service';
import { AbsComponent } from '@app/pages/system/abs.component';
import { AntTableConfig, AntTableComponent } from '@app/shared/components/ant-table/ant-table.component';
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
import { WindowService } from '@app/core/services/common/window.service';
import { soodno } from '@app/config/constant';
import { CartItem } from '@app/widget/biz-widget/out/product-list/model/Cart';
import { TOT040 } from '@app/model/tot-model/tot040_orddtl.model';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { Spot00101Service } from '@app/core/services/http/out/spot00101.service';
import FileSaver from 'file-saver';
import { SpinService } from '@app/core/services/store/common-store/spin.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ListOrderService } from '@app/shared/biz-components/layout-components/home-order/list-order/list-order.service';
import { AccountService } from '@app/core/services/http/system/account.service';
export interface UserDetail {
  CSTMCD: string;
  CSTNAME: string;
  CSTMOBILE: string;
  CSTADDRESS: string;
  CSTEMAIL: string;
}
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
        JsonPipe,
        AntTableComponent,
        CurrencyPipe
    ],
})
export class Spot00101Component extends AbsComponent implements OnInit{

  tmt050Service = inject(Tmt050Service);
  protected override cdr= inject(ChangeDetectorRef);
  private orderService = inject(OrderService);
  private productListService = inject(ProductListService);
  private resultUserService = inject(ResultUserService);
  override destroyRef = inject(DestroyRef);
  private cartService = inject(CartService)
  private fb = inject(FormBuilder); 
  public message = inject(NzMessageService);
  private windownService = inject(WindowService);
  private tmt170Service = inject(Tmt170Service);
  private tmt171Service = inject(Tmt171Service);
  private spot00101Service = inject(Spot00101Service);
  protected override spinService = inject(SpinService);
  private modalSrv = inject(NzModalService);
  private accountService = inject(AccountService);
  listOrderService = inject(ListOrderService);
  listPaymeth = signal<TMT171[]>([]);
  listDelimth = signal<TMT170[]>([]);
  order = computed(() => this.orderService.order());
  userDetail = signal<UserDetail>({
    CSTMCD : "",
    CSTNAME: "",
    CSTMOBILE: "",
    CSTADDRESS: "",
    CSTEMAIL: "",
  });
  cartItems = signal<CartItem[]>([]);
  listDetail = signal<TOT040[]>([]);
  filenamePdf = signal("");

  phongban_id = signal(0);// lưu trư lại phongban khi chọn khác hàng

  headerForm!: FormGroup ;
  @ViewChild('productnameTpl', {static: true}) productnameTpl! : TemplateRef<NzSafeAny>;
  @ViewChild('qtynmTpl', {static: true}) qtynmTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('sopriceTpl', {static: true}) sopriceTpl!: TemplateRef<NzSafeAny>;

  dataList: TOT040[] = []

  namebtnAdd = computed(() => {
    if(this.listDetail().length > 0) return "Cập nhật";
    return "Thêm mới";
  })


  constructor() {
    super();
  }
  // table process
  tableConfig!: AntTableConfig;
  ActionCode = ActionCode;
  checkedCashArray: any[] = [];

  getDataList(e?: NzTableQueryParams): void {
    this.dataList = [...this.listDetail()];
    this.orderService.updateListDetail(this.dataList);
    this.tableLoading(false);
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

  reloadTable(): void {
    this.message.info('Làm mới thành công');
    this.getDataList();
  }
  // end table process

  override ngOnInit(): void {
    super.ngOnInit();
    if(this.order().SOODNO === "") {
       this.orderService.updateOrder(JSON.parse(this.windownService.getStorage(soodno)!))
    }
    this.apiGetListPaymethd();
    this.apiGetListDelimthd();
    this.initTable();
    if(this.order().tot020_ordhed.tot040_orddtls.length > 0) {
      this.listDetail.set(this.order().tot020_ordhed.tot040_orddtls);
      this.tableChangeDectction();
    } 
    // trường hợp tồi tại id user, mà không có thông tin user thì lấy thông tin user từ DB
    if(this.order().tot020_ordhed.CSTMCD !== null && this.userDetail().CSTNAME === "") {
      this.apiGetDetaiUser();
    }
  }

  get f():{ [key: string]: AbstractControl } {
    return this.headerForm.controls;
  }

  // hiển thị modal tìm kiếm sản phẩm
  showProdutList() {
    if(this.userDetail().CSTMCD !== "") {
      this.confirmOK();
    } else {
      this.modalSrv.confirm({
        nzTitle: "Thống báo",
        nzContent: "Nếu không chọn khách hàng mặc định hiển thì giá lẻ !",
        nzOnOk: () => {
           this.confirmOK();
        }
      })
    }
  }

  confirmOK(): void {
    this.mergeTot040ToCart();
    this.productListService.show({nzTitle: "Trong Kho", nzWidth: 1224},{showCart: true, phongban_id: this.phongban_id()})
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(
        res => {
          if (!res || res.status === ModalBtnStatus.Cancel) {
            this.cartService.cartItems.set([]);
            return;
          }
          
          this.cartItems.set(res.modalValue);
          this.mergeCartToTot040();
          this.getDataList();
        }
    )
  }

  // merge list cartItem to Tot040
  mergeCartToTot040(): void {
    this.listDetail.set([]);
    if(this.cartItems().length > 0) {
      for(let i = 0; i < this.cartItems().length; i++) {
        let tot040 : TOT040 = {
          SOODNO: this.order().SOODNO,
          SODTLNO: i+1,
          SOPRICE: this.cartItems()[i].productstck.SELLPIRCE,
          SHIPMNTORDQTY: this.cartItems()[i].quantity,
          SHIPMNTORDREMAINQTY: this.cartItems()[i].productstck.TOTALALLWQTY,
          SOREMARK: "",
          PRODUCTCD: this.cartItems()[i].productstck.PRODUCTCD,
          product: this.cartItems()[i].productstck.product,
          QTYCD: this.cartItems()[i].productstck.QTYCD,
        }
        this.listDetail().push(tot040);
      }
    } 
  }

  // merge tot040 sang CartItem
  mergeTot040ToCart(): void {
    let listCart : CartItem[] = []
    if(this.dataList.length > 0) {
      for(let element of this.dataList) {
         let item: CartItem = {
            productstck: {
              PRODUCTCD: element.PRODUCTGROUPCD! == undefined? element.PRODUCTCD : element.PRODUCTGROUPCD,
              TOTALALLWQTY: 0,
              PURPIRCE: 0,
              TECHNICALPRICE: element.SOPRICE,
              SELLPIRCE: element.SOPRICE,
              QTYCD: element.QTYCD,
              TOTALSHIPQTY: 0,
              IMAGE: "",
              product: element.product,
              ISADDTOCART: true,
              
            },
            quantity: element.SHIPMNTORDQTY
         }
         listCart.push(item);
      }
      this.cartService.updateListCart(listCart);
    }
  }

  apiGetDetaiUser(): void {
    this.accountService.getAccountDetail(Number(this.order().tot020_ordhed.CSTMCD))
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(user => {
      this.userDetail.set({
         CSTMCD: user.id + "",
         CSTNAME: user.name == undefined? "" : user.name,
         CSTADDRESS: user.address == undefined? "" : user.address,
         CSTMOBILE: user.dienthoai == undefined? "" : user.dienthoai,
         CSTEMAIL: user.email == undefined? "" : user.email
      })
    })

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
        this.phongban_id.set(res.modalValue.phongban_id);
        this.userDetail.set({
           CSTMCD : res.modalValue.id,
           CSTNAME: res.modalValue.name,
           CSTMOBILE: "0" + res.modalValue.dienthoai,
           CSTADDRESS: (res.modalValue.BUYERADRS1ENC==null? "": res.modalValue.BUYERADRS1ENC) + " " + 
                      (res.modalValue.BUYERADRS2ENC==null? "": res.modalValue.BUYERADRS2ENC) + " " + 
                      (res.modalValue.BUYERADRS3ENC==null? "": res.modalValue.BUYERADRS3ENC),
          CSTEMAIL: res.modalValue.email
        })
        this.orderService.updateCustomer(this.userDetail());
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

  // printer báo gia đơn hàng cho khách hàng
  btnInbaogia() {
    this.spinService.setCurrentGlobalSpinStore(true);
    this.spot00101Service.updateOD(this.orderService.order())
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(res=> {
      if(res !== "") {
        this.filenamePdf.set(res);
        // update lai list order service
        this.updateListOrder();
        // xuat báo giá
        this.xuatbaogia();
      }
    })
  }

  updateListOrder() : void {
    this.spot00101Service.orderStatus()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(res => {
      this.listOrderService.updateListNew(res.lstnewOd);
      this.listOrderService.updateListQTESTS(res.lstQTESTS)
      this.listOrderService.updateListORDSTS(res.lstORDSTS)
      this.listOrderService.updateListORDAPPSTS(res.lstORDAPPSTS)
      this.listOrderService.updateListPAYSTS(res.lstPAYSTS)
      this.listOrderService.updateListSHIPSTS(res.lstSHIPSTS)
    })
  }

  xuatbaogia(): void {
    this.spot00101Service.inbaogia(this.orderService.order())
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(res => {
       FileSaver.saveAs(res, this.filenamePdf());
       this.spinService.setCurrentGlobalSpinStore(false);
    })
  }

  changeDelimthd($event: any) {
     this.orderService.updateDelimthd($event);
  }

  onSubmit() {
    
  }

  private initTable(): void {
    this.tableConfig = {
      showCheckbox: false,
      headers: [
         {
            title: "Tên sản phẩm",
            field: "PRODUCTNAME",
            tdTemplate: this.productnameTpl,
            width: 200,
         },
         {
            title: "Số lượng",
            field: "SHIPMNTORDQTY",
            width: 80,
         },
         {
            title: "Giá",
            field: "SOPRICE",
            tdTemplate: this.sopriceTpl,
            width: 100,
         },
         {
            title: 'Chất lượng',
            field: 'QTYNM',
            tdTemplate: this.qtynmTpl,
            width: 120
         },
         {
            title: "Ghi chú",
            field: "SOREMARK",
            width: 300,
         }

      ],
      total: 0,
      loading: true,
      pageSize: 10,
      pageIndex: 1
    }
  }

}
