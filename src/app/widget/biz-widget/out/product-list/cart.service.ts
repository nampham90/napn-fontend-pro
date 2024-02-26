import { Injectable, computed, signal } from '@angular/core';
import { CartItem } from './model/Cart';
import { TST010_STCK } from '@app/model/tst010_stck.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems = signal<CartItem[]>([]);

  // tính tổng tiền trong giỏ hàng
  subTotal = computed(() => this.cartItems().reduce((a, b)=> 
  a + (b.quantity * Number(b.productstck.SELLPIRCE)),0));

  // giao hàng miễn phí nếu đơn hơn có giá trị trên 1000.000đ
  deliveryFee = computed(() => this.subTotal() < 1000000 ? 50000 : 0);

  // thêu sẽ được tín dựa trên mã zip
  tax = computed(() => Math.round(this.subTotal() * 10)/ 100);

  // tông giá
  totalPrice = computed(()=> this.subTotal() + this.deliveryFee() + this.tax());

  addToCart(productstck: TST010_STCK) : void {
    const index = this.cartItems().findIndex(item => item.productstck.PRODUCTCD === productstck.PRODUCTCD);
    if(index === -1) {
      // chưa có sản phẩm trong giỏ hàng thì thêm với mặc định là một
      this.cartItems.update(items => [...items, { productstck, quantity : 1}])
    } else {
      // đã có trong giỏ hàng thì tăng giá trị lên 1
      this.cartItems.update(items => 
        [
          ...items.slice(0, index),
          { ...items[index], quantity: items[index].quantity + 1},
          ...items.slice(index+1)
        ]);

    }
  }

  // xóa sản phẩm ra khỏi giỏ hàng
  removeFromCart(cartItem: CartItem) : void {
    this.cartItems.update(items => items.filter(item => item.productstck.PRODUCTCD !== cartItem.productstck.PRODUCTCD));
  }

  updateInCart(cartItem: CartItem, quantity: number) {
    this.cartItems.update(items => 
         items.map(item => item.productstck.PRODUCTCD === cartItem.productstck.PRODUCTCD ?
             {productstck: cartItem.productstck, quantity}: item));
  }

  updatePriceCart(cartItem: CartItem) {
    this.cartItems.update(items => 
         items.map(item => item.productstck.PRODUCTCD === cartItem.productstck.PRODUCTCD ?
            cartItem : item))
  }

  refeshCart() {
    this.cartItems.set([]);
  }

  updateListCart(lstCart: CartItem[]) {
    this.cartItems.set(lstCart);
  }
}
