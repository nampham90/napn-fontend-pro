import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { ChangeDetectorRef, DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject } from 'rxjs';

import { SearchCommonVO } from '@core/services/types';
import { DeptService } from '@services/system/dept.service';
import { fnFlatDataHasParentToTree } from '@utils/treeTableTools';
import { NzTreeFlatDataSource, NzTreeFlattener } from 'ng-zorro-antd/tree-view';

interface TreeNode {
  id: number;
  tenphongban: string;
  disabled?: boolean;
  children?: TreeNode[];
}

export interface FlatNode {
  expandable: boolean;
  departmentName: string;
  id: number;
  level: number;
  disabled: boolean;
}

@Injectable()
export class DeptTreeService {
  private dataService = inject(DeptService);
  private cdr = inject(ChangeDetectorRef);
  TREE_DATA$ = new BehaviorSubject<any[]>([]);
  currentSelNode: FlatNode | null = null;
  destroyRef = inject(DestroyRef);
  private transformer = (node: TreeNode, level: number): FlatNode => ({
    expandable: !!node.children && node.children.length > 0,
    departmentName: node.tenphongban,
    level,
    id: node.id,
    disabled: !!node.disabled
  });
  // Không chọn nhiều
  selectListSelection = new SelectionModel<FlatNode>(false);

  treeControl = new FlatTreeControl<FlatNode>(
    node => node.level,
    node => node.expandable
  );

  treeFlattener = new NzTreeFlattener(
    this.transformer,
    node => node.level,
    node => node.expandable,
    node => node.children
  );

  dataSource = new NzTreeFlatDataSource(this.treeControl, this.treeFlattener);
  hasChild = (_: number, node: FlatNode): boolean => node.expandable;

  resetTree(): void {
    if (this.currentSelNode) {
      this.selectListSelection.deselect(this.currentSelNode);
      this.currentSelNode = null;
      this.cdr.markForCheck();
    }
  }

  clickNode(node: FlatNode): void {
    this.currentSelNode = node;
    this.selectListSelection.select(node);
  }

  initDate(): void {
    const params: SearchCommonVO<any> = {
      pageSize: 0,
      pageNum: 0
    };
    this.dataService
      .getDepts(params)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(deptList => {
        this.TREE_DATA$.next(fnFlatDataHasParentToTree(deptList.list));
      });
  }
}
