import { Directive, ViewContainerRef, inject } from '@angular/core';

@Directive({
  selector: '[appAd]',
  standalone: true
})
export class AdDirective {
  public viewContainerRef = inject(ViewContainerRef);
}
