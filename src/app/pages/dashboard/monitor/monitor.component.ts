import { DecimalPipe, PercentPipe } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, DestroyRef, inject, NgZone, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder } from '@angular/forms';

import AMapLoader from '@amap/amap-jsapi-loader';
import { Gauge, Liquid, RingProgress, TinyArea, WordCloud } from '@antv/g2plot';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzCardModule } from 'ng-zorro-antd/card';
import { inNextTick } from 'ng-zorro-antd/core/util';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { AbsComponent } from '@app/pages/system/abs.component';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NzCardModule, NzBreadCrumbModule, NzGridModule, NzStatisticModule, NzTypographyModule, DecimalPipe, PercentPipe]
})
export class MonitorComponent extends AbsComponent{
  deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;
  override destroyRef = inject(DestroyRef);
 
}
