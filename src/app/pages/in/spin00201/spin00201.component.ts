import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild, inject, signal } from '@angular/core';
import { AbsComponent } from '@app/pages/system/abs.component';
import { PageHeaderComponent } from "../../../shared/components/page-header/page-header.component";
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AuthDirective } from '@app/shared/directives/auth.directive';
import { AntTableComponent, AntTableConfig } from '@app/shared/components/ant-table/ant-table.component';
import { CardTableWrapComponent } from '@app/shared/components/card-table-wrap/card-table-wrap.component';
import { ActionCode } from '@app/config/actionCode';
import { OptionsInterface } from '@app/core/services/types';
import { MapPipe, MapSet, MapKeyType } from '@app/shared/pipes/map.pipe';
import { Router } from '@angular/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzDatePickerComponent, NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { TMT280 } from '@app/model/tmt-model/tmt280_div.model';
import { Tmt280Service } from '@app/core/services/http/master/tmt280/tmt280.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ResultUserService } from '@app/widget/biz-widget/out/result-user/result-user.service';
import { UserDetail } from '@app/pages/out/spot00101/spot00101.component';
import { ModalBtnStatus } from '@app/widget/base-modal';
import * as Const from '@app/common/const';
import { NgClass } from '@angular/common';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
interface ListSts {
  sts: string;
}

interface SearchParam {
  fromDate: Date | null;
  toDate: Date | null;
  siplnno: string;
  sts: string;
  divkbn: string;
  spplycd: string;
}
@Component({
    selector: 'app-spin00201',
    standalone: true,
    templateUrl: './spin00201.component.html',
    styleUrl: './spin00201.component.less',
    imports: [PageHeaderComponent, 
      NzCardModule, 
      NzGridModule,
      NzIconModule, 
      NzInputModule, 
      NzSelectModule, 
      NzFormModule,
      FormsModule,
      NzButtonModule,
      AuthDirective,
      AntTableComponent,
      CardTableWrapComponent,
      NzDatePickerModule,
      NzCheckboxModule,
      NgClass

    ]
})
export class Spin00201Component extends AbsComponent implements OnInit{

  // inject
  protected override cdr= inject(ChangeDetectorRef);
  protected override router= inject(Router);
  public message= inject(NzMessageService);
  private tmt280Service = inject(Tmt280Service);
  private resultUserService = inject(ResultUserService);
  //
  searchParam: Partial<SearchParam> = {};
  ActionCode = ActionCode;
  tableConfig!: AntTableConfig;
  dataList: any[] = [];
  checkedCashArray: any[] = [];
  visibleOptions: OptionsInterface[] = [];
  divkbns = signal<TMT280[]>([])
  phongban_id = signal(0);
  @ViewChild('kiemdinhTpl', { static: true }) kiemdinhTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('siplnnoTpl', { static: true }) siplnnoTpl!: TemplateRef<NzSafeAny>;


  // date
  startValue: Date | null = null;
  endValue: Date | null = null;
  @ViewChild('endDatePicker') endDatePicker!: NzDatePickerComponent;
  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue || !this.endValue) {
      return false;
    }
    return startValue.getTime() > this.endValue.getTime();
  };

  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.startValue) {
      return false;
    }
    return endValue.getTime() <= this.startValue.getTime();
  };

  handleStartOpenChange(open: boolean): void {
    if (!open) {
      this.endDatePicker.open();
    }
    console.log('handleStartOpenChange', open);
  }

  handleEndOpenChange(open: boolean): void {
    console.log('handleEndOpenChange', open);
  }

  sts = [
    { label: 'Đăng ký', value: 0, checked: false },
    { label: 'Hoàng thành nhập hàng', value: 1, checked: false },
    { label: 'Thực tế nhập hàng', value: 2, checked: false },
  ];

  changeSts(){}

  userDetail = signal<UserDetail>({
    CSTMCD : "",
    CSTNAME: "",
    CSTMOBILE: "",
    CSTADDRESS: "",
    CSTEMAIL: "",
  });

  override ngOnInit(): void {
    super.ngOnInit()
    this.initTable();
    this.apiGetListDivkbn();
    this.visibleOptions = [...MapPipe.transformMapToArray(MapSet.visible, MapKeyType.Boolean)];
  }
  // danh sach các phương thức thanh toan của nha cung cáp
  apiGetListDivkbn(): void {
    this.tmt280Service.getListDivKbn()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(res => {
      this.divkbns.set(res);
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
      }
    )
  }
  

  getDataList(e?: NzTableQueryParams): void {
    this.tableLoading(false);
  }

  // kích hoạt kiểm tra thay đổi của bảng
  tableChangeDectction(): void {
    // Thay đổi tham chiếu kích hoạt kiểm tra thay đổi.
    this.dataList = [...this.dataList];
    this.cdr.detectChanges();
  }

  tableLoading(isLoading: boolean): void {
    this.tableConfig.loading = isLoading;
    this.tableChangeDectction();
  }

  selectedChecked(e: any[]): void {
    this.checkedCashArray = [...e];
  }

  // Sửa đổi số lượng mục trên mỗi trang
  changePageSize(e: number): void {
    this.tableConfig.pageSize = e;
  }
  

  resetForm(): void {
    this.searchParam = {};
    this.getDataList();
  }

  reloadTable(): void {
    this.message.info('Đã được làm mới');
    this.getDataList();
  }

  private initTable(): void {
    this.tableConfig = {
      showCheckbox: true,
      headers: [
        {
          title: 'Kiểm hàng',
          field: 'id',
          width: 120,
          tdTemplate: this.kiemdinhTpl
        },
        {
          title: 'Số hóa đơn',
          field: 'siplnoo',
          width: 150,
          tdTemplate: this.siplnnoTpl
        },
        {
          title: 'Trạng thái',
          field: 'STSNM',
          width: 150,
        },
        {
          title: 'Nhà cung câp',
          field: 'SPPLYNM',
          width: 300,
        },
        {
          title: 'PT Thanh toán',
          field: 'DIVNM',
          width: 150,
        }
      ],
      total: 0,
      loading: true,
      pageSize: 10,
      pageIndex: 1
    }

  }



}
