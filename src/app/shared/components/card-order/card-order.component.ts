import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CarditemService } from './carditem.service';
import { CommonModule } from '@angular/common';

export interface CardItem {
   soOD: string; // số hóa đơn
   ngaytao: Date; // ngay tao don
   ngaydatcoc: Date | null; // ngày đặt cọc tiền
   ngaythanhtoan: Date | null; // ngày thanh toán tiền
   ngayxuathang: Date | null;   // ngày xuất hàng
   tenkhachang?: string | null; // ten khach hang
   sts_baogia: boolean; // trạng thái báo giá
   sts_datcoc: boolean; // trạng thái đặt cọc hàng
   sts_dathang: boolean; // trạng thái đặt hàng
   sts_thanhtoan: boolean; // trạng thái thanh toán
   sts_xuathang: boolean; // trạng thái xuất hàng
}

export interface CardOrderConfig {
   total: number; // số order cần hiển thị
   loading: boolean; // có hiển thị tải hay không
   yScroll?: number; // thanh cuộc dọc
}


@Component({
  selector: 'app-card-order',
  standalone: true,
  imports: [NzIconModule, CommonModule],
  templateUrl: './card-order.component.html',
  styleUrl: './card-order.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardOrderComponent {
   private CardItemService = inject(CarditemService);
   _dataList : CardItem[] = [];

   @Input()
   set cardData(value: CardItem[]) {
      this._dataList = value;
   }
   get cardData(): CardItem[] {
      return this._dataList;
   }



}
