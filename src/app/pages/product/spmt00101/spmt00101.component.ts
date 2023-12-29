import { Component, OnInit , ChangeDetectionStrategy} from '@angular/core';
import { AbsComponent } from '@app/pages/system/abs.component';
import { PageHeaderComponent, PageHeaderType } from '@app/shared/components/page-header/page-header.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { ExampleComponent } from './example.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { DemoSignalComponent } from './demosignals.component';
@Component({
  selector: 'app-spmt00101',
  templateUrl: './spmt00101.component.html',
  styleUrls: ['./spmt00101.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PageHeaderComponent, NzCardModule, ExampleComponent, NzButtonModule, DemoSignalComponent]
})
export class Spmt00101Component extends AbsComponent implements OnInit{

  showHello: boolean = true;
  colors = ["Red", "Blue", "White"];
  myMap = new Map([
    ["firstName", "Angular"],
    ["lastName", "Framework"],
  ])
}
