import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { TreeModule, TreeNode, OverlayPanelModule } from 'primeng/primeng';
import { RefinementService } from './../../services/refinement.service';
import { TreeDataTransformService } from './../../services/tree-data-transform.service';
import { Refinement } from './../../models/refinement';
import { FilterConfig, FilterParameters } from '../../models/tree-config';

@Component({
  selector: 'wfw-available-refinements',
  templateUrl: './available-refinements.component.html',
  styleUrls: ['./available-refinements.component.scss']
})

export class AvailableRefinementsComponent implements OnInit {
  filters: FilterConfig;
  dataSources: TreeNode[];
  dataTypes: TreeNode[];
  dataAttributes: TreeNode[];
  selectedFile: TreeNode[];
  subscription: Subscription;
  filterSubscription: Subscription;
  constructor(
    private refinementService: RefinementService,
    private treeDataTransformService: TreeDataTransformService) {}

  ngOnInit() {
    this.dataAttributes = [
      {
        'label': 'Attributes',
        'data': 'Attributes',
        'styleClass': 'fontBold',
        'expanded': true,
        'children': [
          {
            'label': 'Project',
            'data': 'Project',
            'styleClass': 'fontBold',
          },
          {
            'label': 'Min X',
            'data': 'Min X',
            'styleClass': 'fontBold',
          },
          {
            'label': 'Well',
            'data': 'Well',
            'styleClass': 'fontBold',
          }
        ]
      }
    ];

    // subscribe to home component messages
    this.subscription = this.refinementService.getUnAppliedRefinements().subscribe((removedRefinement: Refinement) => {
      console.log(removedRefinement);
      // Other than clear all
      if (removedRefinement.TreeNode !== '') {
        // Remove unselected item from selectedFile Array.
        this.selectedFile = this.refinementService.spliceOutNodeFromSelectedFileArray(
          removedRefinement.TreeNode, this.selectedFile);
        // remove the any child node of the unselected node, upto 2 levels
        if (removedRefinement.TreeNode.children) {
          this.selectedFile = this.refinementService.childUnselection(
            removedRefinement, this.selectedFile);
          // Set applied refinements in the selected-refinement-component
          this.refinementService.setAppliedRefinements(this.selectedFile);
        }
        // Service call to remove parent(s) of unselected item / mark them partially selected
        if (removedRefinement.TreeNode.parent) {
          this.selectedFile = this.refinementService.parentPartialSelectionUnselection(
            removedRefinement.TreeNode.parent, this.selectedFile);
        }
      }
      // Clear all
      if (!removedRefinement || removedRefinement.TreeNode === '') {
        // Run cleanup before making selectionFile Array empty
        this.selectedFile = this.refinementService.cleanUpSelectedFileArray(this.selectedFile);
        this.selectedFile = [];
      }
    });

    this.filterSubscription = this.treeDataTransformService.getFilterParameters().subscribe((FilterParams: FilterParameters) => {
      this.filters = this.treeDataTransformService.createFilters(FilterParams);
      this.dataSources = this.filters.data_sources;
      this.dataTypes = this.filters.data_types;
    });
  }

  /**
 * @method updateSelection
 * @description Function to update selected refinements from the available options
 * @param selectedFile: selected options from the available refinements
 */
  public updateSelection(selectedFile: TreeNode[]): void {
    this.refinementService.setAppliedRefinements(this.selectedFile);
  }

}
