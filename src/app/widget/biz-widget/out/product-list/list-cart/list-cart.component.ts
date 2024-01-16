import { Component, inject } from '@angular/core';
import { CartService } from '../cart.service';
import { CartItemComponent } from "../cart-item/cart-item.component";
import { NzGridModule } from 'ng-zorro-antd/grid';
import { CartTotalComponent } from "../cart-total/cart-total.component";

@Component({
    selector: 'app-list-cart',
    standalone: true,
    templateUrl: './list-cart.component.html',
    styleUrl: './list-cart.component.less',
    imports: [CartItemComponent, NzGridModule, CartTotalComponent]
})
export class ListCartComponent {

  cartService = inject(CartService);

  cartItems = this.cartService.cartItems;
}
