import { ChangeDetectorRef, Component, DestroyRef, OnInit, TemplateRef, ViewChild, inject, signal } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { DeptTreeComponent } from "../../../../../pages/system/account/dept-tree/dept-tree.component";
import { AccountService, User } from '@app/core/services/http/system/account.service';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { AntTableConfig, AntTableComponent } from '@app/shared/components/ant-table/ant-table.component';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { OptionsInterface, SearchCommonVO } from '@app/core/services/types';
import { NzCardModule } from 'ng-zorro-antd/card';
import { FormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CardTableWrapComponent } from "../../../../../shared/components/card-table-wrap/card-table-wrap.component";
import { UserDetailService } from '../user-detail.service';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { ModalBtnStatus } from '@app/widget/base-modal';
interface SearchParam {
  name: string;
  phongban_id: number;
  dienthoai: number;
  available: boolean;
}
@Component({
    selector: 'app-search-user',
    standalone: true,
    templateUrl: './search-user.component.html',
    styleUrl: './search-user.component.less',
    imports: [
        NzGridModule,
        NzCardModule,
        FormsModule,
        NzFormModule,
        NzInputModule,
        NzSelectModule,
        NzButtonModule,
        NzIconModule,
        DeptTreeComponent,
        CardTableWrapComponent,
        AntTableComponent
    ]
})
export class SearchUserComponent implements OnInit{

  private dataService = inject(AccountService);
  public message = inject(NzMessageService);
  private cdr = inject(ChangeDetectorRef);
  private userDetailService = inject(UserDetailService);
  destroyRef = inject(DestroyRef);

  constructor( private modalRef: NzModalRef,){}

  searchParam: Partial<SearchParam> = {};
  tableConfig!: AntTableConfig;
  isCollapse = true;
  availableOptions: OptionsInterface[] = [];

  dataList = signal<User[]>([]);
  @ViewChild('availableFlag', { static: true }) availableFlag!: TemplateRef<NzSafeAny>;
  @ViewChild('nameTpl', { static: true }) nameTpl!: TemplateRef<NzSafeAny>;

  searchDeptIdUser(departmentId: number) {
    this.searchParam.phongban_id = departmentId;
    this.getDataList();
  }

  getDataList(e?: NzTableQueryParams): void {
    const params: SearchCommonVO<any> = {
      pageSize: this.tableConfig.pageSize!,
      pageNum: e?.pageIndex || this.tableConfig.pageIndex!,
      filters: this.searchParam
    };
    this.dataService
      .getAccount(params)
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
      });
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

  changePageSize(e: number): void {
    this.tableConfig.pageSize = e;
  }

  toggleCollapse() {
    this.isCollapse = !this.isCollapse;
  }

  resetForm() {
  
  }

  resultUser(id: number) {
    const user = this.dataList().find(item => item.id === id);
    if(user) {
      this.userDetailService.userDetail.set(user);
      this.modalRef.destroy({ status: ModalBtnStatus.Ok, modalValue:user });
    }
  }


  ngOnInit(): void {
    this.initTable();
  }

  private initTable(): void {
    this.tableConfig = {
      showCheckbox: false,
      headers: [
        {
          title: 'Tên tài khoản',
          field: 'name',
          width: 220,
          tdTemplate: this.nameTpl,
          fixed: true,
          fixedDir: 'left'
        },
        {
          title: 'Điện Thoại',
          width: 150,
          field: 'dienthoai'
        },
        {
          title: 'Địa chỉ',
          field: 'address',
          width: 300,
        },
        {
          title: 'Email',
          width: 200,
          field: 'email'
        },
        {
          title: 'Giới Tính',
          width: 120,
          field: 'sex',
          pipe: 'sex'
        },
        {
          title: 'Trạng thái',
          width: 150,
          field: 'available',
          tdTemplate: this.availableFlag
        },
        {
          title: 'Đăng nhập lần cuối',
          width: 200,
          field: 'lastLoginTime',
          pipe: 'date:yyyy-MM-dd HH:mm'
        },
        {
          title: 'Ngày khởi tạo',
          width: 150,
          field: 'createdAt',
          pipe: 'date:yyyy-MM-dd HH:mm'
        }
      ],
      total: 0,
      loading: true,
      pageSize: 10,
      pageIndex: 1
    };
  }


}
