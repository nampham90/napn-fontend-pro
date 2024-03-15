import { Injectable, inject, signal } from '@angular/core';
import { silnno } from '@app/config/constant';
import { WindowService } from '@app/core/services/common/window.service';
import { TIN020 } from '@app/model/tin-model/tin020_planhed.model';
import { TIN040 } from '@app/model/tin-model/tin040_plantdl.model';

@Injectable({
  providedIn: 'root'
})
export class Tin020Service {

  windownService = inject(WindowService);
  tin020 = signal<TIN020>({
    SIPLNNO: '',
    ARVLPLNDATE: null,
    SIREMARK: '',
    tin010_sts: {
      SIPLNNO: '',
      ARVLCOMPFLG: '',
      SICOMPFLG: '',
      RSLTSENDFLG: '',
    },
    STSNM: "khởi tạo",
    SPPLYCD: 0,
    USERCD: 0,
    tin040_plandtls: [],
    DIVKBN: '',
  })

  updateTin020(tin020: TIN020) {
    this.tin020.set(tin020);
  }

  updateSpplycd(spplycd: number) {
    this.tin020().SPPLYCD = spplycd;
  }

  updateLocalStorageSelectdID(id: TIN020) {
    this.windownService.setStorage(silnno, JSON.stringify(id));
  }

  updateListDetail(tin040: TIN040[]) {
    this.tin020().tin040_plandtls = tin040;
  }

  constructor() { }
}
