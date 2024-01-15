import { Product } from "./product.model";

export interface TST010_STCK {
    TOTALALLWQTY: number;
    SELLPIRCE: number;
    LIMITDATE: Date;
    QTYCD: string;
    TOTALSHIPQTY: number;
    IMAGE: string;
    product: Product;
}