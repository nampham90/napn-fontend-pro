import { NgIf, NgTemplateOutlet } from "@angular/common";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit, TemplateRef, ViewChild, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormsModule } from "@angular/forms";
import { IObjectString } from "@app/common/IObiectString";
import { ActionCode } from "@app/config/actionCode";
import { HuongdanService } from "@app/core/services/http/system/huongdan.service";
import { DatascStoreService } from "@app/core/services/store/common-store/datasc-store.service";
import { OptionsInterface, SearchCommonVO } from "@app/core/services/types";
import { Tmt101Huongdan } from "@app/model/tmt101_huongdan.model";
import { AntTableComponent, AntTableConfig } from "@app/shared/components/ant-table/ant-table.component";
import { CardTableWrapComponent } from "@app/shared/components/card-table-wrap/card-table-wrap.component";
import { PageHeaderComponent, PageHeaderType } from "@app/shared/components/page-header/page-header.component";
import { AuthDirective } from "@app/shared/directives/auth.directive";
import { MapPipe, MapSet, MapKeyType } from "@app/shared/pipes/map.pipe";
import { ModalBtnStatus } from "@app/widget/base-modal";
import { HuongdanModalService } from "@app/widget/biz-widget/system/huongdan-modal/huongdan-modal.service";
import { YoutubeModalService } from "@app/widget/biz-widget/system/youtube-modal/youtube.service";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzSafeAny } from "ng-zorro-antd/core/types";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzMessageService } from "ng-zorro-antd/message";
import { NzTableQueryParams } from "ng-zorro-antd/table";
import { finalize } from "rxjs";

interface SearchParam {
    urldisplayid: string;
}
@Component({
    selector: 'app-huongdan',
    templateUrl: './huongdan.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        PageHeaderComponent,
        NzButtonModule,
        NzCardModule,
        FormsModule,
        NzFormModule,
        CardTableWrapComponent,
        NgIf,
        AntTableComponent,
        NzIconModule,
        AuthDirective,
    ]
})

export class HuongdanComponent implements OnInit {
    formItemNm: IObjectString = {};
    ActionCode = ActionCode;
    searchParam: Partial<SearchParam> = {};
    tableConfig!: AntTableConfig;
    dataList: Tmt101Huongdan[] = [];
    checkedCashArray: any[] = [];
    visibleOptions: OptionsInterface[] = []

    destroyRef = inject(DestroyRef);
    @ViewChild('huongdanTpl', { static: true }) huongdanTpl!: TemplateRef<NzSafeAny>;

    @ViewChild('operationTpl', { static: true }) operationTpl!: TemplateRef<NzSafeAny>;
    pageHeaderInfo: Partial<PageHeaderType> = {
        title: '',
        breadcrumb: ['', '', ''],
        extra: this.huongdanTpl
    };

    constructor(
        private datascStoreService : DatascStoreService,
        private cdr: ChangeDetectorRef,
        private dataService: HuongdanService,
        public message: NzMessageService,
        private huongdanModalService: HuongdanModalService,
        private youtubeModalService: YoutubeModalService
    ) {}

    ngOnInit(): void {
       // load formItemname
       this.datascStoreService.getDatascArrayStore()
       .pipe(takeUntilDestroyed(this.destroyRef))
       .subscribe(store => {
          this.formItemNm = store;
          this.pageHeaderInfo = {
             title: this.formItemNm[2],
             breadcrumb: [this.formItemNm[1],this.formItemNm[7],this.formItemNm[2]],
             extra: this.huongdanTpl
          }
       })

       // init Table
       this.initTable();
       this.visibleOptions = [...MapPipe.transformMapToArray(MapSet.visible, MapKeyType.Boolean)];
    }

    showVideo() {
        this.datascStoreService.getIdyoutubeStore()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(idyoutube => {
            this.youtubeModalService.show({nzTitle: "Hướng dẫn sử dụng"},{showcomfirm:false,idvideo:idyoutube}).subscribe(
                res => {
                    if (!res || res.status === ModalBtnStatus.Cancel) {
                        return;
                    }
                }
            )

        })
    }

    add() {
        this.huongdanModalService.show({ nzTitle:'Thêm mới' }).subscribe( //  this.formItemNm[15]
        res => {
          if (!res || res.status === ModalBtnStatus.Cancel) {
            return;
          }
          this.tableLoading(true);
          this.addEditData(res.modalValue, 'Create');
        },
        error => this.tableLoading(false)
      );
    }

    edit(id: string) {
        this.dataService.Detail(id)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(response => {
            this.huongdanModalService.show({nzTitle: this.formItemNm[10]},response).subscribe(({ modalValue, status })=>{
                if (status === ModalBtnStatus.Cancel) {
                  return;
                }
                modalValue.id = id;
                this.tableLoading(true);
                this.addEditData(modalValue, 'Update');
            })
        })
    }

    addEditData(param: any, methodName: 'Update' | 'Create'): void {
        this.dataService[methodName](param)
          .pipe(
            finalize(() => {
              this.tableLoading(false);
            })
          )
          .subscribe(res => {
            this.getDataList();
          });
      }

    allDel() {}

    searchName($event: any) {
        const params: SearchCommonVO<any> = {
          pageSize: this.tableConfig.pageSize!,
          pageNum: 1,
          filters: $event.target.value
        };
        this.dataService.PostSearchParams(params).pipe(
          finalize(() => {
            this.tableLoading(false);
          }),
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe(data => {
          console.log(data);
          const { list, total, pageNum } = data;
          this.dataList = [...list];
          this.tableConfig.total = total!;
          this.tableConfig.pageIndex = pageNum!;
          this.tableLoading(false);
          this.checkedCashArray = [...this.checkedCashArray];
        });
    }

    getDataList(e?: NzTableQueryParams): void {
        this.tableLoading(true);
        const params: SearchCommonVO<any> = {
          pageSize: this.tableConfig.pageSize!,
          pageNum: e?.pageIndex || this.tableConfig.pageIndex!,
          filters: this.searchParam
        };
    
        this.dataService.PostAll(params).pipe(
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
          this.initTable();
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

    resetForm(): void {
        this.searchParam = {};
        this.getDataList();
    }

    selectedChecked(e: any[]): void {
        this.checkedCashArray = [...e];
    }

    // Sửa đổi số lượng mục trên mỗi trang
    changePageSize(e: number): void {
        this.tableConfig.pageSize = e;
    }

    reloadTable(): void {
        this.message.info('Đã được làm mới');
        this.getDataList();
    }

    private initTable(): void {
        this.tableConfig = {
          showCheckbox: false,
          headers: [
            {
              title: this.formItemNm[12],
              field: 'idyoutube',
              width: 180,
            },
            {
              title: this.formItemNm[13],
              width: 180,
              field: 'urldisplayid',
            },
            {
              title: this.formItemNm[14],
              width: 120,
              field: 'title',
            },
            {
              title: this.formItemNm[15],
              width: 150,
              field: 'content',
            },
            {
              title: this.formItemNm[16],
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