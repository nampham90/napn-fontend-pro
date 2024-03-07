import { Component, Input, computed, inject, signal } from '@angular/core';
import { CartService } from '../cart.service';
import { CartItem } from '../model/Cart';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { FormsModule } from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule, CurrencyPipe, DecimalPipe } from '@angular/common';
import { InputCurrencyComponent } from '@app/shared/components/input-currency/input-currency.component';


@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [NzInputNumberModule,FormsModule, NzGridModule, NzButtonModule, CommonModule, InputCurrencyComponent],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.less',
  providers: [CurrencyPipe, DecimalPipe]
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

  phongban_id = computed(() => this.cartService.phongban_id());

  amountModeSELLPIRCE = computed(()=> (this.cartItem().productstck.SELLPIRCE/1000));
  changeAmountSELLPIRCE($event: number) {
    this.cartItem().productstck.SELLPIRCE = ($event*1000); 
    this.cartService.updatePriceCart(this.cartItem());
  }

  amountModeTECHNICALPRICE = computed(()=> (this.cartItem().productstck.TECHNICALPRICE/1000));
  changeAmountTECHNICALPRICE($event: number) {
    this.cartItem().productstck.TECHNICALPRICE = ($event*1000); 
    this.cartService.updatePriceCart(this.cartItem());
  }

  exPrice = computed(() => 
    this.cartItem().quantity * Number(this.cartItem().productstck.SELLPIRCE));

  exPriceTECHNICALPRICE = computed(() => 
    this.cartItem().quantity * Number(this.cartItem().productstck.TECHNICALPRICE)
  )
  
  onRemove() : void {
    this.cartService.removeFromCart(this.cartItem());
  }

  change($event: number) {
    this.cartService.updateInCart(this.cartItem(), Number($event));
    // this.exPrice = computed(() => 
    //      this.cartItem().quantity * Number(this.cartItem().productstck.SELLPIRCE));
  }
}
