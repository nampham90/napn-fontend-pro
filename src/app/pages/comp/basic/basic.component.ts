import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { PageHeaderType, PageHeaderComponent } from '@shared/components/page-header/page-header.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PageHeaderComponent, NzGridModule, NzCardModule, NzButtonModule, NzWaveModule, NzIconModule]
})
export class BasicComponent{
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: 'Thành phần cơ bản',
    breadcrumb: ['Home', 'Các thành phần', 'Thành phần cơ bản'],
    desc: 'Một loạt các thành phần cơ bản'
  };
}
