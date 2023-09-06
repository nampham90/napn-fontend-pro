import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';

import { ExDrawerDrawerService } from '@app/drawer/biz-drawer/ex-drawer-drawer/ex-drawer-drawer.service';
import { PageHeaderType, PageHeaderComponent } from '@shared/components/page-header/page-header.component';
import { ModalBtnStatus } from '@widget/base-modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-ex-drawer',
  templateUrl: './ex-drawer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PageHeaderComponent, NzInputModule, FormsModule, NzButtonModule, NzWaveModule]
})
export class ExDrawerComponent implements OnInit {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: 'Gói ngăn kéo',
    breadcrumb: ['Home', 'Gói ngăn kéo'],
    desc: 'Tôi có nhiều ước mơ lớn giấu trong ngăn kéo nhỏ'
  };
  data = '';
  dataFromDrawer = '';
  destroyRef = inject(DestroyRef);
  constructor(private drawerService: ExDrawerDrawerService, private cdr: ChangeDetectorRef) {}

  showDrawer(): void {
    this.drawerService
      .show({ nzTitle: 'Tạo dịch vụ' }, { name: this.data })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ modalValue, status }) => {
        if (status === ModalBtnStatus.Cancel) {
          return;
        }
        this.dataFromDrawer = modalValue.password;
        this.cdr.markForCheck();
      });
  }

  ngOnInit(): void {}
}
