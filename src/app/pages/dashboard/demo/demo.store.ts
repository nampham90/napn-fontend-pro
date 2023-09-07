import { SocketService } from "@app/core/services/common/socket.service";
import * as ConstSocket from "@app/common/constSocket";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';
import { WindowService } from '@core/services/common/window.service';
import { PageInfo, Response, SearchCommonVO } from "@app/core/services/types";
import { NzModalService } from "ng-zorro-antd/modal";
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
    private productStore$ = new BehaviorSubject<PageInfo<Product>>({pageNum:1, pageSize:10,total: 0, list: []});
    
    constructor(private socketService : SocketService, private modalSrv: NzModalService,) {

        this.socketService.setupSocketConnection();

        this.socketService.on(ConstSocket.demoListProduct, (res: Response<Product>)=> {
            if(res.code > 0) {
                // thong bao loi ở đây
                this.modalSrv.error({nzTitle: res.msg});
            } else {
                this.setProductStore(res.data!);
            }
        })
    }

    update(params: SearchCommonVO<Product>) {
        this.socketService.emit(ConstSocket.demoUpdatePorduct, params);
    }

    remove(product: Product) {
        this.products.splice(this.products.indexOf(product),1);
        this.socketService.emit(ConstSocket.demoDeletePorduct, product.idpro);
    }

    add(proname:string, pirce: number) {
        this.socketService.emit(ConstSocket.demoCreatePorduct,{proname,pirce,completed: false});
    }

    setProductStore(productStore: PageInfo<Product>) {
        this.productStore$.next(productStore);
    }

    getProductStore() : Observable<PageInfo<Product>>{
        return this.productStore$.asObservable();
    }

}