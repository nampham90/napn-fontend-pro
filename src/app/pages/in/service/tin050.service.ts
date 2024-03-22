import { Injectable, inject, signal } from '@angular/core';
import { WindowService } from '@app/core/services/common/window.service';
import { TIN020 } from '@app/model/tin-model/tin020_planhed.model';
import { TIN040 } from '@app/model/tin-model/tin040_plantdl.model';
import { TIN050 } from '@app/model/tin-model/tin050-rslthed.model';
import { TIN060 } from '@app/model/tin-model/tin060-rsltdtl.model';

@Injectable({
  providedIn: 'root'
})
export class Tin050Service {

  windownService = inject(WindowService);
  
  tin050 = signal<TIN050>({
    SIPLNNO: "",
    ARVLPLNDATE: null, // ngày nhập hàng
    ARVLRSLTDATE: null,// ngày nhận lại
    SIRSLTDATE: null, // ngày thực tế nhận lại
    SIREMARK: "", // ghi chú đơn hàng
    tin010_st: {
      SIPLNNO: '',
      ARVLCOMPFLG: '',
      SICOMPFLG: '',
      RSLTSENDFLG: '',
    },// trạng thái đơn hàng
    STSNM: "", // tên trạng thái đơn hàng
    SPPLYCD: 0, // mã nhà cung cấp
    USERCD: 0, // mã người tạo đơn
    SIUSRCD: 0, // ma người nhận hàng
    tin060_rsltdtls: [],
    DIVKBN: '', // phương thức thanh toán nhà cung cấp
  })

  updateTin050(tin050: TIN050) {
    this.tin050.set(tin050);
  
  }

  mergeHedTin020ToTin050(tin020: TIN020) {
    this.tin050.set({
      SIPLNNO: tin020.SIPLNNO,
      ARVLPLNDATE: tin020.ARVLPLNDATE, // ngày nhập hàng
      ARVLRSLTDATE: null,// ngày nhận lại
      SIRSLTDATE: null, // ngày thực tế nhận lại
      SIREMARK: tin020.SIREMARK, // ghi chú đơn hàng
      tin010_st: {
        SIPLNNO: tin020.tin010_st.SIPLNNO,
        ARVLCOMPFLG: tin020.tin010_st.ARVLCOMPFLG,
        SICOMPFLG: tin020.tin010_st.SICOMPFLG,
        RSLTSENDFLG: tin020.tin010_st.RSLTSENDFLG,
      },// trạng thái đơn hàng
      STSNM: tin020.STSNM, // tên trạng thái đơn hàng
      SPPLYCD: tin020.SPPLYCD, // mã nhà cung cấp
      USERCD: 0, // mã người tạo đơn
      SIUSRCD: 0, // ma người nhận hàng
      tin060_rsltdtls: this.mergeDtlTin040ToTin050(tin020.tin040_plandtls),
      DIVKBN: tin020.DIVKBN, // phương thức thanh toán nhà cung cấp
    })

  }

  mergeDtlTin040ToTin050(lsttin040: TIN040[]) : TIN060[] {
    let tin060s : TIN060[] = [];
    for(let item of lsttin040) {
      let tin060: TIN060 = {
        SIPLNNO: item.SIPLNNO,// mã đơn hàng nhập kho
        INSTRCD: '',// mã sản phẩm được lưu trong mỗi lần nhập kho
        SIDTLNO: 1,// mã số lần nhận. (vd lần 1 nhập 2 , lần 2 nhập thêm 2 ) //
        ARVLPLNQTY: item.ARVLPLNQTY,// số lượng dự định
        ARVLRSLTQTY: 0,// số lượng thực nhập
        LIMITDATE: item.LIMITDATE,// ngày hết hạn
        GUARANTEQTY: item.GUARANTEQTY,// tháng bảo hành 
        SIPRICE: item.SIPRICE,// giá nhập
        SIDTLREMARK: item.SIDTLREMARK,// ghi chú
        product: item.product,// sản phẩm
        QTYCD: item.QTYCD,// chất lượng sản phẩm
        PRODUCTGRPCD: item.PRODUCTGRPCD,// nhóm sản phẩm cùng mã sản phẩm cùng chất lượng và cùng giá nhập
      }
      tin060s.push(tin060);
    }
    return tin060s
  }

  updatesiuser(siuser: number) {
    this.tin050().SIUSRCD = siuser;
  }

  updateListDetail(tin060s: TIN060[]) {
    this.tin050().tin060_rsltdtls = tin060s;
  }



  constructor() { }
}
