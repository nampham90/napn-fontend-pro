import { NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { ListOrderComponent } from "./list-order/list-order.component";

@Component({
    selector: 'app-home-order',
    standalone: true,
    templateUrl: './home-order.component.html',
    styleUrl: './home-order.component.less',
    imports: [NzCardModule, NzTabsModule, NgTemplateOutlet, ListOrderComponent]
})
export class HomeOrderComponent {
  

}
