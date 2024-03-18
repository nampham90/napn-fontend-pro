import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild, computed, inject, signal } from '@angular/core';
import { AbsComponent } from '@app/pages/system/abs.component';
import { PageHeaderComponent } from "../../../shared/components/page-header/page-header.component";
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { CurrencyPipe, JsonPipe, NgClass, NgStyle } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AntTableComponent, AntTableConfig } from '@app/shared/components/ant-table/ant-table.component';
import { ActionCode } from '@app/config/actionCode';
import { OptionsInterface } from '@app/core/services/types';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CardTableWrapComponent } from '@app/shared/components/card-table-wrap/card-table-wrap.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ModalBtnStatus } from '@app/widget/base-modal';
import { ProductSubService } from '@app/widget/biz-widget/common/product-sub/product-sub.service';
import { TIN040 } from '@app/model/tin-model/tin040_plantdl.model';
import { ResultUserService } from '@app/widget/biz-widget/out/result-user/result-user.service';
import * as Const from '@app/common/const';
import { UserDetail } from '@app/pages/out/spot00101/spot00101.component';
import { Tin020Service } from '../service/tin020.service';
import { Tmt280Service } from '@app/core/services/http/master/tmt280/tmt280.service';
import { TMT280 } from '@app/model/tmt-model/tmt280_div.model';
import { AuthDirective } from '@app/shared/directives/auth.directive';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Spin00101Service } from '@app/core/services/http/in/spin00101.service';
import { finalize } from 'rxjs';
import { SpinService } from '@app/core/services/store/common-store/spin.service';
@Component({
    selector: 'app-spin00101',
    standalone: true,
    templateUrl: './spin00101.component.html',
    styleUrl: './spin00101.component.less',
    imports: [PageHeaderComponent,
      NzCardModule,
      NzGridModule,
      NzFormModule,
      FormsModule,
      NzIconModule,
      NzSelectModule,
      NzInputModule,
      NzDatePickerModule,
      NgClass,
      NzButtonModule,
      CardTableWrapComponent,
      AntTableComponent,
      CurrencyPipe,
      NgStyle,
      AuthDirective
    ]
})
export class Spin00101Component extends AbsComponent implements OnInit{

  // inject
  public message = inject(NzMessageService);
  private productSubSevice = inject(ProductSubService);
  protected override cdr= inject(ChangeDetectorRef);
  private resultUserService = inject(ResultUserService);
  private tin020Service = inject(Tin020Service);
  private tmt280Service = inject(Tmt280Service);
  private modalSrv = inject(NzModalService);
  private spin00101Service = inject(Spin00101Service);
  public override spinService = inject(SpinService)
  // valible
  
  tableConfig!: AntTableConfig;
  ActionCode = ActionCode;
  dataList: TIN040[] = [];
  checkedCashArray: any[] = [];
  visibleOptions: OptionsInterface[] = [];
  

  @ViewChild('operationTpl', { static: true }) operationTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('product_nameTpl', { static: true }) product_nameTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('proidTpl', { static: true }) proidTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('qtycdTpl', { static: true }) qtycdTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('sipriceTpl', { static: true }) sipriceTpl!: TemplateRef<NzSafeAny>;
  
  @ViewChild('soluongTpl', { static: true }) soluongTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('thanhtienTpl', { static: true }) thanhtienTpl!: TemplateRef<NzSafeAny>;
  


  phongban_id = signal(0);// lưu trư lại phongban khi chọn nha cung cap
  userDetail = signal<UserDetail>({
    CSTMCD : "",
    CSTNAME: "",
    CSTMOBILE: "",
    CSTADDRESS: "",
    CSTEMAIL: "",
  });

  tin020 = computed(() => this.tin020Service.tin020());
  divkbns = signal<TMT280[]>([])

  showConfirm = false;

  mode = 0; //mode = 0 insert, mode = 1 update 

  // danh sach các phương thức thanh toan của nha cung cáp
  apiGetListDivkbn(): void {
    this.tmt280Service.getListDivKbn()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(res => {
      this.divkbns.set(res);
    })
  }

  btnConfirm() {
    if(this.tin020().SPPLYCD === 0 || this.tin020().ARVLPLNDATE === null) {
      this.message.error("Vui lòng nhập đây đủa thông tin");
    } else {
      this.modalSrv.confirm({
        nzTitle: "Bạn có chắc chắn muốn tạo không ?",
        nzContent: "Nhấn OK để hoàn thành việc đăng ký ",
        nzOnOk: () => {
          this.spinService.setCurrentGlobalSpinStore(true);
          this.spin00101Service.create(this.tin020())
          .pipe(
            takeUntilDestroyed(this.destroyRef))
          .subscribe(res => {
            this.spinService.setCurrentGlobalSpinStore(false);
            // this.tin020Service.updateTin020(res);
            // this.getDataList();
            this.confirmOK();
          }) 
        }
      })
    }
  }

  confirmOK() {
    this.modalSrv.success({
      nzTitle : "Đăng ký đơn hàng thành công !",
      nzOnOk: () => {
        this.tin020Service.refeshTin020();
        this.showConfirm = false;
        this.dataList = []
        this.userDetail.set({
            CSTMCD : "",
            CSTNAME: "",
            CSTMOBILE: "",
            CSTADDRESS: "",
            CSTEMAIL: "",
        })
        this.getDataList();
      }
    })
  }

  getDataList(e?: NzTableQueryParams): void {
    if(this.dataList.length > 0) {
       this.showConfirm = true;
    }
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

  selectedChecked(e: any[]): void {
    this.checkedCashArray = [...e];
  }

  reloadTable(): void {
    this.message.info('Làm mới thành công');
    this.getDataList();
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.apiGetListDivkbn();
    this.initTable();
  }

  add() {
    this.productSubSevice.show({nzTitle: "Thêm mới",nzWidth: 1280})
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(res => {
      if(!res || res.status === ModalBtnStatus.Cancel) {return;}
      this.dataList = [...res.modalValue];
      this.getDataList();
      this.tin020Service.updateListDetail(this.dataList);
    })
  }

  // hiển thị màn hình con tìm kiếm nhà cung cấp
  resultSupply() {
    this.resultUserService.show({nzTitle: Const.Nhacungcapnm, nzWidth: 1424}, {showcomfirm: false, department: Const.Nhacungcapnm})
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
        });
        this.tin020Service.updateSpplycd(Number(res.modalValue.id));
      }
    )
  }

  private initTable(): void {
    this.tableConfig = {
      showCheckbox: false,
      headers: [
        {
          title: 'Mã sản phẩm',
          field: 'id',
          tdTemplate: this.proidTpl,
          width: 100
        },
        {
          title: 'Tên sản phảm',
          field: 'product_name',
          tdTemplate: this.product_nameTpl,
          width: 250
        },
        {
          title: 'Số lượng',
          field: 'ARVLPLNQTY',
          tdTemplate: this.soluongTpl,
          width: 80,
          
        },
        {
          title: 'Chất lượng',
          field: 'QTYCD',
          tdTemplate: this.qtycdTpl,
          width: 80
        },
        {
          title: 'Giá nhập',
          field: 'SIPRICE',
          tdTemplate: this.sipriceTpl,
          width: 80
        },
        {
          title: 'Thành tiền',
          field: 'thanhtien',
          tdTemplate: this.thanhtienTpl,
          width: 80
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
