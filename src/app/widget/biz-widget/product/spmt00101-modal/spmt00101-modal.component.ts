import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidationFormService } from '@app/core/services/common/message-errors.service';
import { ProductcategoryService } from '@app/core/services/http/product/productcategory.service';
import { Categorie } from '@app/model/product-model/categorie.model';
import { fnCheckForm } from '@app/utils/tools';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-spmt00101-modal',
  standalone: true,
  imports: [
    FormsModule,
    NzFormModule, 
    ReactiveFormsModule, 
    NzGridModule, 
    NzInputModule, 
    NzButtonModule,
    NzSelectModule
  ],
  templateUrl: './spmt00101-modal.component.html',
  styleUrl: './spmt00101-modal.component.less'
})
export class Spmt00101ModalComponent  implements OnInit{
  private fb = inject(FormBuilder);
  public vf = inject(ValidationFormService);
  readonly nzModalData: any = inject(NZ_MODAL_DATA);
  private categorieService = inject(ProductcategoryService)
  destroyRef = inject(DestroyRef);
  addEditForm!: FormGroup;

  lstCats = signal<Categorie[]>([]);
  ngOnInit(): void {
    this.initForm();
    this.apiGetListCategories();
  }

  constructor(private modalRef: NzModalRef) {}

  protected getAsyncFnData(modalValue: NzSafeAny): Observable<NzSafeAny> {
    return of(modalValue);
  }

  protected getCurrentValue(): Observable<NzSafeAny> {
      if (!fnCheckForm(this.addEditForm)) {
          return of(false);
      }
      return of(this.addEditForm.value);
  }

  get f():{ [key: string]: AbstractControl } {
      return this.addEditForm.controls;   
  }

  initForm(): void {
    this.addEditForm = this.fb.group({
        product_name: [null, [Validators.required]],
        category_id: [null, [Validators.required]],
    });
  }

  apiGetListCategories(): void{
    this.categorieService.category()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(res => { this.lstCats.set(res) });
  }

}
