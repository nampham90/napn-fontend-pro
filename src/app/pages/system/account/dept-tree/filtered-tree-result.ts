export interface TreeNode {
  department_name: string;
  disabled?: boolean;
  children?: TreeNode[];
  id: number;
}

export class FilteredTreeResult {
  constructor(public treeData: TreeNode[], public needsToExpanded: TreeNode[] = []) {}
}
