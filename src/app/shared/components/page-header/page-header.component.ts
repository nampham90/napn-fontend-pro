import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, Output, TemplateRef, inject } from '@angular/core';
import { Router } from '@angular/router';

import { ThemeService } from '@store/common-store/theme.service';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';

export interface PageHeaderType {
  title: string;
  desc: string | TemplateRef<NzSafeAny>;
  extra: string | TemplateRef<NzSafeAny>;
  breadcrumb: string[];
  footer: string | TemplateRef<NzSafeAny>;
}

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NzPageHeaderModule, NzBreadCrumbModule, NgFor, NzOutletModule, NgIf]
})
export class PageHeaderComponent {
  private themesService = inject(ThemeService);
   private router = inject(Router);
  @Input() backTpl!: TemplateRef<NzSafeAny> | null;
  @Input() pageHeaderInfo: Partial<PageHeaderType> = {};
  @Input() backUrl = '';
  @Input() extraTpl: TemplateRef<NzSafeAny> | undefined;
  themesOptions$ = this.themesService.getThemesMode();


  back(): void {
    this.router.navigateByUrl(this.backUrl);
  }
}
