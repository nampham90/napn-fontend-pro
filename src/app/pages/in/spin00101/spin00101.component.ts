import { Component, OnInit, TemplateRef, ViewChild, inject, signal } from '@angular/core';
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
import { NgClass } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AntTableConfig } from '@app/shared/components/ant-table/ant-table.component';
import { ActionCode } from '@app/config/actionCode';
import { OptionsInterface } from '@app/core/services/types';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzMessageService } from 'ng-zorro-antd/message';

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
      NzButtonModule
    ]
})
export class Spin00101Component extends AbsComponent implements OnInit{
  // inject
  public message = inject(NzMessageService);
  // valible
  divkbns = signal([]);
  
  tableConfig!: AntTableConfig;
  ActionCode = ActionCode;
  dataList = signal<any[]>([]);
  checkedCashArray: any[] = [];
  visibleOptions: OptionsInterface[] = [];

  @ViewChild('operationTpl', { static: true }) operationTpl!: TemplateRef<NzSafeAny>;

  getDataList(e?: NzTableQueryParams): void {
    
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
    this.initTable();
  }

  resultSupply() {
    throw new Error('Method not implemented.');
  }

  private initTable(): void {
    this.tableConfig = {
      showCheckbox: false,
      headers: [],
      total: 0,
      loading: true,
      pageSize: 10,
      pageIndex: 1
    }

  }

}
