import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbsComponent } from '@app/pages/system/abs.component';
import { PageHeaderComponent } from '@app/shared/components/page-header/page-header.component';
import { NzCardModule } from 'ng-zorro-antd/card';

@Component({
  selector: 'app-spmt00501',
  templateUrl: './spmt00501.component.html',
  styleUrls: ['./spmt00501.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    PageHeaderComponent,
    NzCardModule
  ]
})
export class Spmt00501Component extends AbsComponent implements OnInit {


}
