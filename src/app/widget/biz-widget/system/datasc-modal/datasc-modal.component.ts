import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild, computed, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidationFormService } from '@app/core/services/common/message-errors.service';
import { DataScObj } from '@app/core/services/http/system/datasc.service';
import { OptionsInterface } from '@app/core/services/types';
import { AntTableComponent, AntTableConfig } from '@app/shared/components/ant-table/ant-table.component';
import { CardTableWrapComponent } from '@app/shared/components/card-table-wrap/card-table-wrap.component';
import { fnCheckForm } from '@app/utils/tools';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Observable, of } from 'rxjs';
import { DataService } from './data.service';

@Component({
  selector: 'app-datasc-modal',
  templateUrl: './datasc-modal.component.html',
  styleUrls: ['./datasc-modal.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CardTableWrapComponent, AntTableComponent,
    FormsModule, NzFormModule, NzButtonModule, ReactiveFormsModule, NzSelectModule, NzInputNumberModule, NzInputModule, NzSwitchModule
  ]
})
export class DatascModalComponent implements OnInit{
  readonly nzModalData: DataScObj = inject(NZ_MODAL_DATA);
  addEditForm!: FormGroup;
  params!: DataScObj;
  isEdit = false;
  value?: string;

  isReadonly = false;
  messageErrors: any = [];
  lang : OptionsInterface[] = [];
  menuName = "";
  listdatasc : DataScObj[] = [];
  tieudeNew = "";

  showBtnAddList = false;

  tableConfig!: AntTableConfig;
  
  mode: boolean = false; // false => insert, true => update
  private fb = inject(FormBuilder);
  public vf = inject(ValidationFormService);
  public message = inject(NzMessageService);
  private cdr = inject(ChangeDetectorRef);
  private dataSevice = inject(DataService);
  private modalSrv= inject(NzModalService);

  dataList = this.dataSevice.cartItems;

  @ViewChild('operationTpl', { static: true }) operationTpl!: TemplateRef<any>;
  constructor(private modalRef: NzModalRef) {
    this.lang = [
      {
        value: 'vi',
        label: 'Tiếng việt'
      },
      {
        value: 'en',
        label: 'Tiếng Anh'
      },
      {
        value: 'ja',
        label: 'Tiếng Nhật'
      },
    ]
  }

  protected getAsyncFnData(modalValue: NzSafeAny): Observable<NzSafeAny> {
    return of(modalValue);
  }

  protected getCurrentValue(): Observable<NzSafeAny> {
    this.addEditForm.value.list = this.listdatasc;
    return of(this.addEditForm.value);
  }

  get f():{ [key: string]: AbstractControl } {
    return this.addEditForm.controls;
  }

  ngOnInit(): void {
    this.initForm();
    this.initTable();
    this.isEdit = !!this.nzModalData;
    if (this.isEdit) {
      if(this.nzModalData._id) {
          this.isEdit = true;
          this.addEditForm.patchValue(this.nzModalData);
          this.showBtnAddList = true;
      }
    }
  }

  addList(){
    if (!fnCheckForm(this.addEditForm)) {
      return of(false);
    }
    let obj : DataScObj = {
      idmenu: this.nzModalData.idmenu,
      title1: this.addEditForm.value.title1,
      title2:  this.addEditForm.value.title2,
      lang: this.addEditForm.value.lang,
      vitri: this.addEditForm.value.vitri,
      status:  this.addEditForm.value.status
    }
    // thực hiện update 
    if(this.mode === true) {
       this.dataSevice.updateInCart(obj);
       this.addEditForm.reset({status: true});
       this.mode = false;
       return "";
    } else { // thực hiện regist
       // kiểm tra có trung key khi tạo mới
       let item = this.dataList().find(item=> item.vitri === obj.vitri)
       if(item) {
          this.message.error("Tiều để này đã tồn tại");
          return of(false);
       } else {
          this.dataSevice.addToCart(obj);
          this.getDataList();
          this.tieudeNew = obj.title1;
          this.addEditForm.reset({status: true});
          return "";
       }
       
    }

  }

  initForm(): void {
    this.addEditForm = this.fb.group({
      title1: [null, [Validators.required]],
      title2: [null],
      status: [true],
      lang: ['vi', [Validators.required]],
      vitri: [null],
      list: this.listdatasc
    });
  }

  edit(vitri: number) : void {

     let item: DataScObj | undefined = this.dataList().find(item => item.vitri === vitri);
     if(item) {
       this.addEditForm.patchValue(item);
       this.mode = true;
     }
  }

  del(vitri: number): void {
      this.modalSrv.confirm({
        nzTitle: "Bạn có chắc chăn muốn xóa không ?" ,
        nzContent : "Nhấn OK để tiếp tục !",
        nzOnOk: () => {
          this.tableLoading(true);
          let item: DataScObj | undefined = this.dataList().find(item => item.vitri === vitri);
          if(item) {
             this.dataSevice.removeFromCart(item);
             this.tableLoading(false);
          }
        }
      })
  }

  allDel(): void {
    this.modalSrv.confirm({
      nzTitle: "Bạn có chắc chăn muốn xóa không ?" ,
      nzContent : "Nhấn OK để tiếp tục !",
      nzOnOk: () => {
        this.dataSevice.cartItems.set([]);
      }
    })
  }

  getDataList(e?: NzTableQueryParams): void {
    this.tableLoading(false);
    

  }

  // Phát hiện thay đổi bảng kích hoạt
  tableChangeDectction(): void {
    // Thay đổi tham chiếu sẽ kích hoạt phát hiện thay đổi.
   // this.dataList = [...this.dataList];
    this.cdr.detectChanges();
  }

  tableLoading(isLoading: boolean): void {
    this.tableConfig.loading = isLoading;
    this.tableChangeDectction();
  }

  reloadTable(): void {
    this.message.info('Làm mới thành công');
    this.getDataList();
  }

  selectedChecked(e: any[]): void {
    this.checkedCashArray = [...e];
  }

  checkedCashArray: any[] = [];

  // Sửa đổi số lượng mục trên mỗi trang
  changePageSize(e: number): void {
    this.tableConfig.pageSize = e;
  }

  private initTable(): void {
    this.tableConfig = {
      showCheckbox: true,
      headers: [
        {
          title: 'Title 1',
          field: 'title1',
          width: 200
        },
        {
          title: 'title 2',
          width: 200,
          field: 'title2'
        },
        {
          title: 'Ngôn ngữ',
          width: 100,
          field: 'lang'
        },
        {
          title: 'Vị trí',
          width: 80,
          field: 'vitri'
        },
        {
          title: 'Vận hành',
          tdTemplate: this.operationTpl,
          width: 200,
          fixed: true,
          fixedDir: 'right'
        }
      ],
      total: 0,
      loading: true,
      pageSize: 10,
      pageIndex: 1
    };
  }

}
