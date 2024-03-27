import { Product } from "../product.model";

export interface TOT040 {
    SOODNO: string;
    SODTLNO: number;
    SOPRICE: number;
    ORDLIMITDATE: Date;
    SHIPMNTORDQTY: number;
    SHIPMNTORDREMAINQTY: number;
    WARRANTY: number;
    SOREMARK: string;
    createdAt?: Date;
    updatedAt?: Date;
    PRODUCTCD: string;
    PRODUCTGROUPCD?: string;
    product: Product;
    QTYCD: string;
    LIMITDATE?: Date;
}