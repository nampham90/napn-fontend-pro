import { http, HttpResponse } from 'msw';

const departmentList = http.post('/site/api/department/list/', () => {
  return HttpResponse.json({
    code: 0,
    msg: 'SUCCESS',
    data: {
      total: 7,
      list: [
        {
            "id": 1,
            "lang": "vi",
            "tenphongban": "Quản lý",
            "state": true,
            "fatherId": 0,
            "orderNum": 1,
            "createdAt": "2023-10-24T04:12:02.000Z",
            "updatedAt": "2023-10-24T04:12:02.000Z"
        },
        {
            "id": 2,
            "lang": "vi",
            "tenphongban": "Quản Lý Khách Hàng",
            "state": true,
            "fatherId": 0,
            "orderNum": 1,
            "createdAt": "2023-10-24T04:12:02.000Z",
            "updatedAt": "2023-10-24T04:12:02.000Z"
        },
        {
            "id": 3,
            "lang": "vi",
            "tenphongban": "Khách Hàng ",
            "state": true,
            "fatherId": 0,
            "orderNum": 1,
            "createdAt": "2023-10-24T04:12:02.000Z",
            "updatedAt": "2023-10-24T04:12:02.000Z"
        },
        {
            "id": 4,
            "lang": "vi",
            "tenphongban": "Khách Hàng Vip",
            "state": true,
            "fatherId": 3,
            "orderNum": 2,
            "createdAt": "2023-10-24T04:12:02.000Z",
            "updatedAt": "2023-10-24T04:12:02.000Z"
        },
        {
            "id": 5,
            "lang": "vi",
            "tenphongban": "Khách Hàng Đăng Ký",
            "state": true,
            "fatherId": 3,
            "orderNum": 2,
            "createdAt": "2023-10-24T04:12:02.000Z",
            "updatedAt": "2023-10-24T04:12:02.000Z"
        },
        {
            "id": 7,
            "lang": "vi",
            "tenphongban": "Kế Toán",
            "state": true,
            "fatherId": 0,
            "orderNum": 0,
            "createdAt": "2023-10-24T04:12:02.000Z",
            "updatedAt": "2023-10-24T04:12:02.000Z"
        },
        {
            "id": 8,
            "lang": "vi",
            "tenphongban": "aaa",
            "state": true,
            "fatherId": 3,
            "orderNum": 0,
            "createdAt": "2023-10-24T04:12:02.000Z",
            "updatedAt": "2024-01-02T05:03:34.000Z"
        }
    ],
      pageNum: 0,
      pageSize: 0,
      size: 7,
      startRow: 1,
      endRow: 7,
      pages: 0,
      prePage: 0,
      nextPage: 0,
      isFirstPage: false,
      isLastPage: true,
      hasPreviousPage: false,
      hasNextPage: false,
      navigatePages: 8,
      navigatepageNums: [],
      navigateFirstPage: 0,
      navigateLastPage: 0
    }
  });
});

export const department = [departmentList];
