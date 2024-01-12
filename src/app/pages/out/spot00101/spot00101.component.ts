import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Tmt050, Tmt050Service } from '@app/core/services/http/master/tmt050/tmt050.service';
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
  tmt050Service = inject(Tmt050Service);

  listPaymeth = signal<Tmt050[]>([]);
  listDelimth = signal<Tmt050[]>([]);
  override destroyRef = inject(DestroyRef);
  override ngOnInit(): void {
    super.ngOnInit();
    this.tmt050Service.listRcdkbn('0002')
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(listpaymeth => {
       this.listPaymeth.set(listpaymeth);
    });

    this.tmt050Service.listRcdkbn('0001')
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(data => {
       this.listDelimth.set(data);
    })
  }

}
