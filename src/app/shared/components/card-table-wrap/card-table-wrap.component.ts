import { CdkDragDrop, moveItemInArray, CdkDropList, CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { NgIf, NgTemplateOutlet, NgFor, NgStyle } from '@angular/common';
import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef, inject } from '@angular/core';

import { AntTreeTableComponentToken } from '@shared/components/tree-table/tree-table.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTableSize } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

import { ScreenLessHiddenDirective } from '../../directives/screen-less-hidden.directive';
import { AntTableComponentToken, TableHeader } from '../ant-table/ant-table.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

interface TableSizeItem {
  sizeName: string;
  selected: boolean;
  value: NzTableSize;
}

@Component({
  selector: 'app-card-table-wrap',
  templateUrl: './card-table-wrap.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NzCardModule,
    NgIf,
    NgTemplateOutlet,
    NzDividerModule,
    NzSpaceModule,
    NzIconModule,
    NzButtonModule,
    NzPopoverModule,
    NzToolTipModule,
    ScreenLessHiddenDirective,
    NzDropDownModule,
    NzMenuModule,
    NgFor,
    CdkDropList,
    CdkDrag,
    CdkDragHandle,
    NzCheckboxModule,
    NgStyle,
    TranslateModule
  ]
})
export class CardTableWrapComponent implements OnInit, AfterContentInit {
  public translate = inject(TranslateService);
  @Input() tableTitle: string | TemplateRef<NzSafeAny> | undefined;
  @Input() btnTpl: TemplateRef<NzSafeAny> | undefined;
  @Input() btnConfirm: TemplateRef<NzSafeAny> | undefined;
  @Input() isNormalTable = true; // Nếu bạn chỉ cần kiểu bọc thẻ trên bàn, hãy đặt kiểu này thành sai
  @Output() readonly reload = new EventEmitter<NzSafeAny>();
  @ContentChild(AntTableComponentToken) antTableComponent!: AntTableComponentToken;
  @ContentChild(AntTreeTableComponentToken) antTreeTableComponent!: AntTreeTableComponentToken;
  tableConfigVisible = false;
  tableSizeOptions: TableSizeItem[] = [
    { sizeName: 'mặc định', selected: true, value: 'default' },
    { sizeName: 'Vừa phải', selected: false, value: 'middle' },
    { sizeName: 'Nhỏ', selected: false, value: 'small' }
  ];
  tableHeaders: TableHeader[] = [];
  currentTableComponent!: AntTableComponentToken | AntTreeTableComponentToken;
  allTableFieldChecked = false; // Chọn tất cả các cột trong cài đặt
  allTableFieldIndeterminate = false; // Đặt trạng thái được chọn một nửa của cột được chọn tất cả bên trong
  copyHeader: TableHeader[] = []; // Cấu hình mặc định bộ đệm

  constructor() {
    this.translate.setDefaultLang(localStorage.getItem('lang') || 'vi');
  }

  // Có hiển thị hộp kiểm hay không
  changeTableCheckBoxShow(e: boolean): void {
    this.currentTableComponent.tableConfig.showCheckbox = e;
    this.tableChangeDectction();
  }

  // Mật độ dạng lớn, vừa và nhỏ
  tableSizeMenuClick(item: TableSizeItem): void {
    this.tableSizeOptions.forEach(tableSizeItem => (tableSizeItem.selected = false));
    item.selected = true;
    this.currentTableComponent.tableSize = item.value;
  }

  // Có nên chọn tất cả các hộp kiểm bảng trong cấu hình hay không
  changeAllTableTableConfigShow(e: boolean): void {
    if (e) {
      this.allTableFieldChecked = e;
      this.allTableFieldIndeterminate = false;
    }
    this.tableHeaders.forEach(item => (item.show = e));
    this.tableChangeDectction();
  }

  // Đặt cố định bên trái hoặc bên phải
  changeTableConfigShow(): void {
    const tempArray = [...this.tableHeaders];
    const fixedLeftArray: TableHeader[] = [];
    const fixedRightArray: TableHeader[] = [];
    const noFixedArray: TableHeader[] = [];
    tempArray.forEach(item => {
      if (item.fixed) {
        if (item.fixedDir === 'left') {
          fixedLeftArray.push(item);
        } else {
          fixedRightArray.push(item);
        }
      } else {
        noFixedArray.push(item);
      }
    });
    this.currentTableComponent.tableConfig.headers = [...fixedLeftArray, ...noFixedArray, ...fixedRightArray];
    this.tableChangeDectction();
  }

  dropTableConfig(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.tableHeaders, event.previousIndex, event.currentIndex);
    this.changeTableConfigShow();
  }

  fixedTableHead(dir: 'right' | 'left', item: TableHeader): void {
    item.fixed = !(item.fixed && item.fixedDir === dir);
    item.fixedDir = dir;
    this.changeTableConfigShow();
  }

  reloadClick(): void {
    this.reload.emit();
  }

  // Kiểm tra các thay đổi trong một cột nhất định
  changeSignalCheck(e: boolean, item: TableHeader): void {
    item.show = e;
    this.judgeAllChecked();
    this.tableChangeDectction();
  }

  // Bật phát hiện thay đổi danh sách phụ
  tableChangeDectction(): void {
    this.currentTableComponent.tableChangeDectction();
  }

  // Cột phán đoán hiển thị trạng thái của hộp kiểm
  judgeAllChecked(): void {
    this.allTableFieldChecked = this.tableHeaders.every(item => item.show === true);
    const allUnChecked = this.tableHeaders.every(item => !item.show);
    this.allTableFieldIndeterminate = !this.allTableFieldChecked && !allUnChecked;
  }

  // cài lại
  reset(): void {
    this.tableHeaders = [];
    this.copyHeader.forEach(item => {
      this.tableHeaders.push({ ...item });
    });
    this.currentTableComponent.tableConfig.headers = [...this.tableHeaders];
    this.tableChangeDectction();
  }

  ngOnInit(): void {}

  ngAfterContentInit(): void {
    this.currentTableComponent = this.antTableComponent || this.antTreeTableComponent;

    if (this.isNormalTable) {
      this.tableHeaders = [...this.currentTableComponent.tableConfig.headers];
      this.tableHeaders.forEach(item => {
        if (item.show === undefined) {
          item.show = true;
        }
      });
      this.copyHeader.length = 0;
      this.tableHeaders.forEach(item => {
        this.copyHeader.push({ ...item });
      });
      this.judgeAllChecked();
    }
  }
}
