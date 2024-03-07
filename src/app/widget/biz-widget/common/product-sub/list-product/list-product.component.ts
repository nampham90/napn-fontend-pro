import { Component, inject } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { ProductStoreService } from '../product-store.service';
import { ProductItemComponent } from './product-item/product-item.component';

@Component({
  selector: 'app-list-product',
  standalone: true,
  imports: [NzGridModule, ProductItemComponent],
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.less'
})
export class ListProductComponent {

  productStore = inject(ProductStoreService)

  products = this.productStore.products;

}
