import { http, HttpResponse } from 'msw';

const menuListFromUrl = http.post('/site/api/menu/ant100PostUrlParams',()=> {
    return HttpResponse.json({
        "code": 0,
        "msg": "SUCCESS",
        "data": [
            {
                "stt": 1,
                "title1": "Trang chủ",
                "title2": "Trang chủ",
                "idyoutube": ""
            },
            {
                "stt": 2,
                "title1": "Xuất hàng",
                "title2": "Xuất hàng",
                "idyoutube": ""
            },
            {
                "stt": 3,
                "title1": "Đơn hàng",
                "title2": "Đơn hàng",
                "idyoutube": ""
            }
        ]
    });
})

const menuList = http.get('/site/api/sysPermission/menu/1', () => {
  return HttpResponse.json({
    code: 0,
    msg: 'SUCCESS',
    data: [
      {
          "id": "632aaa31c8093b9a2007d144",
          "lang": "vi",
          "menuName": "Trang thành công",
          "code": "default:page-demo:result:success",
          "fatherId": "632aaa31c8093b9a2007d188",
          "orderNum": 1,
          "path": "/default/page-demo/result/success",
          "menuType": "C",
          "visible": 0,
          "status": 1,
          "newLinkFlag": 0,
          "alIcon": null,
          "icon": "check-circle",
          "createdAt": "2023-10-23T07:11:47.000Z",
          "updatedAt": "2023-10-23T07:11:47.000Z"
      },
      {
          "id": "632aaa31c8093b9a2007d145",
          "lang": "vi",
          "menuName": "Quản lý tài khoản",
          "code": "default:system:account",
          "fatherId": "632aaa31c8093b9a2007d194",
          "orderNum": 1,
          "path": "/default/system/account",
          "menuType": "C",
          "visible": 1,
          "status": 1,
          "newLinkFlag": 0,
          "alIcon": "",
          "icon": "user",
          "createdAt": "2023-10-23T07:11:47.000Z",
          "updatedAt": "2023-10-23T07:11:47.000Z"
      },
      {
          "id": "632aaa31c8093b9a2007d148",
          "lang": "vi",
          "menuName": "Quản lý bộ phận đã thêm",
          "code": "default:system:dept:add",
          "fatherId": "632aaa31c8093b9a2007d18a",
          "orderNum": 1,
          "path": "",
          "menuType": "F",
          "visible": 0,
          "status": 1,
          "newLinkFlag": 0,
          "alIcon": null,
          "icon": null,
          "createdAt": "2023-10-23T07:11:47.000Z",
          "updatedAt": "2023-10-23T07:11:47.000Z"
      },
      {
          "id": "632aaa31c8093b9a2007d14a",
          "lang": "vi",
          "menuName": "Quản lý menu đã được thêm vào",
          "code": "default:system:menu:add",
          "fatherId": "632aaa31c8093b9a2007d17f",
          "orderNum": 1,
          "path": null,
          "menuType": "F",
          "visible": 1,
          "status": 1,
          "newLinkFlag": 0,
          "alIcon": null,
          "icon": null,
          "createdAt": "2023-10-23T07:11:47.000Z",
          "updatedAt": "2023-10-23T07:11:47.000Z"
      },
      {
          "id": "632aaa31c8093b9a2007d14b",
          "lang": "vi",
          "menuName": "Trang phân tích",
          "code": "default:dashboard:analysis",
          "fatherId": "632aaa31c8093b9a2007d155",
          "orderNum": 1,
          "path": "/default/dashboard/analysis",
          "menuType": "C",
          "visible": 1,
          "status": 1,
          "newLinkFlag": 0,
          "alIcon": "",
          "icon": "fund",
          "createdAt": "2023-10-23T07:11:47.000Z",
          "updatedAt": "2023-10-23T07:11:47.000Z"
      },
      {
          "id": "632aaa31c8093b9a2007d14c",
          "lang": "vi",
          "menuName": "Quản lý vai trò mới",
          "code": "default:system:role-manager:add",
          "fatherId": "632aaa31c8093b9a2007d169",
          "orderNum": 1,
          "path": "",
          "menuType": "F",
          "visible": 0,
          "status": 1,
          "newLinkFlag": 0,
          "alIcon": null,
          "icon": null,
          "createdAt": "2023-10-23T07:11:47.000Z",
          "updatedAt": "2023-10-23T07:11:47.000Z"
      },
      {
          "id": "632aaa31c8093b9a2007d154",
          "lang": "vi",
          "menuName": "Trung tâm cá nhân",
          "code": "default:page-demo:personal:personal-center",
          "fatherId": "632aaa31c8093b9a2007d193",
          "orderNum": 1,
          "path": "/default/page-demo/personal/personal-center",
          "menuType": "C",
          "visible": 0,
          "status": 1,
          "newLinkFlag": 0,
          "alIcon": null,
          "icon": "user",
          "createdAt": "2023-10-23T07:11:47.000Z",
          "updatedAt": "2023-10-23T07:11:47.000Z"
      },
      {
          "id": "632aaa31c8093b9a2007d155",
          "lang": "vi",
          "menuName": "Dashboard",
          "code": "default:dashboard",
          "fatherId": "0",
          "orderNum": 1,
          "path": "/default/dashboard",
          "menuType": "C",
          "visible": 1,
          "status": 1,
          "newLinkFlag": 0,
          "alIcon": "",
          "icon": "dashboard",
          "createdAt": "2023-10-23T07:11:47.000Z",
          "updatedAt": "2023-10-23T07:11:47.000Z"
      },
      {
          "id": "632aaa31c8093b9a2007d158",
          "lang": "vi",
          "menuName": "Đã thêm quản lý tài khoản",
          "code": "default:system:account:add",
          "fatherId": "632aaa31c8093b9a2007d145",
          "orderNum": 1,
          "path": "",
          "menuType": "F",
          "visible": 0,
          "status": 1,
          "newLinkFlag": 0,
          "alIcon": null,
          "icon": null,
          "createdAt": "2023-10-23T07:11:47.000Z",
          "updatedAt": "2023-10-23T07:11:47.000Z"
      },
      {
          "id": "632aaa31c8093b9a2007d15b",
          "lang": "vi",
          "menuName": "403",
          "code": "default:page-demo:except:except403",
          "fatherId": "632aaa31c8093b9a2007d191",
          "orderNum": 1,
          "path": "/default/page-demo/except/except403",
          "menuType": "C",
          "visible": 0,
          "status": 1,
          "newLinkFlag": 0,
          "alIcon": null,
          "icon": "warning",
          "createdAt": "2023-10-23T07:11:47.000Z",
          "updatedAt": "2023-10-23T07:11:47.000Z"
      },
      {
          "id": "632aaa31c8093b9a2007d15f",
          "lang": "vi",
          "menuName": "Trang",
          "code": "default:page-demo",
          "fatherId": "0",
          "orderNum": 2,
          "path": "/default/page-demo",
          "menuType": "C",
          "visible": 1,
          "status": 1,
          "newLinkFlag": 0,
          "alIcon": null,
          "icon": "appstore",
          "createdAt": "2023-10-23T07:11:47.000Z",
          "updatedAt": "2023-10-23T07:11:47.000Z"
      },
      {
          "id": "632aaa31c8093b9a2007d161",
          "lang": "vi",
          "menuName": "Thiết lập cá nhân",
          "code": "default:page-demo:personal:personal-setting",
          "fatherId": "632aaa31c8093b9a2007d193",
          "orderNum": 2,
          "path": "/default/page-demo/personal/personal-setting",
          "menuType": "C",
          "visible": 0,
          "status": 1,
          "newLinkFlag": 0,
          "alIcon": "",
          "icon": "user",
          "createdAt": "2023-10-23T07:11:47.000Z",
          "updatedAt": "2023-10-23T07:11:47.000Z"
      },
      {
          "id": "632aaa31c8093b9a2007d164",
          "lang": "vi",
          "menuName": "Quản lý tài khoản Edit",
          "code": "default:system:account:edit",
          "fatherId": "632aaa31c8093b9a2007d145",
          "orderNum": 2,
          "path": "",
          "menuType": "F",
          "visible": 0,
          "status": 1,
          "newLinkFlag": 0,
          "alIcon": null,
          "icon": null,
          "createdAt": "2023-10-23T07:11:47.000Z",
          "updatedAt": "2023-10-23T07:11:47.000Z"
      },
      {
          "id": "632aaa31c8093b9a2007d167",
          "lang": "vi",
          "menuName": "404",
          "code": "default:page-demo:except:except404",
          "fatherId": "632aaa31c8093b9a2007d191",
          "orderNum": 2,
          "path": "/default/page-demo/except/except404",
          "menuType": "C",
          "visible": 1,
          "status": 1,
          "newLinkFlag": 0,
          "alIcon": null,
          "icon": "warning",
          "createdAt": "2023-10-23T07:11:47.000Z",
          "updatedAt": "2023-10-23T07:11:47.000Z"
      },
      {
          "id": "632aaa31c8093b9a2007d169",
          "lang": "vi",
          "menuName": "Quản lý vai trò",
          "code": "default:system:role-manager",
          "fatherId": "632aaa31c8093b9a2007d194",
          "orderNum": 2,
          "path": "/default/system/role-manager",
          "menuType": "C",
          "visible": 1,
          "status": 1,
          "newLinkFlag": 0,
          "alIcon": "",
          "icon": "up-circle",
          "createdAt": "2023-10-23T07:11:47.000Z",
          "updatedAt": "2023-10-23T07:11:47.000Z"
      },
      {
          "id": "632aaa31c8093b9a2007d16a",
          "lang": "vi",
          "menuName": "Trang thất bại",
          "code": "default:page-demo:result:fail",
          "fatherId": "632aaa31c8093b9a2007d188",
          "orderNum": 2,
          "path": "/default/page-demo/result/fail",
          "menuType": "C",
          "visible": 0,
          "status": 1,
          "newLinkFlag": 0,
          "alIcon": null,
          "icon": "check-circle",
          "createdAt": "2023-10-23T07:11:47.000Z",
          "updatedAt": "2023-10-23T07:11:47.000Z"
      },
      {
          "id": "632aaa31c8093b9a2007d16d",
          "lang": "vi",
          "menuName": "Biên tập viên quản lý bộ phận",
          "code": "default:system:dept:edit",
          "fatherId": "632aaa31c8093b9a2007d18a",
          "orderNum": 2,
          "path": "",
          "menuType": "F",
          "visible": 0,
          "status": 1,
          "newLinkFlag": 0,
          "alIcon": null,
          "icon": null,
          "createdAt": "2023-10-23T07:11:47.000Z",
          "updatedAt": "2023-10-23T07:11:47.000Z"
      },
      {
          "id": "632aaa31c8093b9a2007d16f",
          "lang": "vi",
          "menuName": "Trình chỉnh sửa quản lý menu",
          "code": "default:system:menu:edit",
          "fatherId": "632aaa31c8093b9a2007d17f",
          "orderNum": 2,
          "path": null,
          "menuType": "F",
          "visible": 0,
          "status": 1,
          "newLinkFlag": 0,
          "alIcon": null,
          "icon": null,
          "createdAt": "2023-10-23T07:11:47.000Z",
          "updatedAt": "2023-10-23T07:11:47.000Z"
      },
      {
          "id": "632aaa31c8093b9a2007d170",
          "lang": "vi",
          "menuName": "Trang giám sát",
          "code": "default:dashboard:monitor",
          "fatherId": "632aaa31c8093b9a2007d155",
          "orderNum": 2,
          "path": "/default/dashboard/monitor",
          "menuType": "C",
          "visible": 1,
          "status": 1,
          "newLinkFlag": 0,
          "alIcon": null,
          "icon": "fund",
          "createdAt": "2023-10-23T07:11:47.000Z",
          "updatedAt": "2023-10-23T07:11:47.000Z"
      },
      {
          "id": "632aaa31c8093b9a2007d171",
          "lang": "vi",
          "menuName": "Biên tập viên quản lý vai trò",
          "code": "default:system:role-manager:edit",
          "fatherId": "632aaa31c8093b9a2007d169",
          "orderNum": 2,
          "path": "",
          "menuType": "F",
          "visible": 0,
          "status": 1,
          "newLinkFlag": 0,
          "alIcon": null,
          "icon": null,
          "createdAt": "2023-10-23T07:11:47.000Z",
          "updatedAt": "2023-10-23T07:11:47.000Z"
      },
      {
          "id": "632aaa31c8093b9a2007d176",
          "lang": "vi",
          "menuName": "500",
          "code": "default:page-demo:except:except500",
          "fatherId": "632aaa31c8093b9a2007d191",
          "orderNum": 3,
          "path": "/default/page-demo/except/except500",
          "menuType": "C",
          "visible": 0,
          "status": 1,
          "newLinkFlag": 0,
          "alIcon": null,
          "icon": "warning",
          "createdAt": "2023-10-23T07:11:47.000Z",
          "updatedAt": "2023-10-23T07:11:47.000Z"
      },
      {
          "id": "632aaa31c8093b9a2007d177",
          "lang": "vi",
          "menuName": "Quản lý tài khoản xóa",
          "code": "default:system:account:del",
          "fatherId": "632aaa31c8093b9a2007d145",
          "orderNum": 3,
          "path": "",
          "menuType": "F",
          "visible": 0,
          "status": 1,
          "newLinkFlag": 0,
          "alIcon": null,
          "icon": null,
          "createdAt": "2023-10-23T07:11:47.000Z",
          "updatedAt": "2023-10-23T07:11:47.000Z"
      },
      {
          "id": "632aaa31c8093b9a2007d179",
          "lang": "vi",
          "menuName": "Quản lý bộ phận xóa",
          "code": "default:system:dept:del",
          "fatherId": "632aaa31c8093b9a2007d18a",
          "orderNum": 3,
          "path": "",
          "menuType": "F",
          "visible": 0,
          "status": 1,
          "newLinkFlag": 0,
          "alIcon": null,
          "icon": null,
          "createdAt": "2023-10-23T07:11:47.000Z",
          "updatedAt": "2023-10-23T07:11:47.000Z"
      },
      {
          "id": "632aaa31c8093b9a2007d17b",
          "lang": "vi",
          "menuName": "Quản lý menu xóa",
          "code": "default:system:menu:del",
          "fatherId": "632aaa31c8093b9a2007d17f",
          "orderNum": 3,
          "path": null,
          "menuType": "F",
          "visible": 0,
          "status": 1,
          "newLinkFlag": 0,
          "alIcon": null,
          "icon": null,
          "createdAt": "2023-10-23T07:11:47.000Z",
          "updatedAt": "2023-10-23T07:11:47.000Z"
      },
      {
          "id": "632aaa31c8093b9a2007d17c",
          "lang": "vi",
          "menuName": "Bàn làm việc",
          "code": "default:dashboard:workbench",
          "fatherId": "632aaa31c8093b9a2007d155",
          "orderNum": 3,
          "path": "/default/dashboard/workbench",
          "menuType": "C",
          "visible": 1,
          "status": 1,
          "newLinkFlag": 0,
          "alIcon": null,
          "icon": "appstore",
          "createdAt": "2023-10-23T07:11:47.000Z",
          "updatedAt": "2023-10-23T07:11:47.000Z"
      },
      {
          "id": "632aaa31c8093b9a2007d17d",
          "lang": "vi",
          "menuName": "Quản lý vai trò xóa",
          "code": "default:system:role-manager:del",
          "fatherId": "632aaa31c8093b9a2007d169",
          "orderNum": 3,
          "path": "",
          "menuType": "F",
          "visible": 0,
          "status": 1,
          "newLinkFlag": 0,
          "alIcon": null,
          "icon": null,
          "createdAt": "2023-10-23T07:11:47.000Z",
          "updatedAt": "2023-10-23T07:11:47.000Z"
      },
      {
          "id": "632aaa31c8093b9a2007d17f",
          "lang": "vi",
          "menuName": "Quản lý menu",
          "code": "default:system:menu",
          "fatherId": "632aaa31c8093b9a2007d194",
          "orderNum": 3,
          "path": "/default/system/menu",
          "menuType": "C",
          "visible": 1,
          "status": 1,
          "newLinkFlag": 0,
          "alIcon": "",
          "icon": "menu",
          "createdAt": "2023-10-23T07:11:47.000Z",
          "updatedAt": "2023-10-23T07:11:47.000Z"
      },
      {
          "id": "632aaa31c8093b9a2007d183",
          "lang": "vi",
          "menuName": "Quản lý menu thêm cấp dưới",
          "code": "default:system:menu:addlowlevel",
          "fatherId": "632aaa31c8093b9a2007d17f",
          "orderNum": 4,
          "path": "",
          "menuType": "F",
          "visible": 0,
          "status": 1,
          "newLinkFlag": 0,
          "alIcon": null,
          "icon": null,
          "createdAt": "2023-10-23T07:11:47.000Z",
          "updatedAt": "2023-10-23T07:11:47.000Z"
      },
      {
          "id": "632aaa31c8093b9a2007d184",
          "lang": "vi",
          "menuName": "Quản lý vai trò thiết lập các vai trò",
          "code": "default:system:role-manager:set-role",
          "fatherId": "632aaa31c8093b9a2007d169",
          "orderNum": 4,
          "path": "",
          "menuType": "F",
          "visible": 0,
          "status": 1,
          "newLinkFlag": 0,
          "alIcon": null,
          "icon": null,
          "createdAt": "2023-10-23T07:11:47.000Z",
          "updatedAt": "2023-10-23T07:11:47.000Z"
      },
      {
          "id": "632aaa31c8093b9a2007d186",
          "lang": "vi",
          "menuName": "Thêm cấp dưới vào quản lý bộ phận",
          "code": "default:system:dept:addlowlevel",
          "fatherId": "632aaa31c8093b9a2007d18a",
          "orderNum": 4,
          "path": "",
          "menuType": "F",
          "visible": 0,
          "status": 1,
          "newLinkFlag": 0,
          "alIcon": null,
          "icon": null,
          "createdAt": "2023-10-23T07:11:47.000Z",
          "updatedAt": "2023-10-23T07:11:47.000Z"
      },
      {
          "id": "632aaa31c8093b9a2007d188",
          "lang": "vi",
          "menuName": "Trang kết quả",
          "code": "default:page-demo:result",
          "fatherId": "632aaa31c8093b9a2007d15f",
          "orderNum": 4,
          "path": "/default/page-demo/result",
          "menuType": "C",
          "visible": 0,
          "status": 1,
          "newLinkFlag": 0,
          "alIcon": null,
          "icon": "check-circle",
          "createdAt": "2023-10-23T07:11:47.000Z",
          "updatedAt": "2023-10-23T07:11:47.000Z"
      },
      {
          "id": "632aaa31c8093b9a2007d18a",
          "lang": "vi",
          "menuName": "Quản lý bộ phận",
          "code": "default:system:dept",
          "fatherId": "632aaa31c8093b9a2007d194",
          "orderNum": 4,
          "path": "/default/system/dept",
          "menuType": "C",
          "visible": 1,
          "status": 1,
          "newLinkFlag": 0,
          "alIcon": "",
          "icon": "border-outer",
          "createdAt": "2023-10-23T07:11:47.000Z",
          "updatedAt": "2023-10-23T07:11:47.000Z"
      },
      {
          "id": "632aaa31c8093b9a2007d18b",
          "lang": "vi",
          "menuName": "Lỗi mạng",
          "code": "default:page-demo:except:network-error",
          "fatherId": "632aaa31c8093b9a2007d191",
          "orderNum": 4,
          "path": "/default/page-demo/except/network-error",
          "menuType": "C",
          "visible": 0,
          "status": 1,
          "newLinkFlag": 0,
          "alIcon": "",
          "icon": "warning",
          "createdAt": "2023-10-23T07:11:47.000Z",
          "updatedAt": "2023-10-23T07:11:47.000Z"
      },
      {
          "id": "632aaa31c8093b9a2007d190",
          "lang": "vi",
          "menuName": "không có dữ liệu",
          "code": "default:page-demo:except:no-data",
          "fatherId": "632aaa31c8093b9a2007d191",
          "orderNum": 5,
          "path": "/default/page-demo/except/no-data",
          "menuType": "C",
          "visible": 0,
          "status": 1,
          "newLinkFlag": 0,
          "alIcon": null,
          "icon": "warning",
          "createdAt": "2023-10-23T07:11:47.000Z",
          "updatedAt": "2023-10-23T07:11:47.000Z"
      },
      {
          "id": "632aaa31c8093b9a2007d191",
          "lang": "vi",
          "menuName": "trang ngoại lệ",
          "code": "default:page-demo:except",
          "fatherId": "632aaa31c8093b9a2007d15f",
          "orderNum": 5,
          "path": "/default/page-demo/except",
          "menuType": "C",
          "visible": 0,
          "status": 1,
          "newLinkFlag": 0,
          "alIcon": null,
          "icon": "warning",
          "createdAt": "2023-10-23T07:11:47.000Z",
          "updatedAt": "2023-10-23T07:11:47.000Z"
      },
      {
          "id": "632aaa31c8093b9a2007d193",
          "lang": "vi",
          "menuName": "Trang cá nhân",
          "code": "default:page-demo:personal",
          "fatherId": "632aaa31c8093b9a2007d15f",
          "orderNum": 6,
          "path": "/default/page-demo/personal",
          "menuType": "C",
          "visible": 0,
          "status": 1,
          "newLinkFlag": 0,
          "alIcon": null,
          "icon": "user",
          "createdAt": "2023-10-23T07:11:47.000Z",
          "updatedAt": "2023-10-23T07:11:47.000Z"
      },
      {
          "id": "632aaa31c8093b9a2007d194",
          "lang": "vi",
          "menuName": "Hệ thống",
          "code": "default:system",
          "fatherId": "0",
          "orderNum": 6,
          "path": "/default/system",
          "menuType": "C",
          "visible": 1,
          "status": 1,
          "newLinkFlag": 0,
          "alIcon": "",
          "icon": "setting",
          "createdAt": "2023-10-23T07:11:47.000Z",
          "updatedAt": "2023-10-23T07:11:47.000Z"
      },
      {
          "id": "632aaa31c8093b9a2007d199",
          "lang": "vi",
          "menuName": "About",
          "code": "default:about",
          "fatherId": "0",
          "orderNum": 7,
          "path": "/default/about",
          "menuType": "C",
          "visible": 1,
          "status": 1,
          "newLinkFlag": 0,
          "alIcon": "icon-medium",
          "icon": "",
          "createdAt": "2023-10-23T07:11:47.000Z",
          "updatedAt": "2023-10-23T07:11:47.000Z"
      },
      {
          "id": "6333e539021398275a67d83d",
          "lang": "vi",
          "menuName": "Demo Socket.IO",
          "code": "default:dashboard:demo",
          "fatherId": "632aaa31c8093b9a2007d155",
          "orderNum": 4,
          "path": "/default/dashboard/demo",
          "menuType": "C",
          "visible": 0,
          "status": 0,
          "newLinkFlag": 0,
          "alIcon": null,
          "icon": "up-circle",
          "createdAt": "2023-10-23T07:11:47.000Z",
          "updatedAt": "2023-12-29T00:42:53.000Z"
      },
      {
          "id": "63343f59a5ada435bef9f4d6",
          "lang": "vi",
          "menuName": "Quản lý dữ liệu SC",
          "code": "default:system:datasc",
          "fatherId": "632aaa31c8093b9a2007d194",
          "orderNum": 5,
          "path": "/default/system/datasc",
          "menuType": "C",
          "visible": 1,
          "status": 1,
          "newLinkFlag": 0,
          "alIcon": null,
          "icon": "diff",
          "createdAt": "2023-10-23T07:11:47.000Z",
          "updatedAt": "2023-10-23T07:11:47.000Z"
      },
      {
          "id": "63344034a5ada435bef9f4dc",
          "lang": "vi",
          "menuName": "Quản lý dữ liệu SC Add",
          "code": "default:system:datasc:add",
          "fatherId": "63343f59a5ada435bef9f4d6",
          "orderNum": 1,
          "path": null,
          "menuType": "F",
          "visible": null,
          "status": 1,
          "newLinkFlag": null,
          "alIcon": null,
          "icon": null,
          "createdAt": "2023-10-23T07:11:47.000Z",
          "updatedAt": "2023-10-23T07:11:47.000Z"
      },
      {
          "id": "63344067a5ada435bef9f4df",
          "lang": "vi",
          "menuName": "Quản lý dữ liệu SC Edit",
          "code": "default:system:datasc:edit",
          "fatherId": "63343f59a5ada435bef9f4d6",
          "orderNum": 2,
          "path": null,
          "menuType": "F",
          "visible": null,
          "status": 1,
          "newLinkFlag": null,
          "alIcon": null,
          "icon": null,
          "createdAt": "2023-10-23T07:11:47.000Z",
          "updatedAt": "2023-10-23T07:11:47.000Z"
      },
      {
          "id": "63344084a5ada435bef9f4e2",
          "lang": "vi",
          "menuName": "Quản lý dữ liệu SC Del",
          "code": "default:system:datasc:del",
          "fatherId": "63343f59a5ada435bef9f4d6",
          "orderNum": 3,
          "path": null,
          "menuType": "F",
          "visible": null,
          "status": 1,
          "newLinkFlag": null,
          "alIcon": null,
          "icon": null,
          "createdAt": "2023-10-23T07:11:47.000Z",
          "updatedAt": "2023-10-23T07:11:47.000Z"
      },
      {
          "id": "6423a489bab829e7784d6047",
          "lang": "vi",
          "menuName": "Hướng dẫn",
          "code": "default:system:huongdan",
          "fatherId": "632aaa31c8093b9a2007d194",
          "orderNum": 8,
          "path": "/default/system/huongdan",
          "menuType": "C",
          "visible": 1,
          "status": 1,
          "newLinkFlag": 0,
          "alIcon": null,
          "icon": "youtube",
          "createdAt": "2023-10-23T07:11:47.000Z",
          "updatedAt": "2023-10-23T07:11:47.000Z"
      },
      {
          "id": "6423d78c2959d50e73fb6767",
          "lang": "vi",
          "menuName": "Thêm mới",
          "code": "default:system:huongdan:add",
          "fatherId": "6423a489bab829e7784d6047",
          "orderNum": 1,
          "path": null,
          "menuType": "F",
          "visible": null,
          "status": 1,
          "newLinkFlag": null,
          "alIcon": null,
          "icon": null,
          "createdAt": "2023-10-23T07:11:47.000Z",
          "updatedAt": "2023-10-23T07:11:47.000Z"
      },
      {
          "id": "6423d7b62959d50e73fb676a",
          "lang": "vi",
          "menuName": "Xóa tất cả",
          "code": "default:system:huongdan:allDel",
          "fatherId": "6423a489bab829e7784d6047",
          "orderNum": 2,
          "path": null,
          "menuType": "F",
          "visible": null,
          "status": 1,
          "newLinkFlag": null,
          "alIcon": null,
          "icon": null,
          "createdAt": "2023-10-23T07:11:47.000Z",
          "updatedAt": "2023-10-23T07:11:47.000Z"
      },
      {
          "id": "6423d7d52959d50e73fb676d",
          "lang": "vi",
          "menuName": "Cập nhật",
          "code": "default:system:huongdan:update",
          "fatherId": "6423a489bab829e7784d6047",
          "orderNum": 3,
          "path": null,
          "menuType": "F",
          "visible": null,
          "status": 1,
          "newLinkFlag": null,
          "alIcon": null,
          "icon": null,
          "createdAt": "2023-10-23T07:11:47.000Z",
          "updatedAt": "2023-10-23T07:11:47.000Z"
      },
      {
          "id": "64867f1def5220e488de1d77",
          "lang": "vi",
          "menuName": "Sản Phẩm",
          "code": "default:product",
          "fatherId": "0",
          "orderNum": 3,
          "path": "/default/product",
          "menuType": "C",
          "visible": 1,
          "status": 1,
          "newLinkFlag": 0,
          "alIcon": null,
          "icon": "sketch",
          "createdAt": "2023-10-23T07:11:47.000Z",
          "updatedAt": "2023-10-23T07:11:47.000Z"
      },
      {
          "id": "64867ffcef5220e488de1d7b",
          "lang": "vi",
          "menuName": "Tìm kiếm sản phẩm",
          "code": "default:product:spmt00101",
          "fatherId": "64867f1def5220e488de1d77",
          "orderNum": 1,
          "path": "/default/product/spmt00101",
          "menuType": "C",
          "visible": 1,
          "status": 1,
          "newLinkFlag": 0,
          "alIcon": null,
          "icon": "form",
          "createdAt": "2023-10-23T07:11:47.000Z",
          "updatedAt": "2023-12-11T08:56:52.000Z"
      },
      {
          "id": "648680f5ef5220e488de1d7f",
          "lang": "vi",
          "menuName": "Import Sản Phẩm",
          "code": "default:product:spmt00201",
          "fatherId": "64867f1def5220e488de1d77",
          "orderNum": 2,
          "path": "/default/product/spmt00201",
          "menuType": "C",
          "visible": 1,
          "status": 1,
          "newLinkFlag": 0,
          "alIcon": null,
          "icon": "edit",
          "createdAt": "2023-10-23T07:11:47.000Z",
          "updatedAt": "2023-12-11T09:11:31.000Z"
      },
      {
          "id": "64868282ef5220e488de1d82",
          "lang": "vi",
          "menuName": "Chi Tiết Sản Phẩm",
          "code": "default:product:spmt00501",
          "fatherId": "64867f1def5220e488de1d77",
          "orderNum": 3,
          "path": "/default/product/spmt00501",
          "menuType": "C",
          "visible": 1,
          "status": 1,
          "newLinkFlag": 0,
          "alIcon": null,
          "icon": "border-outer",
          "createdAt": "2023-10-23T07:11:47.000Z",
          "updatedAt": "2023-12-11T09:41:49.000Z"
      },
      {
          "id": "64f7fb2e4ab1e8cfb054a14f",
          "lang": "vi",
          "menuName": "Danh Sách",
          "code": "default:page-demo:list",
          "fatherId": "632aaa31c8093b9a2007d15f",
          "orderNum": 4,
          "path": "/default/page-demo/list",
          "menuType": "C",
          "visible": 1,
          "status": 1,
          "newLinkFlag": 0,
          "alIcon": null,
          "icon": "unordered-list",
          "createdAt": "2023-10-23T07:11:47.000Z",
          "updatedAt": "2023-10-23T07:11:47.000Z"
      },
      {
          "id": "64f7fbe14ab1e8cfb054a152",
          "lang": "vi",
          "menuName": "Mẫu",
          "code": "default:page-demo:list:standard-table",
          "fatherId": "64f7fb2e4ab1e8cfb054a14f",
          "orderNum": 1,
          "path": "/default/page-demo/list/standard-table",
          "menuType": "C",
          "visible": 1,
          "status": 1,
          "newLinkFlag": 0,
          "alIcon": null,
          "icon": "caret-right",
          "createdAt": "2023-10-23T07:11:47.000Z",
          "updatedAt": "2023-10-23T07:11:47.000Z"
      },
      {
          "id": "64f7fc234ab1e8cfb054a155",
          "lang": "vi",
          "menuName": "Dạng Cây",
          "code": "default:page-demo:list:tree-list",
          "fatherId": "64f7fb2e4ab1e8cfb054a14f",
          "orderNum": 2,
          "path": "/default/page-demo/list/tree-list",
          "menuType": "C",
          "visible": 1,
          "status": 1,
          "newLinkFlag": 0,
          "alIcon": "",
          "icon": "caret-right",
          "createdAt": "2023-10-23T07:11:47.000Z",
          "updatedAt": "2023-10-23T07:11:47.000Z"
      },
      {
          "id": "64f7fc514ab1e8cfb054a158",
          "lang": "vi",
          "menuName": "Danh Sách Thẻ",
          "code": "default:page-demo:list:card-table",
          "fatherId": "64f7fb2e4ab1e8cfb054a14f",
          "orderNum": 3,
          "path": "/default/page-demo/list/card-table",
          "menuType": "C",
          "visible": 1,
          "status": 1,
          "newLinkFlag": 0,
          "alIcon": null,
          "icon": "caret-right",
          "createdAt": "2023-10-23T07:11:47.000Z",
          "updatedAt": "2023-10-23T07:11:47.000Z"
      },
      {
          "id": "64f7fd0d4ab1e8cfb054a15b",
          "lang": "vi",
          "menuName": "Tìm kiếm bảng",
          "code": "default:page-demo:list:search-table",
          "fatherId": "64f7fb2e4ab1e8cfb054a14f",
          "orderNum": 4,
          "path": " /default/page-demo/list/search-table",
          "menuType": "C",
          "visible": 1,
          "status": 1,
          "newLinkFlag": 0,
          "alIcon": null,
          "icon": "caret-right",
          "createdAt": "2023-10-23T07:11:47.000Z",
          "updatedAt": "2023-10-23T07:11:47.000Z"
      },
      {
          "id": "64f7fd444ab1e8cfb054a15e",
          "lang": "vi",
          "menuName": "Tìm kiếm danh sách",
          "code": "default:page-demo:list:search-list",
          "fatherId": "64f7fb2e4ab1e8cfb054a14f",
          "orderNum": 5,
          "path": "/default/page-demo/list/search-list",
          "menuType": "C",
          "visible": 1,
          "status": 1,
          "newLinkFlag": 0,
          "alIcon": null,
          "icon": "caret-right",
          "createdAt": "2023-10-23T07:11:47.000Z",
          "updatedAt": "2023-10-23T07:11:47.000Z"
      }
  ]
  });
});


export const menu = [menuList, menuListFromUrl];