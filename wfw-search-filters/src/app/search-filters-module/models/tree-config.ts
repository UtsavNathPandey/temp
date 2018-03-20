import { TreeNode } from 'primeng/primeng';
export interface TreeConfig {
  index: number;
  node: string;
  value: string;
}

export interface FilterConfig {
  data_sources: TreeNode[];
  data_types: TreeNode[];
}

export interface FilterParameters {
  sys_category: (string|number) [];
  sys_entitytype: (string|number) [];
}
