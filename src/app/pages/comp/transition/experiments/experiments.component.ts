import { NgFor } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';

import {
  rotateInDownLeftOnEnterAnimation,
  rollInAnimation,
  zoomInLeftAnimation,
  zoomInDownOnEnterAnimation,
  hueRotateAnimation,
  zoomInUpOnEnterAnimation,
  rubberBandAnimation,
  flashAnimation,
  fadeInOnEnterAnimation,
  rubberBandOnEnterAnimation
} from 'angular-animations';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';

import { AngularImgComponent } from '../angular-img/angular-img.component';

@Component({
  selector: 'app-experiments',
  templateUrl: './experiments.component.html',
  styleUrls: ['./experiments.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    rotateInDownLeftOnEnterAnimation({ anchor: 'enter' }),
    zoomInDownOnEnterAnimation({ anchor: 'enterLetterAnim1' }),
    fadeInOnEnterAnimation({ anchor: 'enterLetterAnim2' }),
    zoomInUpOnEnterAnimation({ anchor: 'enterLetterAnim3' }),
    rollInAnimation({ anchor: 'letterAnim1' }),
    zoomInLeftAnimation({ anchor: 'letterAnim2' }),
    rubberBandAnimation({ anchor: 'letterAnim3' }),
    hueRotateAnimation({ anchor: 'hueLetter', duration: 5000 }),
    flashAnimation({ anchor: 'flash' }),
    rubberBandOnEnterAnimation({ anchor: 'btnEnter', delay: 12500 }),
    fadeInOnEnterAnimation({ anchor: 'btnEnterFadeIn', delay: 12500, duration: 500 })
  ],
  standalone: true,
  imports: [NgFor, AngularImgComponent, NzButtonModule, NzWaveModule]
})
export class ExperimentsComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);
  text1 = 'Công phu Thiếu Lâm hay, thực sự hay, Công phu Thiếu Lâm hay, thực sự hay...'.split('');
  text2 = 'Bạn có chân kim cương, tôi có chân kim cương, tôi có kỹ năng đầu sắt, ôi...'.split('');
  text3 = 'Ta đấm hổ thì hổ làm gió, hổ và hổ làm gió, lòng bàn tay ta ngất ngây, ngất ngây...'.split('');

  animationState = false;
  hueState = false;
  flashState = false;

  getDelay(index: number, lenght: number): number {
    if (index < lenght / 2 - 2) {
      return index * 100;
    } else {
      return lenght * 100 - index * 100;
    }
  }

  animate(): void {
    this.animationState = false;
    setTimeout(() => {
      this.animationState = true;
      this.cdr.markForCheck();
    }, 1);
  }

  ngOnInit(): void {}
}
