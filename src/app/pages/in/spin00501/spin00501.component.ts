import { Component, OnInit, computed, inject } from '@angular/core';
import { AbsComponent } from '@app/pages/system/abs.component';
import { PageHeaderComponent } from "../../../shared/components/page-header/page-header.component";
import { NzCardModule } from 'ng-zorro-antd/card';
import { FormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CurrencyPipe, NgStyle } from '@angular/common';
import { AntTableComponent } from '@app/shared/components/ant-table/ant-table.component';
import { CardTableWrapComponent } from '@app/shared/components/card-table-wrap/card-table-wrap.component';
import { AuthDirective } from '@app/shared/directives/auth.directive';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Tin050Service } from '../service/tin050.service';

@Component({
    selector: 'app-spin00501',
    standalone: true,
    templateUrl: './spin00501.component.html',
    styleUrl: './spin00501.component.less',
    imports: [PageHeaderComponent,
              NzCardModule,
              NzGridModule,
              NzFormModule,
              FormsModule,
              NzIconModule,
              NzSelectModule,
              NzInputModule,
              NzButtonModule,
              CardTableWrapComponent,
              AntTableComponent,
              CurrencyPipe,
              NgStyle,
              AuthDirective
    ]
})
export class Spin00501Component extends AbsComponent implements OnInit{

  private tin050Service = inject(Tin050Service);


  tin050 = computed(() => this.tin050Service.tin050());

  override ngOnInit(): void {
    super.ngOnInit()

    console.log(this.tin050());

  }
  
}
