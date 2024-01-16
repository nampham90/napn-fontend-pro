import { Component, Input, computed, inject, signal } from '@angular/core';
import { CartService } from '../cart.service';
import { CartItem } from '../model/Cart';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { FormsModule } from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [NzInputNumberModule,FormsModule, NzGridModule, NzButtonModule, CommonModule],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.less'
})
export class CartItemComponent {

  cartService = inject(CartService);
  _item!: CartItem;

  get item(): CartItem {
    return this._item;
  }

  @Input() set item(item: CartItem) {
    this._item = item;
    this.cartItem.set(item);
  }

  cartItem = signal(this.item);

  exPrice = computed(() => 
    this.cartItem().quantity * Number(this.cartItem().productstck.SELLPIRCE));
  
  onRemove() : void {
    this.cartService.removeFromCart(this.cartItem());
  }

  change($event: number) {
    this.cartService.updateInCart(this.cartItem(), Number($event));
    // this.exPrice = computed(() => 
    //      this.cartItem().quantity * Number(this.cartItem().productstck.SELLPIRCE));
  }
}
