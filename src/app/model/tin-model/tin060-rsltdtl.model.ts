import { Product } from "../product.model";

export interface TIN060 {
    SIPLNNO: string; // mã đơn hàng nhập kho
    INSTRCD: string; // mã sản phẩm được lưu trong mỗi lần nhập kho
    SIDTLNO: number; // mã số lần nhận. (vd lần 1 nhập 2 , lần 2 nhập thêm 2 ) //
    ARVLPLNQTY: number; // số lượng dự định
    ARVLRSLTQTY: number; // số lượng thực nhập
    LIMITDATE: Date | null; // ngày hết hạn
    GUARANTEQTY: number; // tháng bảo hành 
    SIPRICE: number; // giá nhập
    SIDTLREMARK: string; // ghi chú
    product: Product; // sản phẩm
    QTYCD: string; // chất lượng sản phẩm
    PRODUCTGRPCD: string; // nhóm sản phẩm cùng mã sản phẩm cùng chất lượng và cùng giá nhập
}
