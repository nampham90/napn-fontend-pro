import { Route } from '@angular/router';

import { ActionCode } from '@config/actionCode';

export default [
  { path: '', data: { title: 'Thao tác tab', key: 'tabs' }, loadComponent: () => import('./tabs.component').then(m => m.TabsComponent) },
  {
    path: 'example-detail',
    data: { newTab: 'true', authCode: ActionCode.TabsDetail, title: 'Chi tiết bản demo', key: 'example-detail' },
    loadComponent: () => import('./detail/detail.component').then(m => m.DetailComponent)
  }
] as Route[];
