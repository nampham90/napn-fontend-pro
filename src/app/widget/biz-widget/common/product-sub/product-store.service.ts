import { Injectable, signal } from '@angular/core';
import { TIN040 } from '@app/model/tin-model/tin040_plantdl.model';

@Injectable({
  providedIn: 'root'
})
export class ProductStoreService {

  products = signal<TIN040[]>([]);

  addProduct(product: TIN040) : void {
    const index = this.products().findIndex(item => item.product.id === product.product.id);
    if(index === -1 ) {
      const n = this.products().length + 1;
      Object.assign(product , {SODTLNO: n});
      this.products.update(items => [...items, product]);
    } else {
      this.products.update(items => [
        ...items.slice(0, index),
        { ...items[index], ARVLPLNQTY: items[index].ARVLPLNQTY + 1},
        ...items.slice(index+1)
      ]);
    }
  }

  removeProduct(product: TIN040) : void {
    this.products.update(items => items.filter(item => item.product.id !== product.product.id))
  }

  refesh() {
    this.products.set([])
  }

  updateListProduct(lstProducts: TIN040[]) {
    this.products.set(lstProducts);
  }
}
