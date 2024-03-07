import { Product } from "../product.model";

export interface TIN040 {
    SIPLNNO: string;
    SODTLNO: number;
    ARVLPLNQTY: number; // số lượng dự định
    ARVLPLNREMAINQTY: number; // số lượng thực nhập
    LIMITDATE: Date | null; // ngày hết hạn
    GUARANTEQTY: number; // tháng bảo hành 
    SIPRICE: number; //giá nhập
    SIDTLREMARK: string; // ghi chú
    product: Product; // sản phẩm
    QTYCD: string; // chất lượng sản phẩm
} 