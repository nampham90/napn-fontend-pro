import { NgClass, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectorRef, Component, DestroyRef, OnInit, ViewChild, computed, inject, input, signal } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzMenuModeType, NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AdDirective, AdDirective as AdDirective_1 } from '@shared/directives/ad.directive';
import { AdComponent, DynamicComponent } from '@app/core/services/types';
import { KhachleComponent } from './khachle/khachle.component';
import { KythuatComponent } from './kythuat/kythuat.component';
import { DoanhnghiepComponent } from './doanhnghiep/doanhnghiep.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import * as Const from '@app/common/const';
import { NhacungcapComponent } from './nhacungcap/nhacungcap.component';
interface TabInterface {
  key: string;
  component: DynamicComponent;
}
@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [NzCardModule,NgTemplateOutlet,NgClass, NzMenuModule, NzButtonModule, NzGridModule, NzTypographyModule, AdDirective_1],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.less'
})
export class AddUserComponent implements OnInit{
  private breakpointObserver = inject(BreakpointObserver);
  private cdr = inject(ChangeDetectorRef)
  @ViewChild(AdDirective, { static: true }) adHost!: AdDirective;
  tabModel: NzMenuModeType = 'inline';

  settingComponent: TabInterface[] = [
    { key: 'khachle', component: new DynamicComponent(KhachleComponent, { label: 'Thêm mới Khách lẻ' }) },
    { key: 'kythuat', component: new DynamicComponent(KythuatComponent, { label: 'Thêm mới Kỷ thuật' }) },
    { key: 'doanhnghiep', component: new DynamicComponent(DoanhnghiepComponent, { label: 'Thêm mới Doanh nghiệp' }) },
    { key: 'nhacungcap', component: new DynamicComponent(NhacungcapComponent, { label: 'Thêm mới Nhà cung cấp' }) },
    
  ];
  destroyRef = inject(DestroyRef);
  menukhachhang : Array<{ key: string; title: string; selected?: boolean }> = [
    {
      key: 'khachle',
      title: 'Thêm mới khách lẻ',
      selected: true
    },
    {
      key: 'kythuat',
      title: 'Thêm mới kỷ thuật',
      selected: false
    },
    {
      selected: false,
      key: 'doanhnghiep',
      title: 'Thêm mới doanh nghiệp'
    }
  ];

  menunhacungcap : Array<{ key: string; title: string; selected?: boolean }> = [
    {
      key: 'nhacungcap',
      title: 'Thêm mới Nhà cung cấp',
      selected: true
    }
  ];

  cuttomSearch = input('', {
    alias: 'department'
  });

  menus = computed(() => {
    let menu: Array<{ key: string; title: string; selected?: boolean }>;
    switch(this.cuttomSearch()) {
      case Const.Khachhangnm : menu = this.menukhachhang ;break;// show thêm khách hàng
      case Const.Nhacungcapnm : menu = this.menunhacungcap; break;
      default: menu = this.menukhachhang 
    }
    return menu;
  })

  currentTitle: string = this.menus()[0].title;
  
  ngOnInit(): void {
    this.to(this.menus()[0]);
    this.obBreakPoint();
  }

  to(item: { key: string; title: string; selected?: boolean }): void {
    const selMenu = this.settingComponent.find(({ key }) => {
      return key === item.key;
    });
    this.currentTitle = selMenu!.component.data.label;
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent<AdComponent>(selMenu!.component.component);
    componentRef.instance.data = selMenu!.component.data;
  }

  obBreakPoint(): void {
    this.breakpointObserver
      .observe(['(max-width: 767px)'])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(result => {
        this.tabModel = result.matches ? 'horizontal' : 'inline';
        this.cdr.markForCheck();
      });
  }

}
