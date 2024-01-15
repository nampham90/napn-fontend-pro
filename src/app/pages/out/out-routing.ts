import { Route } from '@angular/router';

export default [
    { path: '', redirectTo: 'spot00101', pathMatch: 'full' },
    { path: 'spot00101', data: { title: 'Đơn hàng', key: 'spot00101' }, loadComponent: () => import('./spot00101/spot00101.component').then(m => m.Spot00101Component) },


] as Route[];