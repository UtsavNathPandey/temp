import { Component, OnInit } from '@angular/core';
import { WfwEventsService } from 'wfw-shared/services/wfw-events.service';
import { TreeDataTransformService } from './../../services/tree-data-transform.service';
import { FilterParameters } from '../../models/tree-config';
import { SearchResultsService } from 'wfw-shared/services/search-results.service';

@Component({
  selector: 'wfw-search-filters',
  templateUrl: './search-filters.component.html',
  styleUrls: ['./search-filters.component.scss']
})
export class SearchFiltersComponent implements OnInit {
  constructor(
    private _wfwEvents: WfwEventsService,
    private treeDataTransformService: TreeDataTransformService,
    private searchResultsService: SearchResultsService
  ) {
    this._wfwEvents.event$.subscribe(event => {
      if (this[event.name]) {
        this[event.name](event.data);
      }
    });
  }

  ngOnInit() {
    this.treeDataTransformService.setClassificationMappings();
    this.treeDataTransformService.setClassificationTypes();
  }

  /**
   * @method searchservice_searchCompleted
   * @description This is the event listener for the searchservice_searchCompleted event
   * this will be fired every time a search is executed
   * @param results - the search query response
   */
  searchservice_searchCompleted(results) {
    const filterParams: FilterParameters = {sys_category: [], sys_entitytype: []};
    console.log('searchComplete Triggered in SearchFilters');
    filterParams.sys_category = results.facet_counts.facet_fields.sys_category;
    filterParams.sys_entitytype = results.facet_counts.facet_fields.sys_entitytype;
    this.treeDataTransformService.setFilterParameters(filterParams);
    /* this.populateDataSources(results.facet_counts.facet_fields.sys_category);
    this.populateDataTypes(results.facet_counts.facet_fields.sys_entitytype); */
  }

  /* populateDataSources(sys_category: Array<string | number>) {
    console.log('Build data source tree:', sys_category);
  }

  populateDataTypes(sys_entitytype: Array<string | number>) {
    console.log('Build data type tree:', sys_entitytype);
  } */

}
