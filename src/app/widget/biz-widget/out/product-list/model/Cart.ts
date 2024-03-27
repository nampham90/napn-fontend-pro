import { TST010_STCK } from "@app/model/tst010_stck.model";

export interface Cart {
    cartItems: CartItem[]
}

export interface CartItem {
    productstck: TST010_STCK;
    quantity: number; // soluong
    warranty: number; // so tháng bao hành
}