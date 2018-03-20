import { TreeNode } from 'primeng/primeng';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Refinement } from './../models/refinement';
import { SearchResultsService } from 'wfw-shared/services/search-results.service';

@Injectable()
export class RefinementService {
  private refinementSubject = new Subject<any>();
  private removedRefinementSubject = new Subject<any>();
  private refinementArr: Refinement[] = [];
  private dataTypeArr: Refinement[] = [];

  constructor(private _searchSvc: SearchResultsService) {}

  /**
 * @method setAppliedRefinements
 * @description Function to update selected refinements
 * @param selectedNodeArr: selected options from the available refinements
 * @param message: type of the available refinement
 */
  setAppliedRefinements(selectedNodeArr: any) {
    this.refinementArr = [];
    selectedNodeArr.forEach(element => {
      if (element) {
        const refinementObj: Refinement = { TreeNode: element };
        this.refinementArr.push(refinementObj);
        this.createUniqDataTypeArray(refinementObj);
      }
    });
    this.refinementSubject.next(this.refinementArr);
  }

  /**
 * @method createUniqDataTypeArray
 * @description Function to create unique attribute array
 */
  private createUniqDataTypeArray(refObj) {
    if (refObj.TreeNode.parent && refObj.TreeNode.parent.data
      && refObj.TreeNode.parent.data === 'Data Type'
      && this.dataTypeArr.indexOf(refObj.TreeNode) === -1) {
        this.dataTypeArr.push(refObj.TreeNode);
        this.getDataTypeData(refObj.TreeNode.data);
    }
    return;
  }

  /**
 * @method getDataTypeData
 * @description Function to make service call to receive data for selected attribute
 */
  getDataTypeData (data: string) {
    this._searchSvc.getMetadataForEntityType(data).subscribe((res) => {
      console.log(res);
    });
    return;
  }

  /**
 * @method clearAllAppliedRefinements
 * @description Function to clear all applied refinements
 */
  clearAllAppliedRefinements() {
    this.refinementSubject.next();
    const refinementObj: Refinement = { TreeNode: '' };
    this.removedRefinementSubject.next(refinementObj);
  }

  /**
 * @method getAppliedRefinements
 * @description Function to expose the applied refinements object as an observable
 */
  getAppliedRefinements(): Observable<Refinement[]> {
    return this.refinementSubject.asObservable();
  }

  /**
 * @method getUnAppliedRefinements
 * @description Function to expose the un-applied refinements object as an observable.
 * This observable will be triggered by the Applied Refinements components once a filter is removed by user
 */
  getUnAppliedRefinements(): Observable<any> {
    return this.removedRefinementSubject.asObservable();
  }

  /**
 * @method removeAppliedRefinements
 * @description remove applied refinements
 * @param index: index of item in array
 */
  removeAppliedRefinements(index: number) {
    const refinementObj = this.refinementArr[index];
    this.refinementArr.splice(index, 1);
    this.refinementSubject.next(this.refinementArr);
    // ToDo: Service call
    this.removedRefinementSubject.next(refinementObj);
  }

  /**
 * @method spliceOutNodeFromSelectedFileArray
 * @description remove the node from selectedFile array
 * @param nodeToBeSpliced: node to be removed
 * @param selectedFile: array which contains all selected nodes
 */
  spliceOutNodeFromSelectedFileArray(nodeToBeSpliced, selectedFile) {
    const nodeIndx = selectedFile.indexOf(nodeToBeSpliced);
    selectedFile.splice(nodeIndx, 1);
    return selectedFile;
  }

  /**
 * @method childNodeInSelectedFile
 * @description check if the node is present in selectedFile array
 * @param childNode: node to be checked
 * @param selectedFile: array which contains all selected nodes
 */
  childNodeInSelectedFile(childNode, selectedFile) {
    if (selectedFile.indexOf(childNode) !== -1) {
      return true;
    } else {
      return false;
    }
  }

  /**
 * @method removePartialSelection
 * @description loop over parents and remove partialSelected
 * @param removableParent: parent node whose partialSelected property is to be removed
 */
  removePartialSelection(removableParent) {
    if (removableParent.partialSelected && removableParent.partialSelected === true) {
      // remove the property
      delete removableParent.partialSelected;
    }
    // check if it has a parent
    if (removableParent.parent) {
      // assign it's parent to removableParent
      removableParent = removableParent.parent;
      // call the function again
      this.removePartialSelection(removableParent);
    }
    return removableParent;
  }

  /**
 * @method childUnselection
 * @description Function to remove children of removed refinement
 * @param removedRefinement: Removed refinement
 * @param selectedFile: array which contains all selected nodes
 */
  childUnselection(removedRefinement, selectedFile) {
    for (let i = 0; i < removedRefinement.TreeNode.children.length; i++) {
      if (removedRefinement.TreeNode.children[i].children) {
        for (let j = 0; j < removedRefinement.TreeNode.children[i].children.length; j++) {
          selectedFile = this.spliceOutNodeFromSelectedFileArray(
            removedRefinement.TreeNode.children[i].children[j], selectedFile);
        }
      }
      selectedFile = this.spliceOutNodeFromSelectedFileArray(
        removedRefinement.TreeNode.children[i], selectedFile);
    }
    return selectedFile;
  }

  /**
 * @method parentPartialSelectionUnselection
 * @description Update the styling of the ancestors of the currently selected node
 * @param currentParent: current parent
 * @param selectedFile: array which contains all selected nodes
 */
  parentPartialSelectionUnselection(currentParent, selectedFile) {
    if (!currentParent.partialSelected) {
      for (let i = 0; i < currentParent.children.length; i++) {
        if (selectedFile.indexOf(currentParent.children[i]) !== -1) {
          currentParent.partialSelected = true;
          break;
        }
        if (currentParent.children[i].children) {
          for (let j = 0; j < currentParent.children[i].children.length; j++) {
            if (selectedFile.indexOf(currentParent.children[i].children[j]) !== -1) {
              currentParent.partialSelected = true;
              break;
            }
          }
        }
      }
      selectedFile = this.spliceOutNodeFromSelectedFileArray(
        currentParent, selectedFile);
    } else if (currentParent.partialSelected) {
      currentParent = this.identifyPartiallySelectedParent(
        currentParent, selectedFile);
      if (!currentParent.foundChild) {
        delete currentParent.partialSelected;
      }
    }
    currentParent = currentParent.parent;
    if (currentParent) {
      this.parentPartialSelectionUnselection(currentParent, selectedFile);
    }
    console.log(selectedFile);
    this.setAppliedRefinements(selectedFile);
    return selectedFile;
  }

  /**
 * @method identifyPartiallySelectedParent
 * @description check if any of the child or child of the currentParent is present in
 * selectedFile, if present set currentParent as partialSelected and return
 * @param currentParent: current parent
 * @param selectedFile: array which contains all selected nodes
 */
  identifyPartiallySelectedParent(currentParent, selectedFile) {
    for (let i = 0; i < currentParent.children.length; i++) {
      const foundChildFlag = this.childNodeInSelectedFile(
        currentParent.children[i], selectedFile);
      if (foundChildFlag === true) {
        // set partial selected as true for currentParent and add a flag
        currentParent.partialSelected = true;
        currentParent.foundChild = true;
        return currentParent;
      }
      if (currentParent.children[i].children) {
        for (let j = 0; j < currentParent.children[i].children.length; j++) {
          const foundSubChildFlag = this.childNodeInSelectedFile(
            currentParent.children[i].children[j], selectedFile);
          if (foundSubChildFlag === true) {
            // set partial selected as true for currentParent and add a flag
            currentParent.partialSelected = true;
            currentParent.foundChild = true;
            return currentParent;
          }
        }
      }
    }
    currentParent.foundChild = false;
    return currentParent;
  }

  /**
 * @method cleanUpSelectedFileArray
 * @description Before making selectedFile empty, iterate through each of the items present
 * in the selectedFile and ensure none of their parent have partialSelected as true
 * @param selectedFile: array which contains all selected nodes
 */
  cleanUpSelectedFileArray(selectedFile) {
    for (let i = 0; i < selectedFile.length; i++) {
      // check if the selectedFile item has got a parent
      if (selectedFile[i].parent) {
        selectedFile[i].parent = this.removePartialSelection(
          selectedFile[i].parent);
      }
    }
    return selectedFile;
  }
}
