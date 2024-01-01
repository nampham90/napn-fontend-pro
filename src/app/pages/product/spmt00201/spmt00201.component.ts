import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbsComponent } from '@app/pages/system/abs.component';
import { PageHeaderComponent } from '@app/shared/components/page-header/page-header.component';

@Component({
  selector: 'app-spmt00201',
  templateUrl: './spmt00201.component.html',
  styleUrls: ['./spmt00201.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PageHeaderComponent]
  
})
export class Spmt00201Component extends AbsComponent implements OnInit {



}
