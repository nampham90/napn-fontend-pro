import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Paymeth, Tmt050Service } from '@app/core/services/http/master/tmt050/tmt050.service';
import { Delimth, Tmt170Service } from '@app/core/services/http/master/tmt170/tmt170.service';
import { AbsComponent } from '@app/pages/system/abs.component';
import { PageHeaderComponent } from '@app/shared/components/page-header/page-header.component';

@Component({
  selector: 'app-spot00101',
  standalone: true,
  imports: [PageHeaderComponent],
  templateUrl: './spot00101.component.html',
  styleUrl: './spot00101.component.less'
})
export class Spot00101Component extends AbsComponent{
  tmt170Service = inject(Tmt170Service);
  tmt050Service = inject(Tmt050Service);

  listPaymeth = signal<Paymeth[]>([]);
  listDelimth = signal<Delimth[]>([]);
  override destroyRef = inject(DestroyRef);
  override ngOnInit(): void {
    super.ngOnInit();
    this.tmt050Service.listPaymethcd()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(listpaymeth => {
       this.listPaymeth.set(listpaymeth);
    });

    this.tmt170Service.listDelimthcd()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(data => {
       this.listDelimth.set(data);
    })
  }

}
