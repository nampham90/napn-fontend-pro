import { DragDrop, DragRef } from '@angular/cdk/drag-drop';
import { Injectable, inject } from '@angular/core';

import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { ModalTypes, NzModalService } from 'ng-zorro-antd/modal';

/**
 * Dịch vụ kéo hộp thoại
 */
@Injectable({
  providedIn: 'root'
})
export class ModalDragService {
  static readonly DRAG_CLS_PREFIX = 'NZ-MODAL-WRAP-CLS-';
  modal = inject(NzModalService);
  dragDrop = inject(DragDrop);

  /**
   *Tạo một tay cầm kéo
   *
   * @param wrapCls tên lớp
   * @param nzModalType Kiểu hộp thoại
   */
  createDragHandler<T = NzSafeAny>(wrapCls: string, nzModalType?: ModalTypes): DragRef<T> {
    const wrapElement = document.querySelector<HTMLDivElement>(`.${wrapCls}`)!;
    const rootElement = wrapElement.querySelector<HTMLDivElement>(`.ant-modal-content`)!;
    const handle = nzModalType === 'confirm' ? rootElement.querySelector<HTMLDivElement>('.ant-modal-body')! : rootElement.querySelector<HTMLDivElement>('.ant-modal-header')!;
    this.fixedWrapElementStyle(wrapElement);
    this.setMaxZIndex(rootElement, wrapElement);
    return this.dragDrop.createDrag(handle).withHandles([handle]).withRootElement(rootElement);
  }

  /**
   * Lấy tên lớp ngẫu nhiên
   */
  getRandomCls() {
    return ModalDragService.DRAG_CLS_PREFIX + Date.now() + Math.random().toString().replace('0.', '');
  }

  /**
   * Giải quyết kiểu quấn, đặt chuột có thể xuyên qua
   *
   * @param wrapElement
   * @protected
   */
  protected fixedWrapElementStyle(wrapElement: HTMLElement): void {
    wrapElement.style.pointerEvents = 'none';
  }

  /**
   * Khi nhấp vào hộp thoại hiện tại, hãy đặt chỉ mục z của hộp thoại hiện tại ở mức tối đa
   *
   * @param rootElement hộp thoại hiện tại
   * @param wrapElement vùng chứa chỉ mục z cần được sửa đổi
   * @protected
   */
  protected setMaxZIndex(rootElement: HTMLElement, wrapElement: HTMLElement): void {
    rootElement.addEventListener(
      'mousedown',
      () => {
        const maxZIndex = this.getModalMaxZIndex(wrapElement);
        if (maxZIndex) {
          wrapElement.style.zIndex = `${maxZIndex + 1}`;
        }
      },
      false
    );
  }

  /**
   * Nhận giá trị tối đa của tất cả các hộp thoại và xác định xem có cần sửa đổi hay không
   *
   * @param wrapElement vùng chứa chỉ mục z cần được sửa đổi
   */
  protected getModalMaxZIndex(wrapElement: HTMLElement): number | null {
    const wrapZIndex = this.getZIndex(wrapElement);
    const maxZIndex = this.modal.openModals.reduce<number>((prev, modal) => {
      // @ts-ignore
      const element = (modal.containerInstance.host || modal.containerInstance.elementRef).nativeElement;
      if (wrapElement === element) {
        return prev;
      }
      const zIndex = this.getZIndex(element);
      return zIndex > prev ? zIndex : prev;
    }, 0);
    return maxZIndex >= wrapZIndex ? maxZIndex : null;
  }

  protected getZIndex(element: HTMLElement): number {
    return +getComputedStyle(element, null).zIndex;
  }
}
