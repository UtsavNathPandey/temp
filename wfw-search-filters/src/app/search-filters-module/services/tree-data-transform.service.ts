import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { TreeNode } from 'primeng/primeng';
import { TreeConfig, FilterConfig, FilterParameters } from '../models/tree-config';
import { ClassificationMappings,
  ClassificationTypes,
  ClassificationMappingItem,
  ClassificationType } from 'wfw-shared/models/classification-type.interface';
import { SearchResultsService } from 'wfw-shared/services/search-results.service';

@Injectable()
export class TreeDataTransformService {
  private filterSubject = new Subject<any>();
  private mapArr: ClassificationMappingItem[];
  private typeArr: ClassificationType[];

  constructor(private searchResultsService: SearchResultsService) { }

  /**
 * @method setFilterParameters
 * @description Function to set the filter parameters used to create the Data Sources/Types filters
 */
  setFilterParameters(filterParams: FilterParameters) {
    this.filterSubject.next(filterParams);
  }

  /**
 * @method getFilterParameters
 * @description Function to register Observable to trigger the filter creation
 */
  getFilterParameters(): Observable<any> {
    return this.filterSubject.asObservable();
  }

   /**
 * @method setClassificationMappings
 * @description Function to set the classification mappings. These are used to bunch the data types
 */
  setClassificationMappings(): void {
    this.searchResultsService.getClassificationMappings().subscribe((mapObj: ClassificationMappings) => {
      this.mapArr = mapObj.classificationMapping;
    });
  }

  /**
 * @method setClassificationTypes
 * @description Function to set the classification types. These are used to set the display name of the data types
 */
  setClassificationTypes(): void {
    this.searchResultsService.getClassificationTypes().subscribe((typeObj: any) => {
      this.typeArr = typeObj.classificationTypes as ClassificationType[];
    });
  }

  /**
 * @method createFilters
 * @description Method used to aggregate the data sources/types transforms
 * @param filterParams: Object returned by the search service. Contains the data_sources and entity_types arrays
 */
  createFilters(filterParams: FilterParameters): FilterConfig {
    const filters: FilterConfig = {data_sources: [], data_types: []};
    const filterParam = {sys_category: ['0/EDM/', 1],
     sys_entitytype: ['Well', 1]};
    filters.data_sources = this.dataSourceTransform('Data Sources', filterParam.sys_category);
    filters.data_types = this.dataTypeTransform('Data Types', filterParam.sys_entitytype);
    return filters;
  }

  /**
 * @method dataSourceTransform
 * @description Method used to create the data sources transform
 * @param headerLabel: header text to be used for the root node
 * @param filterDataArr: sys_category array to be transformed into a TreeNode array
 */
  private dataSourceTransform(headerLabel: string, filterDataArr: (string|number)[]): TreeNode[] {
    let resultArr: TreeConfig[] = [];
    for (let i = 0, len = filterDataArr.length; i < len; i += 2) {
      const dataStr: string = filterDataArr[i] as string;
      const data: TreeConfig = {
        'index': parseInt(dataStr.charAt(0), 10),
        'node': dataStr.substr(2, dataStr.length - 3), // 3 => first 2 chars + last 1 char
        'value': ' (' + filterDataArr[i + 1] + ')'
      };
      resultArr.push(data);
    }
    resultArr = this.arraySortByProperty(resultArr, 'node');
    console.log(resultArr);
    const refinementArr: TreeNode[] = [];
    const parentNode: TreeNode = this.createTreeNodeObject();
    parentNode.children = this.createTreeNodes(resultArr);
    parentNode.data = parentNode.label = headerLabel;
    refinementArr.push(parentNode);
    return refinementArr;
  }

  /**
 * @method arraySortByProperty
 * @description utility used to sort an array of objects based on a property
 * @param arr: array to be sorted
 * @param prop: property against which the array is to be sorted
 */
  private arraySortByProperty<T>(arr: T[], prop: string): T[] {
    arr.sort((a, b) => {
      const prop1 =  a[prop].toLowerCase(), prop2 = b[prop].toLowerCase();
      // tslint:disable-next-line:curly
      if (prop1 < prop2) // sort string ascending
        return -1;
      // tslint:disable-next-line:curly
      if (prop1 > prop2)
        return 1;
      return 0; // default return value (no sorting)
    });
    return arr;
  }

  /**
 * @method createTreeNodes
 * @description method to create the Data Sources Tree
 * @param arr: intermediary array of objects created from sys_category
 */
  private createTreeNodes(arr: TreeConfig[]): TreeNode[] {
    const treeArr: TreeNode[] = [];
    for (let i = 0, len = arr.length; i < len; i++) {
      const treeNode: TreeNode = this.createTreeNodeObject();
      const data: TreeConfig = arr[i];
      const dataSplit = data.node.split('/');
      treeNode.label = dataSplit[data.index] + data.value;
      treeNode.data = data.node;
      if (data.index === 0) {
        treeArr.push(treeNode);
      } else {
        const tempNode: TreeNode = this.filterTreeNode(treeArr, data.node.substr(0, data.node.lastIndexOf('/')), 'data');
        tempNode.children.push(treeNode);
      }
    }
    return treeArr;
  }

  /**
 * @method createTreeNodeObject
 * @description method to create a new TreeNode
 */
  private createTreeNodeObject(): TreeNode {
    const treeNode = {
      label: '',
      data: '',
      children: [],
      expanded: true
    };
    return treeNode;
  }

   /**
 * @method filterTreeNode
 * @description utility to perform a deep filter against multiple nested arrays/objects. Returns an object.
 * @param obj: source object whose properties/ nested nodes are to be searched
 * @param data: data to be searched
 * @param propName: property against which data is to be searched
 */
  private filterTreeNode(obj: any, data: string, propName: string): TreeNode {
    let result: TreeNode = null;
    if (obj instanceof Array) {
      for (let i = 0; i < obj.length; i++) {
        result = this.filterTreeNode(obj[i], data, propName);
        if (result) {
          break;
        }
      }
    } else {
      for (const prop in obj) {
        // console.log(prop + ': ' + obj[prop]);
        if (obj.hasOwnProperty(prop)) {
          if (prop === propName) {
            if (obj[prop] === data) {
              return obj;
            }
          }
          if (obj[prop] instanceof Object || obj[prop] instanceof Array) {
            result = this.filterTreeNode(obj[prop], data, propName);
            if (result) {
              break;
            }
          }
        }
      }
    }
    return result;
  }

   /**
 * @method dataTypeTransform
 * @description method to create the Data Type Tree
 * @param headerLabel: header text to be used for the root node
 * @param entityArr: sys_entitytype array to be transformed into a TreeNode array
 */
  private dataTypeTransform(headerLabel: string, entityArr: (string|number)[]): TreeNode[] {
    let mapFound = false;
    const otherEntityArr: TreeNode[] = [],
      dataTypeArr: TreeNode[] = [];
    for (let i = 0, len = entityArr.length; i < len; i += 2) {
      const treeNode: TreeNode = this.createTreeNodeObject();
      mapFound = false;
      for (let j = 0, mapLen = this.mapArr.length; j < mapLen; j++) {
        if (entityArr[i].toString() === this.mapArr[j].entity.split('.')[1]) {
          mapFound = true;
          treeNode.data = entityArr[i];
          treeNode.label = entityArr[i] + ' (' + entityArr[i + 1] + ')';
          const filterData = this.filterTreeNode(dataTypeArr, this.mapArr[j].mapping, 'data');
          if (filterData) {
            filterData.children.push(treeNode);
          } else {
            // Create the parent node based on the mapping type
            const parentTreeNode: TreeNode = this.createTreeNodeObject();
            parentTreeNode.data = this.mapArr[j].mapping;
            parentTreeNode.label = this.mapArr[j].mapping;
            parentTreeNode.children.push(treeNode);
            dataTypeArr.push(parentTreeNode);
          }
          break;
        }
      }
      if (!mapFound) {
        treeNode.data = entityArr[i];
        treeNode.label = entityArr[i] + ' (' + entityArr[i + 1] + ')';
        otherEntityArr.push(treeNode);
      }
    }
    // update mapping text as per classificationType
    dataTypeArr.forEach((node: TreeNode) => {
      this.typeArr.filter((type) => {
        if (node.label === type.id) {
          node.label = type.displayName;
        }
      });
    });

    if (otherEntityArr.length > 0) {
      // Create the parent node for entities with missing mapping
      const parentTreeNode: TreeNode = this.createTreeNodeObject();
      parentTreeNode.data = 'Others';
      parentTreeNode.label = 'Others';
      parentTreeNode.children = otherEntityArr;
      dataTypeArr.push(parentTreeNode);
    }
    const dataTypeParentArr: TreeNode[] = [];
    const dataTypeParent: TreeNode = this.createTreeNodeObject();
    dataTypeParent.data = headerLabel;
    dataTypeParent.label = headerLabel;
    dataTypeParent.children = dataTypeArr;
    dataTypeParentArr.push(dataTypeParent);
    return dataTypeParentArr;
  }

}
