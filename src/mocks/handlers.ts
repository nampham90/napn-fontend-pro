import { http, HttpResponse, passthrough } from 'msw';

import { department } from './business/department';
import { login } from './business/login';
import { menu } from './business/menu';
import { role } from './business/role';
import { user } from './business/user';
import { spot00101 } from './business/out/spot00101';

export const handlers = [
  // system
  login, // Đăng nhập
  ...menu, // menu
  ...role, // danh sách vai trò
  ...user, // Danh sách người dùng
  ...department, // phòng ban

  /// xuất hàng
  ...spot00101,/// out/ đơn hàng

  http.get('https://provinces.open-api.vn/api/?depth=2', () => passthrough()),
  http.get(/.*\.(js|svg|css|jpg|gif|png|woff2)$/, () => passthrough()),
  http.get('https://vdata.amap.com/tiles', () => passthrough()),
  http.get('https://restapi.amap.com/v3/log/init', () => passthrough()),
  http.get('http://api.map.baidu.com/*', () => passthrough()),
  http.get('http://maponline2.bdimg.com/tile/', () => passthrough()),
  http.get('https://miao.baidu.com/abdr', () => passthrough()),
  http.get('http://maponline0.bdimg.com/tile/', () => passthrough()),
  http.get('http://maponline3.bdimg.com/tile/', () => passthrough()),
  http.get('http://maponline1.bdimg.com/tile/', () => passthrough()),
  http.get('http://webapi.amap.com/count', () => passthrough()),
  http.get('https://webapi.amap.com/count', () => passthrough()),
  http.get('https://webapi.amap.com/theme/v1.3/openhand.cur', () => passthrough()),
  http.get('https://webapi.amap.com/style2', () => passthrough()),
  http.get('https://sp.tinymce.com/i', () => passthrough()),
  http.post('https://cdn.tiny.cloud/1/95b1w09g3ruzin5ylg5inr4afxzm3oxotroc0ofkh8pwcefz/tinymce/6.8.2-45/cdn-init', () => passthrough()),
  http.post('https://miao.baidu.com/abdr', () => passthrough()),
  http.post('http://maponline2.bdimg.com/tile/', () => passthrough()),
  http.get('https://webapi.amap.com/maps', () => passthrough())
];
