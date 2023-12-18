import { Route } from '@angular/router';

export default [
    { path: '', redirectTo: 'spmt00101', pathMatch: 'full' },
    { path: 'spmt00101', data: { title: 'Tìm Kiếm Sản Phẩm', key: 'spmt00101' }, loadComponent: () => import('./spmt00101/spmt00101.component').then(m => m.Spmt00101Component) },
    { path: 'spmt00201', data: { title: 'Import Sản Phẩm', key: 'spmt00201' }, loadComponent: () => import('./spmt00201/spmt00201.component').then(m => m.Spmt00201Component) },
    { path: 'spmt00501', data: { title: 'Chi Tiết Sản Phẩm', key: 'spmt00501' }, loadComponent: () => import('./spmt00501/spmt00501.component').then(m => m.Spmt00501Component) },
] as Route[];