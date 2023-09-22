import { NgIf, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';

import { ActionCode } from '@app/config/actionCode';
import { DataScObj, DatascService } from '@app/core/services/http/system/datasc.service';
import { MenusService } from '@app/core/services/http/system/menus.service';
import { SearchCommonVO } from '@app/core/services/types';
import { AntTableComponent, AntTableConfig } from '@app/shared/components/ant-table/ant-table.component';
import { CardTableWrapComponent } from '@app/shared/components/card-table-wrap/card-table-wrap.component';
import { PageHeaderComponent, PageHeaderType } from '@app/shared/components/page-header/page-header.component';
import { ModalBtnStatus } from '@app/widget/base-modal';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import * as Const from 'src/app/common/const';

import { MenuTreeComponent } from './menu-tree/menu-tree.component';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AuthDirective } from '@app/shared/directives/auth.directive';
import { DatascModalService } from '@app/widget/biz-widget/system/datasc-modal/datasc-modal.service';
import { AbsComponent } from '../abs.component';
import { Router } from '@angular/router';
import { HuongdanService } from '@app/core/services/http/system/huongdan.service';
import { SpinService } from '@app/core/services/store/common-store/spin.service';
import { YoutubeModalService } from '@app/widget/biz-widget/system/youtube-modal/youtube.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

interface SearchParam {
  title1: string;
  idmenu: string;
}

@Component({
  selector: 'app-datasc',
  templateUrl: './datasc.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NzButtonModule,
    NzWaveModule,
    NzSwitchModule,
    NzGridModule,
    MenuTreeComponent,
    PageHeaderComponent,
    AntTableComponent,
    CardTableWrapComponent,
    NgIf,
    NgFor,
    NzCardModule,
    FormsModule,
    NzFormModule,
    NzInputModule,
    NzIconModule,
    AuthDirective,
    TranslateModule
  ]
})
export class DatascComponent extends AbsComponent implements OnInit {
  @ViewChild('operationTpl', { static: true }) operationTpl!: TemplateRef<any>;
  @ViewChild('availableFlag', { static: true }) availableFlag!: TemplateRef<NzSafeAny>;
  searchParam: Partial<SearchParam> = {};
  tableConfig!: AntTableConfig;
  dataList: DataScObj[] = [];
  checkedCashArray: DataScObj[] = [];
  ActionCode = ActionCode;

  idmenu = '';
  menuName = '';

  dataSC!: DataScObj;

  constructor(
    protected override cdr: ChangeDetectorRef,
    protected override spinService: SpinService,
    protected override dataService: HuongdanService,
    protected override youtubeModalService: YoutubeModalService,
    protected override router: Router,
    protected override menusService: MenusService,
    private menuService: MenusService, 
    public message: NzMessageService, 
    private modalSrv: NzModalService, 
    private datascService: DatascService,
    private modalService : DatascModalService,
    public translate: TranslateService
    ) {
      super(cdr,spinService,dataService,youtubeModalService,router,menusService)
      this.translate.setDefaultLang(localStorage.getItem('lang') || 'vi') ;
    }

  override ngOnInit(): void {
    super.ngOnInit();
    this.initTable();
  }

  override fnInit(): void {
    this.initTable();
  }

  searchMenutDatasc(idmenu: any): void {
    this.idmenu = idmenu;
    this.searchParam.idmenu = idmenu;
    this.getDataList();
    this.getNameMenu(this.idmenu);
  }

  edit(id: any): void {
    this.datascService.detailDatasc(id).subscribe(res => {
      if(res) {
        this.dataSC = res;
        this.modalService.show({nzTitle: "Cập nhật"},this.dataSC).subscribe(({ modalValue, status })=> {
          if (status === ModalBtnStatus.Cancel) {
            return;
          }
          modalValue.id = id;
          this.tableLoading(true);
          this.addEditData(modalValue,'editDatasc');
        })
      }
    })
  }

  del(id: any): void {
    this.modalSrv.confirm(
      {
        nzTitle: "Bạn có chắc chăn muốn xóa không ?" ,
        nzContent : "Nhấn OK để tiếp tục !",
        nzOnOk: () => {
          this.tableLoading(true);
          this.datascService.delDatasc(id).subscribe(res => {
            this.getDataList();
         })
        }
      }
    )
  }

  add(idmenu: string): void {
    if (idmenu === "") {
      this.message.warning("Bạn chưa chọn menu nào để thêm dữ liệu !")
    } else {
      this.modalService.show({ nzTitle: `Thêm Mới dữ liệu cho Menu: ${this.menuName}`},{idmenu:idmenu}).subscribe(
        res => {
          if (!res || res.status === ModalBtnStatus.Cancel) {
            return;
          }
          res.modalValue.idmenu = idmenu;
          this.tableLoading(true);
          this.addEditData(res.modalValue, 'addDatasc');
        },
        error => this.tableLoading(false)
      );
    }
  }

  allDel(): void {}

  addEditData(param: DataScObj, methodName: 'editDatasc' | 'addDatasc'): void {
    this.datascService[methodName](param)
      .pipe(
        finalize(() => {
          this.tableLoading(false);
        })
      )
      .subscribe(() => {
        this.getDataList();
      });
  }

  getDataList(e?: NzTableQueryParams): void {
    this.tableLoading(true);
    const params: SearchCommonVO<any> = {
      pageSize: this.tableConfig.pageSize!,
      pageNum: e?.pageIndex || this.tableConfig.pageIndex!,
      filters: this.searchParam
    };
    this.datascService
      .getDataSc(params)
      .pipe(
        finalize(() => {
          this.tableLoading(false);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(data => {
        const { list, total, pageNum } = data;
        this.dataList = [...list];
        this.tableConfig.total = total!;
        this.tableConfig.pageIndex = pageNum!;
        this.tableLoading(false);
        this.checkedCashArray = [...this.checkedCashArray];
      });
  }

  tableLoading(isLoading: boolean): void {
    this.tableConfig.loading = isLoading;
    this.tableChangeDectction();
  }

  tableChangeDectction(): void {
    this.dataList = [...this.dataList];
    this.cdr.detectChanges();
  }

  reloadTable(): void {
    this.message.info('Làm mới thành công');
    this.getDataList();
  }

  selectedChecked(e: DataScObj[]): void {
    this.checkedCashArray = [...e];
  }
  changePageSize($event: any): void {}

  resetForm(): void {
    this.searchParam = {};
    this.getDataList();
  }

  getNameMenu(id: string): void {
    this.menuService.getMenuDetail(id).subscribe(res => {
      this.menuName = res.menuName;
    });
  }

  private initTable(): void {
    this.tableConfig = {
      showCheckbox: true,
      headers: [
        {
          title:  this.formItemNm[10],
          field: 'title1',
          width: 120
        },
        {
          title: this.formItemNm[11],
          field: 'title2',
          width: 120
        },
        {
          title: this.formItemNm[12],
          field: 'lang',
          width: 120
        },
        {
          title: this.formItemNm[13],
          field: 'vitri',
          width: 100
        },
        {
          title: this.formItemNm[14],
          width: 150,
          field: 'status',
          tdTemplate: this.availableFlag
        },
        {
          title: this.formItemNm[15],
          tdTemplate: this.operationTpl,
          width: 200,
          fixed: true,
          fixedDir: 'right'
        }
      ],
      total: 0,
      loading: false,
      pageSize: 10,
      pageIndex: 1
    };
  }
}
