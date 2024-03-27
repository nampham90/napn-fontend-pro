import { Route } from '@angular/router';

export default [
    {
        path: '', redirectTo: 'sprp00101', pathMatch: 'full' ,
    },
    {
        path: 'sprp00101', data: { title: 'Báo cáo tài chính', key: 'sprp00101' }, loadComponent: () => import('./sprp00101/sprp00101.component').then(m => m.Sprp00101Component) 
    }
] as Route[]