import { DOCUMENT } from '@angular/common';
import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ThemeService } from '@store/common-store/theme.service';
import { driver, DriveStep } from 'driver.js';
/*
 * https://madewith.cn/766
 * Trang hướng dẫn
 * */
@Injectable({
  providedIn: 'root'
})
export class DriverService {
  themesService = inject(ThemeService);
  destroyRef = inject(DestroyRef);
  private readonly doc = inject(DOCUMENT);

  load(): void {
    // 
    let tabId = '';
    this.themesService
      .getThemesMode()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(res => {
        tabId = !res.fixedTab ? '#multi-tab' : '#multi-tab2';
      });
    const steps: DriveStep[] = [
      {
        element: '#menuNav',
        popover: {
          title: 'Menu',
          description: 'Đây là Menu',
          side: 'right',
          align: 'center'
        }
      },
      {
        element: '#drawer-handle',
        popover: {
          title: 'Nút cài đặt chủ đề',
          description: 'Nhấp để mở rộng và đặt chủ đề, bạn có thể kéo nó lên và xuống',
          side: 'left'
        }
      },
      {
        element: '#tools',
        popover: {
          title: 'Thanh công cụ',
          description: 'Màn hình khóa, menu tìm kiếm, toàn màn hình, tin nhắn thông báo, đăng xuất, đa ngôn ngữ',
          side: 'bottom'
        }
      },
      {
        element: '#chats',
        popover: {
          title: 'Liên hệ với quản trị viên',
          description: 'Liên hệ với quản trị viên',
          side: 'top'
        }
      },
      {
        element: '#trigger',
        popover: {
          title: 'Thu gọn menu',
          description: 'Thu gọn menu',
          side: 'bottom'
        }
      },
      {
        element: tabId,
        popover: {
          title: 'Nhiều thẻ',
          description: 'Nhấp chuột phải vào một tab để mở rộng nhiều tùy chọn. Khi màn hình vượt ra ngoài màn hình, hãy cuộn các tab bằng cách lăn con lăn chuột.',
          side: 'bottom'
        }
      }
    ];

    const driverObj = driver({
      showProgress: true,
      animate: true,
      allowClose: true,
      doneBtnText: 'Hoàn thành',
      nextBtnText: 'Bước tiếp theo',
      prevBtnText: 'Trước',
      onHighlightStarted: () => {
        this.doc.body.style.cssText = 'overflow:hidden';
      },
      steps
    });

    driverObj.drive();
  }
}



// import { DOCUMENT } from '@angular/common';
// import { DestroyRef, inject, Injectable } from '@angular/core';
// import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

// import { ThemeService } from '@store/common-store/theme.service';
// import { driver, DriveStep } from 'driver.js';
// /*
//  * https://madewith.cn/766
//  * Trang hướng dẫn
//  * */
// @@Injectable({
//   providedIn: 'root'
// })

// export class DriverService {
//   themesService = inject(ThemeService);
//   destroyRef = inject(DestroyRef);
//   private readonly doc = inject(DOCUMENT);

//   load(): void {
//     // Cho dù đó là tab cố định
//     let tabId = '';
//     this.themesService
//       .getThemesMode()
//       .pipe(takeUntilDestroyed(this.destroyRef))
//       .subscribe(res => {
//         tabId = !res.fixedTab ? '#multi-tab' : '#multi-tab2';
//       });
//     const steps: DriveStep[] = [
//       {
//         element: '#menuNav',
//         popover: {
//           title: 'Menu',
//           description: 'Đây là Menu',
//           side: 'right',
//           align: 'center'
//         }
//       },
//       {
//         element: '#drawer-handle',
//         popover: {
//           title: 'Nút cài đặt chủ đề',
//           description: 'Nhấp để mở rộng và đặt chủ đề, bạn có thể kéo nó lên và xuống',
//           side: 'left'
//         }
//       },
//       {
//         element: '#tools',
//         popover: {
//           title: 'Thanh công cụ',
//           description: 'Màn hình khóa, menu tìm kiếm, toàn màn hình, tin nhắn thông báo, đăng xuất, đa ngôn ngữ',
//           side: 'bottom'
//         }
//       },
//       {
//         element: '#chats',
//         popover: {
//           title: 'Liên hệ với quản trị viên',
//           description: 'Liên hệ với quản trị viên',
//           side: 'top'
//         }
//       },
//       {
//         element: '#trigger',
//         popover: {
//           title: 'Thu gọn menu',
//           description: 'Thu gọn menu',
//           side: 'bottom'
//         }
//       },
//       {
//         element: tabId,
//         popover: {
//           title: 'Nhiều thẻ',
//           description: 'Nhấp chuột phải vào một tab để mở rộng nhiều tùy chọn. Khi màn hình vượt ra ngoài màn hình, hãy cuộn các tab bằng cách lăn con lăn chuột.',
//           side: 'bottom'
//         }
//       }
//     ];

//     const driverObj = driver({
//       showProgress: true,
//       animate: true,
//       allowClose: true,
//       doneBtnText: 'Hoàn thành',
//       nextBtnText: 'Bước tiếp theo',
//       prevBtnText: 'Trước',
//       onHighlightStarted: () => {
//         this.doc.body.style.cssText = 'overflow:hidden';
//       },
//       steps
//     });

//     driverObj.drive();
//   }
// }
