import { Route } from '@angular/router'

export default [
  {
    path: '', redirectTo: 'spin00101', pathMatch: 'full'
  },
  {
    path: 'spin00101', 
    data: {title: "Đăng ký nhập hàng", key: 'spin00101'}, 
    loadComponent:()=> import('./spin00101/spin00101.component').then(m=>m.Spin00101Component)
  },
  {
    path: 'spin00601', 
    data: {title: "Thông tin tồn kho", key: 'spin00601'}, 
    loadComponent:()=> import('./spin00601/spin00601.component').then(m=>m.Spin00601Component)
  },
  {
    path: 'spin00201', 
    data: {title: "Lịch trình hàng đến", key: 'spin00201'}, 
    loadComponent:()=> import('./spin00201/spin00201.component').then(m=>m.Spin00201Component)
  },
  {
    path: 'spin00501', 
    data: {title: "Nhận hàng kiểm định", key: 'spin00501'}, 
    loadComponent:()=> import('./spin00501/spin00501.component').then(m=>m.Spin00501Component)
  },
  {
    path: 'spin00801', 
    data: {title: "Hủy nhập hàng", key: 'spin00801'}, 
    loadComponent:()=> import('./spin00801/spin00801.component').then(m=>m.Spin00801Component)
  }
] as Route[];