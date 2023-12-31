import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';

@Component({
  selector: 'app-top-progress-bar',
  templateUrl: './top-progress-bar.component.html',
  styleUrls: ['./top-progress-bar.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf]
})
export class TopProgressBarComponent {
  isFetching = false;
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  constructor() {
    this.router.events.subscribe(evt => {
      // Cho biết một sự kiện được kích hoạt trước khi cấu hình định tuyến được tải từng phần.
      if (!this.isFetching && evt instanceof RouteConfigLoadStart) {
        this.isFetching = true;
        this.cdr.markForCheck();
      }
      if (!this.isFetching && evt instanceof NavigationStart) {
        this.isFetching = true;
        this.cdr.markForCheck();
      }
      if (evt instanceof NavigationError || evt instanceof NavigationCancel) {
        this.isFetching = false;
        if (evt instanceof NavigationError) {
        }
        this.cdr.markForCheck();
        return;
      }
      if (!(evt instanceof NavigationEnd || evt instanceof RouteConfigLoadEnd)) {
        return;
      }
      if (this.isFetching) {
        setTimeout(() => {
          this.isFetching = false;
          this.cdr.markForCheck();
        }, 600);
      }
    });
  }
}
