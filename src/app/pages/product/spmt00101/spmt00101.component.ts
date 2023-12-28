import { Component, OnInit , ChangeDetectionStrategy} from '@angular/core';
import { AbsComponent } from '@app/pages/system/abs.component';
import { PageHeaderComponent, PageHeaderType } from '@app/shared/components/page-header/page-header.component';
@Component({
  selector: 'app-spmt00101',
  templateUrl: './spmt00101.component.html',
  styleUrls: ['./spmt00101.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PageHeaderComponent]
})
export class Spmt00101Component extends AbsComponent implements OnInit{

  showHello: boolean = true;

}
