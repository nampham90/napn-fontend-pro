import { Component, DestroyRef, OnInit, computed, inject, input, signal } from '@angular/core';
import { ProductStoreService } from '../../product-store.service';
import { TIN040 } from '@app/model/tin-model/tin040_plantdl.model';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { TMT140 } from '@app/model/tmt-model/tmt140_qualitie.model';
import { Tmt140Service } from '@app/core/services/http/master/tmt140/tmt140.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NzInputModule } from 'ng-zorro-antd/input';
import { InputCurrencyComponent } from '@app/shared/components/input-currency/input-currency.component';
import { CurrencyPipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [NzGridModule, NzInputModule,NzSelectModule, NzInputNumberModule, NzButtonModule,FormsModule,InputCurrencyComponent],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.less',
  providers: [CurrencyPipe, DecimalPipe ]
})
export class ProductItemComponent implements OnInit{

  destroyRef = inject(DestroyRef);
  productStore = inject(ProductStoreService)
  private tmt140Service = inject(Tmt140Service);
  tin040!: TIN040;

  qtycds = signal<TMT140[]>([]);

  _product = input(this.tin040, 
    { 
      alias: 'product',
      transform: (_product: TIN040) => _product
  });

  SIPRICE = computed(() => (this._product().SIPRICE/1000));

  changeSELLPIRCE($event: number) {
    this._product().SIPRICE =  ($event*1000); 
  }

  ngOnInit(): void {
    this.apiGetlistQualities();
  }

  apiGetlistQualities():void {
    this.tmt140Service.listQualities()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(res => {
      this.qtycds.set(res);
    })
  }

  change($event: Event) {

  }

  onRemove() {
    this.productStore.removeProduct(this._product());
  }
    
  changeGua($event: any) {
    
  }

}
