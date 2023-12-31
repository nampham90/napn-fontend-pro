import { Route } from '@angular/router';

export const appRoutes = [
  { path: '', redirectTo: '/login/login-form', pathMatch: 'full' },
  { path: 'blank', data: {preload: true}, loadChildren: () => import('./layout/blank/blank-routing') },
  { path: 'error404', data: { title: 'Erorr 404', key: 'error404' }, loadComponent: () => import('./pages/page-demo/except/except404/except404.component').then(m => m.Except404Component)},
  { path: 'login', data: { preload: true }, loadChildren: () => import('./pages/login/login-routing') },
  { path: 'default', data: { preload: true }, loadChildren: () => import('./layout/default/default-routing') },
  { path: '**', redirectTo: '/login/login-form' }
] as Route[];
