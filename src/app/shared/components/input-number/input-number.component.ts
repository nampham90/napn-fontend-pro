import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzInputModule } from 'ng-zorro-antd/input';
import { InputNumberDirective } from './input-number.directive';

export abstract class InputComponentToken {

  abstract inputChangeDectction(): void;
}

@Component({
  selector: 'app-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NzInputModule, FormsModule, InputNumberDirective],
  providers: [{ provide: InputComponentToken, useExisting: InputNumberComponent }],
})
export class InputNumberComponent{
  private cdr = inject(ChangeDetectorRef);
  private decimalPipe = inject(DecimalPipe);

  _number: NzSafeAny;
  amt!: boolean;

  @Input()
  set Number(value: NzSafeAny) {
    this._number = this.decimalPipe.transform(value,"1.0-0");
  }

  get Number(): NzSafeAny {
    this.inputChangeDectction();
    return this._number;
  }

  @Output() readonly changeNumber = new EventEmitter<any>();

  inputChangeDectction(): void {
    this.cdr.markForCheck();
  }

  onQueryParamsChange($event:any): void {
    this.changeNumber.emit($event.target.value.replace(/[^0-9.]+/g, ''));
  }

}
