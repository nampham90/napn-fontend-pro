import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HuongdanService } from '@app/core/services/http/system/huongdan.service';
import { MenusService } from '@app/core/services/http/system/menus.service';
import { SpinService } from '@app/core/services/store/common-store/spin.service';
import { AbsComponent } from '@app/pages/system/abs.component';
import { PageHeaderComponent } from '@app/shared/components/page-header/page-header.component';
import { YoutubeModalService } from '@app/widget/biz-widget/system/youtube-modal/youtube.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Product, ProductStore } from './demo.store';
import { AntTableComponent, AntTableConfig } from '@app/shared/components/ant-table/ant-table.component';
import { OptionsInterface } from '@app/core/services/types';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CardTableWrapComponent } from '@app/shared/components/card-table-wrap/card-table-wrap.component';
import { MapPipe, MapSet, MapKeyType } from '@app/shared/pipes/map.pipe';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SocketService } from '@app/core/services/common/socket.service';
import * as ConstSocket from '@app/common/constSocket';
import { SubdemoService } from '@app/widget/biz-widget/demo/subdemo/subdemo.service';
import { ModalBtnStatus } from '@app/widget/base-modal';
@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  providers: [ProductStore],
  imports: [
    PageHeaderComponent,
    NzButtonModule,
    AntTableComponent,
    CardTableWrapComponent,
  ],

})
export class DemoComponent extends AbsComponent implements OnInit{
  tableConfig!: AntTableConfig;
  dataList: Product[] = [];
  checkedCashArray: any[] = [];
  visibleOptions: OptionsInterface[] = [];
  @ViewChild('operationTpl', { static: true }) operationTpl!: TemplateRef<NzSafeAny>;

  constructor(
    protected override cdr: ChangeDetectorRef,
    protected override spinService: SpinService,
    protected override dataService: HuongdanService,
    protected override youtubeModalService: YoutubeModalService,
    protected override router: Router,
    protected override menusService: MenusService,
    public message: NzMessageService,
    private productStore: ProductStore,
    private socketService: SocketService,
    private subdemoService: SubdemoService
  ) {
    super(cdr, spinService, dataService, youtubeModalService, router, menusService);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.initTable();
  }

  add(): void {
    this.subdemoService.show({nzTitle: "Thêm mới"}).subscribe(
      res => {
        if (!res || res.status === ModalBtnStatus.Cancel) {
          return;
        }
        this.tableLoading(true);
        this.socketService.emit(ConstSocket.demoCreatePorduct,res.modalValue);
        this.tableLoading(false);
      },
      error => this.tableLoading(false)
    );
  }

  edit(id: number): void {}

  del(id: number): void {}
  
  allDel(): void {

  }
  

  getDataList(e?: NzTableQueryParams): void {
    this.socketService.emit(ConstSocket.demoListProduct, "");
    this.tableLoading(true);
    this.productStore.getProductStore()
    .pipe(
      finalize(() => {
        this.tableLoading(false);
      }),
      takeUntilDestroyed(this.destroyRef)
    )
    .subscribe(listProduct => {
      this.dataList = [...listProduct];
      this.tableLoading(false);
    });
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

  // Sửa đổi số lượng mục trên mỗi trang
  changePageSize(e: number): void {
    this.tableConfig.pageSize = e;
  }

  reloadTable(): void {
    this.message.info('Đã được làm mới');
    this.getDataList();
  }

  selectedChecked(e: any[]): void {
    this.checkedCashArray = [...e];
  }

  private initTable(): void {
    this.tableConfig = {
      showCheckbox: false,
      headers: [
        {
          title: "STT",
          field: 'idpro',
          width: 180
        },
        {
          title: "Name",
          width: 180,
          field: 'proname'
        },
        {
          title: "Price",
          width: 120,
          field: 'price'
        },
        {
          title: "Events",
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
    };
  }
}
