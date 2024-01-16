import { Component, inject } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { CartService } from '../cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-total',
  standalone: true,
  imports: [NzGridModule,CommonModule],
  templateUrl: './cart-total.component.html',
  styleUrl: './cart-total.component.less'
})
export class CartTotalComponent {
   cartService = inject(CartService);
   cartItems = this.cartService.cartItems;

   subTotal = this.cartService.subTotal;
 
   deliveryFee = this.cartService.deliveryFee;
 
   tax = this.cartService.tax;
 
   totalPrice = this.cartService.totalPrice;
}
