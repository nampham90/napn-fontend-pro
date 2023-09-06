import { BreakpointObserver } from '@angular/cdk/layout';
import { ComponentPortal, CdkPortalOutletAttachedRef, Portal, ComponentType, PortalModule } from '@angular/cdk/portal';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentRef, DestroyRef, inject, OnDestroy, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder } from '@angular/forms';

import { StepThreeComponent } from '@app/pages/page-demo/form/step/step-three/step-three.component';
import { PageHeaderType, PageHeaderComponent } from '@shared/components/page-header/page-header.component';
import { WaterMarkComponent } from '@shared/components/water-mark/water-mark.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzStepsModule } from 'ng-zorro-antd/steps';

import { StepOneComponent } from './step-one/step-one.component';
import { StepTwoComponent } from './step-two/step-two.component';

type comp = StepOneComponent | StepTwoComponent | StepThreeComponent;

enum StepEnum {
  One,
  Two,
  Three
}

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PageHeaderComponent, NzCardModule, WaterMarkComponent, NzStepsModule, PortalModule]
})
export class StepComponent implements OnInit, AfterViewInit, OnDestroy {
  selectedPortal!: Portal<any>;
  stepDirection: 'horizontal' | 'vertical' = 'horizontal';
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: 'Hình thức từng bước',
    desc: 'Chia một nhiệm vụ biểu mẫu dài hoặc lạ thành các bước và hướng dẫn người dùng thực hiện nhiệm vụ đó. (Bản demo điểm chuyển cdk)',
    breadcrumb: ['Home', 'Trang mẫu', 'Hình thức từng bước']
  };
  currentStep = 1;
  stepComponentArray: Array<ComponentType<comp>> = [StepOneComponent, StepTwoComponent, StepThreeComponent];
  componentPortal?: ComponentPortal<comp>;
  destroyRef = inject(DestroyRef);
  constructor(private fb: FormBuilder, private breakpointObserver: BreakpointObserver, private cdr: ChangeDetectorRef) {}

  go(step: StepEnum, ref: CdkPortalOutletAttachedRef, currentStepNum: number): void {
    this.currentStep = currentStepNum;
    ref!.destroy();
    this.goStep(step);
    // ví dụ về ngZoneEventCoalescing, ngZoneRunCoalescing, vui lòng xem main.ts
    this.cdr.detectChanges();
  }

  // Điều này được thực hiện hoàn toàn để chứng minh cách sử dụng cổng CDK đơn giản
  initComponent(ref: CdkPortalOutletAttachedRef): void {
    if (ref instanceof ComponentRef) {
      if (ref.instance instanceof StepOneComponent) {
        ref.instance.stepDirection = this.stepDirection;
        ref.instance.next.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
          this.go(StepEnum.Two, ref, this.currentStep + 1);
        });
      }
      if (ref.instance instanceof StepTwoComponent) {
        ref.instance.previous.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
          this.go(StepEnum.One, ref, this.currentStep - 1);
        });
        ref.instance.next.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
          this.go(StepEnum.Three, ref, this.currentStep + 1);
        });
      }
      if (ref.instance instanceof StepThreeComponent) {
        ref.instance.stepDirection = this.stepDirection;
        ref.instance.next.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
          this.go(StepEnum.One, ref, 1);
        });
      }
    }
  }

  ngOnInit(): void {
    this.breakpointObserver
      .observe(['(max-width: 770px)'])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(result => {
        let tempDir: 'vertical' | 'horizontal' = result.matches ? 'vertical' : 'horizontal';
        if (tempDir !== this.stepDirection) {
          this.stepDirection = tempDir;
          this.cdr.markForCheck();
        }
      });
  }

  goStep(step: number): void {
    this.componentPortal = new ComponentPortal(this.stepComponentArray[step]);
    this.selectedPortal = this.componentPortal;
  }

  ngAfterViewInit(): void {
    this.goStep(StepEnum.One);
  }

  ngOnDestroy(): void {
    console.log('fenbu');
  }
}
