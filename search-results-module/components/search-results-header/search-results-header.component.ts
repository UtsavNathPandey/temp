import { Component, OnInit } from '@angular/core';

import { SearchResultsService } from 'wfw-shared/services/search-results.service';

@Component({
  selector: 'wfw-search-results-header',
  templateUrl: './search-results-header.component.html',
  styleUrls: ['./search-results-header.component.scss']
})
export class SearchResultsHeaderComponent implements OnInit {

  viewDropdownOptions: any[] = [];
  sortFieldOptions:  any[] = [];

  constructor(
    public _searchSvc: SearchResultsService
  ) {
  }

  ngOnInit() {
    this._searchSvc.searchConfigurations.subscribe(res => {
      // load the views into the dropdown
      res.resultViews.forEach(view => {
        this.viewDropdownOptions.push({
          label: view,
          value: view
        });
      });

      // set the default view
      this._searchSvc.selectedView = res.defaultResultView;

      // load the sort fields, we always default relevance fields
      this.sortFieldOptions.push({
        label: `Relevance (A-Z)`,
        value: {
          field: 'score',
          order: 'asc'
        }
      });
      this.sortFieldOptions.push({
        label: `Relevance (Z-A)`,
        value: {
          field: 'score',
          order: 'desc'
        }
      });
      res.sortFields.forEach(field => {
        this.sortFieldOptions.push({
          label: `${field} (A-Z)`,
          value: {
            field: field,
            order: 'asc'
          }
        });
        this.sortFieldOptions.push({
          label: `${field} (Z-A)`,
          value: {
            field: field,
            order: 'desc'
          }
        });
      });


    });
  }

  /**
   * @method applySort
   * @param $event.value contains the updated dropdown value
   * @description apply the sort selected from the drop down
  */
  applySort($event): void {
    console.log($event);
    if (this._searchSvc.searchResultsResponse) {
      this._searchSvc.currentSearchQuery.sortBy = $event.value.field;
      this._searchSvc.currentSearchQuery.sortOrder = $event.value.order;

      this._searchSvc.executeSearch().subscribe();
    }
  }

  /**
   * @method backToSearch
   * @description Back to search results
  */
  backToSearch(): void {
    console.log('back to search clicked');
  }

  /**
   * @method addTocart
   * @description this method adds records to shopping cart
  */
  addToCart(): void {
    console.log('global add to cart  clicked');
  }

  /**
   * @method launchLogViewer
   * @description this method launch logviewer
  */
  launchLogViewer(): void {
    console.log('global logviewer clicked');
  }
}
