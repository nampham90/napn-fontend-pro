import { Product } from "../product.model";

export interface TOT040 {
    SOODNO: string;
    SODTLNO: number;
    SOPRICE: number;
    SHIPMNTORDQTY: number;
    SHIPMNTORDREMAINQTY: number;
    SOREMARK: string;
    createdAt?: Date;
    updatedAt?: Date;
    PRODUCTCD: string;
    product: Product;
    QTYCD: string;
    LIMITDATE?: Date;
}