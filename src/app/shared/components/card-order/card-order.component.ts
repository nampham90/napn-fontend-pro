import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-card-order',
  standalone: true,
  imports: [NzIconModule],
  templateUrl: './card-order.component.html',
  styleUrl: './card-order.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardOrderComponent {

}
