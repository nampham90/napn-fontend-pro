import { NgFor } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { NumberLoopPipe } from '@shared/pipes/number-loop.pipe';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-menu111',
  templateUrl: './menu111.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NzInputModule, NgFor, NumberLoopPipe]
})
export class Menu111Component implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
