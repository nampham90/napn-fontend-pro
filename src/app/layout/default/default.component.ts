import { NgIf, NgTemplateOutlet, AsyncPipe, NgOptimizedImage, NgStyle, NgClass } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, ViewChild, AfterViewInit, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';

import { fadeRouteAnimation } from '@app/animations/fade.animation';
import { SettingDrawerComponent, Theme } from '@app/layout/default/setting-drawer/setting-drawer.component';
import { CollapsedNavWidth, IsFirstLogin, SideNavWidth } from '@config/constant';

import { DriverService } from '@core/services/common/driver.service';
import { WindowService } from '@core/services/common/window.service';
import { LayoutHeadRightMenuComponent } from '@shared/biz-components/layout-components/layout-head-right-menu/layout-head-right-menu.component';
import { SettingInterface, ThemeService } from '@store/common-store/theme.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NavDrawerComponent } from './nav-drawer/nav-drawer.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { TabComponent } from './tab/tab.component';
import { ToolBarComponent } from './tool-bar/tool-bar.component';
import { SplitNavStoreService } from '@app/core/services/store/common-store/split-nav-store.service';
import { Observable } from 'rxjs';
import { ChatComponent } from '@app/shared/components/chat/chat.component';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { TopProgressBarComponent } from '@app/shared/components/top-progress-bar/top-progress-bar.component';
import { Menu } from '@app/core/services/types';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeRouteAnimation],
  standalone: true,
  imports: [
    TopProgressBarComponent,
    NzLayoutModule,
    NgClass,
    NzNoAnimationModule,
    NgStyle,
    SettingDrawerComponent,
    ChatComponent,
    NzMenuModule,
    NzButtonModule,
    NzIconModule,
    AsyncPipe,
    SideNavComponent,
    NgTemplateOutlet,
    ToolBarComponent,
    NzIconModule,
    NzButtonModule,
    NavBarComponent,
    LayoutHeadRightMenuComponent,
    TabComponent,
    RouterOutlet,
    NavDrawerComponent,
    AsyncPipe,
    ChatComponent,
    NgOptimizedImage
  ]
})
export class DefaultComponent implements OnInit, AfterViewInit {
  @ViewChild('navDrawer') navDrawer!: NavDrawerComponent;
  SideNavWidth = SideNavWidth;
  CollapsedNavWidth = CollapsedNavWidth;

  destroyRef = inject(DestroyRef);
  windowService = inject(WindowService); 
  driverService = inject(DriverService);
  themesService = inject(ThemeService);
  splitNavStoreService = inject(SplitNavStoreService);

  isNightTheme$ = this.themesService.getIsNightTheme();
  themesOptions$ = this.themesService.getThemesMode();
  isOverMode$: Observable<boolean> = this.themesService.getIsOverMode();
  isCollapsed$: Observable<boolean> = this.themesService.getIsCollapsed();
  mixinModeLeftNav$ = this.splitNavStoreService.getSplitLeftNavArrayStore();

  showChats = true; // Có hiển thị cửa sổ trò chuyện hay không
  isMixinMode = false; // Đây có phải là một chế độ hỗn hợp?
  isNightTheme = false; // Đây có phải là một chủ đề tối?
  isFixedLeftNav = false; // Có ghim menu bên trái hay không
  isSplitNav = false; // Có nên chia nhỏ menu không
  isCollapsed = false; // Có thu gọn menu bên trái hay không
  isOverMode = false; // Khi cửa sổ trở nên hẹp hơn, thanh điều hướng có chuyển sang chế độ ngăn kéo hay không
  isShowTab = false; // Có hiển thị tab hay không
  isFixedTab = false; // Có ghim tab hay không
  isHasNavArea = false; //Có khu vực menu không
  isHasNavHeadArea = false; // Có khu vực tiêu đề menu không?
  isHasFooterArea = false; // Có vùng đáy không
  isHasTopArea = false; // Có khu vực trên cùng không

  isFixedHead = false; // Có sửa được đầu không
  isSideMode = false; // Cho dù đó là chế độ bên
  isTopMode = false; // Đây có phải là chế độ hàng đầu?
  theme: Theme['key'] = 'dark'; // chế độ chủ đề

  themesOptions!: SettingInterface;
  mixinModeLeftNav: Menu[] = []; // Menu bên trái ở chế độ hòa trộn
  contentMarginTop = '48px';

  changeCollapsed(isCollapsed: boolean): void {
    if (this.isOverMode) {
      this.navDrawer.showDraw();
      return;
    }
    this.isCollapsed = isCollapsed;
    this.themesService.setIsCollapsed(this.isCollapsed);
  }
  // Hoạt hình tuyến đường
  prepareRoute(outlet: RouterOutlet): string {
    return outlet?.activatedRouteData?.['key'];
  }

  judgeMarginTop(): string {
    if (this.isFixedHead && !this.isMixinMode && this.isHasTopArea) {
      return this.isShowTab ? (this.isFixedTab ? '96px' : '48px') : '48px';
    } else {
      return this.isShowTab ? (this.isFixedTab ? '48px' : '0px') : '0px';
    }
  }

  getThemeOptions(): void {
    this.themesOptions$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res => {
      this.themesOptions = res;

      const { fixedTab, fixedHead, hasFooterArea, mode, fixedLeftNav, hasNavArea, hasTopArea, hasNavHeadArea, isShowTab, splitNav, theme } = this.themesOptions;

      this.isMixinMode = mode === 'mixi';
      this.isSideMode = mode === 'side';
      this.isTopMode = mode === 'top';
      this.isFixedLeftNav = fixedLeftNav;
      this.isHasNavArea = hasNavArea;
      this.isHasTopArea = hasTopArea;
      this.isHasNavHeadArea = hasNavHeadArea;
      this.isShowTab = isShowTab;
      this.isSplitNav = splitNav;
      this.theme = theme;
      this.isFixedHead = fixedHead;
      this.isHasFooterArea = hasFooterArea;
      this.isFixedTab = fixedTab;

      this.contentMarginTop = this.judgeMarginTop();
    });

    this.isCollapsed$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res => (this.isCollapsed = res));
    this.isOverMode$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res => (this.isOverMode = res));
    this.isNightTheme$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res => (this.isNightTheme = res));
    this.mixinModeLeftNav$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res => (this.mixinModeLeftNav = res));
  }

  ngAfterViewInit(): void {
    if (this.windowService.getStorage(IsFirstLogin) === 'false') {
      return;
    }
    this.windowService.setStorage(IsFirstLogin, 'false');
    this.driverService.load();
  }

  ngOnInit(): void {
    this.getThemeOptions();
  }
}
