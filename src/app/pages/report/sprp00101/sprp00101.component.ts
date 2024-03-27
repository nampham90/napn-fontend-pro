import { Component } from '@angular/core';
import { AbsComponent } from '@app/pages/system/abs.component';
import { PageHeaderComponent } from "../../../shared/components/page-header/page-header.component";

@Component({
    selector: 'app-sprp00101',
    standalone: true,
    templateUrl: './sprp00101.component.html',
    styleUrl: './sprp00101.component.less',
    imports: [PageHeaderComponent]
})
export class Sprp00101Component extends AbsComponent{

  override ngOnInit(): void {
      super.ngOnInit();
      
  }



}
