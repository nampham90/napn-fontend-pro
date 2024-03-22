import { TIN010 } from "./tin010_sts.model";
import { TIN060 } from "./tin060-rsltdtl.model";

export interface TIN050 {
    SIPLNNO: string;
    ARVLPLNDATE: Date | null; // ngày nhập hàng
    ARVLRSLTDATE: Date | null;// ngày nhận lại
    SIRSLTDATE: Date | null; // ngày thực tế nhận lại
    SIREMARK: string; // ghi chú trả hàng
    tin010_st: TIN010;// trạng thái đơn hàng
    STSNM: string, // tên trạng thái đơn hàng
    SPPLYCD: number; // mã nhà cung cấp
    USERCD: number; // mã người tạo đơn
    SIUSRCD: number; // ma người nhận hàng
    tin060_rsltdtls: TIN060[];
    DIVKBN: string; // phương thức thanh toán nhà cung cấp
    supplier?: Spply; // đối tượng nhà cung cấp
    employe?: User; // đối tượng nhân viện tạo đơn hàng
    rsltusercd?: User;// người nhận hàng
}


interface Spply {
    id: number,
    name: string;
 }
 
 interface User {
     id: number;
     name: string;
 }
