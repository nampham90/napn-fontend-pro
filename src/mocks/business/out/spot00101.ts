import { http, HttpResponse } from 'msw';

const showDelimthCD = http.post('/site/api/master/tmt170listdelimthcd', () => {
    return HttpResponse.json({
        code: 0,
        msg: 'SUCCESS',
        data: [
            {
                delimthcd: "0001",
                delimthnm: "Nhân viên công ty"
            },
            {
                delimthcd: "0002",
                delimthnm: "Giào hàng tiết kiệm"
            },
            {
                delimthcd: "0003",
                delimthnm: "Giao hàng nhanh"
            }
        ]
    });
})

const showPaymethCD = http.post('/site/api/master/tmt050listpaymethcd', () => {
    return HttpResponse.json({
        code: 0,
        msg: 'SUCCESS',
        data: [
            {
                paymethcd: "01",
                paymethnm: "Qua thẻ"
            },
            {
                paymethcd: "02",
                paymethnm: "Tiền mặt"
            },
            {
                paymethcd: "03",
                paymethnm: "Khi nhận hàng"
            }
        ]
    })
})

export const spot00101 = [showDelimthCD,showPaymethCD];