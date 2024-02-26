import { NgTemplateOutlet } from '@angular/common';
import { Component, DestroyRef, OnInit, computed, inject } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { ListOrderComponent } from "./list-order/list-order.component";
import { Spot00101Service } from '@app/core/services/http/out/spot00101.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ListOrderService } from './list-order/list-order.service';
import { TOT010 } from '@app/model/tot-model/tot010_sts.model';
import { soodno } from '@app/config/constant';

@Component({
    selector: 'app-home-order',
    standalone: true,
    templateUrl: './home-order.component.html',
    styleUrl: './home-order.component.less',
    imports: [NzCardModule, NzTabsModule, NgTemplateOutlet, ListOrderComponent]
})
export class HomeOrderComponent implements OnInit{
    spot00101Service = inject(Spot00101Service);
    listOrderService = inject(ListOrderService);
    destroyRef = inject(DestroyRef);

    totalOrderNew = computed(() => this.listOrderService.totalOrdernew());
    totalOrderQTESTS = computed(() => this.listOrderService.totalOrderQTESTS());
    totalOrderORDSTS = computed(() => this.listOrderService.totalOrderORDSTS());
    totalOrderORDAPPSTS = computed(() => this.listOrderService.totalOrderORDAPPSTS());
    totalOrderPAYSTS = computed(() => this.listOrderService.totalOrderPAYSTS());
    totalOrderSHIPSTS = computed(() => this.listOrderService.totalOrderSHIPSTS());
   


    ngOnInit(): void {
       this.apiOrderStatus();
    }

    apiOrderStatus(): void {
        this.spot00101Service.orderStatus()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(res => {
            this.listOrderService.updateListNew(res.lstnewOd);
            this.listOrderService.updateListQTESTS(res.lstQTESTS)
            this.listOrderService.updateListORDSTS(res.lstORDSTS)
            this.listOrderService.updateListORDAPPSTS(res.lstORDAPPSTS)
            this.listOrderService.updateListPAYSTS(res.lstPAYSTS)
            this.listOrderService.updateListSHIPSTS(res.lstSHIPSTS)
        })
    }
  

}
