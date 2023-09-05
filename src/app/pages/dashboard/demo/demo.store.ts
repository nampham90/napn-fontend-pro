import { SocketService } from "@app/core/services/common/socket.service";
import * as ConstSocket from "@app/common/constSocket";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';
import { WindowService } from '@core/services/common/window.service';
export interface Product {
    id: string,
    idpro: number,
    proname: string,
    price: number,
    completed: boolean,
    editing: boolean,
    synced: boolean
}

const mapProduct = (porduct: Product) => {
    return {
        ...porduct,
        editing: false,
        synced: true
    }
}

@Injectable({
    providedIn: 'root'
})

export class ProductStore {
    public products: Array<Product> = [];
    private productStore$ = new BehaviorSubject<Product[]>([]);
    
    constructor(private socketService : SocketService) {

        this.socketService.setupSocketConnection();

        this.socketService.on(ConstSocket.demoListProduct, (res: Product[])=> {
            this.products = res.map(mapProduct);
            this.setProductStore(this.products);
           
        })

        this.socketService.on(ConstSocket.demoCreatePorduct, (product:Product)=> {
            this.products.push(mapProduct(product));
            this.setProductStore(this.products);
        });

        this.socketService.on(ConstSocket.demoUpdatePorduct, (product:Product)=> {
            const existingProduct = this.products.find(p => {
                return p.id == product.id
            });
            if(existingProduct) {
                existingProduct.proname = product.proname;
                existingProduct.price = product.price;
            }
            console.log(this.products);
            this.setProductStore(this.products);
        });

        this.socketService.on(ConstSocket.demoDeletePorduct, (id:string) => {
            const index = this.products.findIndex(p => p.id === id);
            if(index !== -1) {
                this.products.splice(index,1);
            }
            this.setProductStore(this.products);
        });
    }

    private getWithCompleted(completed: boolean) {
        return this.products.filter((product:Product) => product.completed = completed) ;
    }

    allCompleted() {
        return this.products.length === this.getCompleted().length;
    }


    getRemaining() {
        return this.getWithCompleted(false);
    }

    getCompleted() {
        return this.getWithCompleted(true);
    }

    setAllPro(completed : boolean) {
        this.products.forEach(product => {
            product.completed = completed;
            product.synced = false;
            this.socketService.emit(ConstSocket.demoUpdatePorduct, product);
        })
    }

    removeCompleted() {
        this.getCompleted().forEach((product) => {
            this.socketService.emit(ConstSocket.demoDeletePorduct, product.idpro);
        });
        this.products = this.getRemaining();
    }

    toggleCompletion(product: Product) {
        product.completed = !product.completed;
        product.synced = false;
        this.socketService.emit(ConstSocket.demoUpdatePorduct, product);
    }

    remove(product: Product) {
        this.products.splice(this.products.indexOf(product),1);
        this.socketService.emit(ConstSocket.demoDeletePorduct, product.idpro);
    }

    add(proname:string, pirce: number) {
        this.socketService.emit(ConstSocket.demoCreatePorduct,{proname,pirce,completed: false});
    }

    setProductStore(products: Product[]) {
        this.productStore$.next(products);
    }

    getProductStore() : Observable<Product[]>{
        return this.productStore$.asObservable();
    }

}