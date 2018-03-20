import { Component, OnInit, ViewChild } from '@angular/core';
import { WfwEventsService } from 'wfw-shared/services/wfw-events.service';
import { MenuItem, TabMenu } from 'primeng/primeng';
import { SearchResultsService } from 'wfw-shared/services/search-results.service';
import { SearchQuery } from 'wfw-shared/models/search.interface';
import { WfwNotificationService } from 'wfw-shared/services/notification.service';
import { NotificationType } from 'wfw-shared/models/notification-type.interface';
import { GridEntityType } from 'wfw-shared/models/grid-entity.model';
import { SummaryTab } from '../list-view/search-summary/summary-tab.interface';


@Component({
  selector: 'wfw-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  public tabs: MenuItem[];
  public summaryTabs: SummaryTab[] = [];
  public activeTab: MenuItem;
  public searchResults: any;
  public searchResultRows: any;
  public searchResultCols: any = [];

  constructor(
    private _wfwEvents: WfwEventsService,
    public _searchSvc: SearchResultsService,
    private notificationService: WfwNotificationService
  ) {
    this._wfwEvents.event$.subscribe(event => {
      if (this[event.name]) {
        this[event.name](event.data);
      }
    });
  }

  ngOnInit() {
  }

  lazyLoadData(event) {
    // event.first = First row offset
    // event.rows = Number of rows per page
    // event.sortField = Field name to sort with
    // event.sortOrder = Sort order as number, 1 for asc and -1 for dec
    // filters: FilterMetadata object having field as key and filter value, filter matchMode as value
    if (this._searchSvc.searchResultRows) {
      this._searchSvc.currentSearchQuery.rows = event.rows;
      this._searchSvc.currentSearchQuery.start = event.first;

      // sort results sever side if necessary
      if (event.sortField && event.sortOrder) {
        this._searchSvc.currentSearchQuery.sortBy = event.sortField;
        this._searchSvc.currentSearchQuery.sortOrder = event.sortOrder === 1 ? 'asc' : 'desc';
      }

      this.updateSearchResults();
    } else {
      this._searchSvc.gridConfig.loading = false;
    }
  }

  updateSearchResults() {
    // set the data table to load
    this._searchSvc.gridConfig.loading = true;

    // query the search service and load the data into the table
    this._searchSvc.executeSearch().subscribe(res => {
      this.searchResultRows = (res as any).response.docs;
      this.renderTabs(res);
      this.setGridHeader();
      this._searchSvc.gridConfig.loading = false;
    });
  }

  clearSort() {
    this._searchSvc.currentSearchQuery.sortBy = 'score';
    this._searchSvc.currentSearchQuery.sortOrder = 'desc';
  }

  searchbar_searchCompleted(results: any) {
    console.log('SearchResults:', 'Search completed', results);
  }

  searchbar_executeSearch(query: any) {
    console.log('SearchResults:', 'Execute Search', query);

    this._searchSvc.currentSearchQuery.attributeQuery = '';
    this._searchSvc.currentSearchQuery.q = query;
    this.updateSearchResults();
  }

  searchbar_clearSearch() {
    console.log('SearchResults:', 'Clear Search');
    this._searchSvc.clearSearch().subscribe(res => {
      this.tabs = [];
      this.searchResultRows = [];
      this.searchResultCols = [];
      this.searchResults = [];
    });
  }

  /**
     * @method getGridHeader
     * @description Get the column headers from the table row
  */
  setGridHeader(): void {
    if (this.searchResultRows && this.searchResultRows[0]) {
      const headConfig = this._searchSvc.gridConfig.columnConfig;
      let index = 0;
      Object.keys(this.searchResultRows[0]).forEach(item => {

        if (index < 6) {
          this.searchResultCols.push(Object.assign({
            'colName':  item,
            'colDisplayName':  item,
            'hidden': false,
            'filter': true,
            'filterMatchMode': 'contains',
            'filterPlaceholder': 'Search'
          }, (headConfig.headerConfig || {}) ));
        }
        index++;
      });
    }
  }

  /**
   * @method renderTabs
   * @description render the tabs above the data grid
  */
  renderTabs(searchResultsResponse) {
    // clear tabs, clean datatable
    this.tabs = [];
    this.summaryTabs = [];
    this.searchResults = [];
    const dataMap = new Map<string, GridEntityType>();
    // extract object types
    const n = Object.keys(searchResultsResponse.facet_counts.facet_fields.sys_entitytype).length;
    let i = 0;
    // get entity types and count
    while (i < n) {
      const entityType: GridEntityType = new GridEntityType(
        searchResultsResponse.facet_counts.facet_fields.sys_entitytype[i],
        searchResultsResponse.facet_counts.facet_fields.sys_entitytype[i + 1]);
      this.searchResults.push(entityType);
      dataMap.set(searchResultsResponse.facet_counts.facet_fields.sys_entitytype[i], entityType);
      i += 2;
    }

    // add first tab
    this.tabs.push({ label: 'All (' + this._searchSvc.totalRowCount + ')', command: (event) => this.selectAllTabEvent(event) });
    // add all summary tab
    this.summaryTabs.push({ title: 'All', count: this._searchSvc.totalRowCount, command: (event) => this.selectAllTabEvent(event) });
    // render tabs
    this.searchResults.forEach(searchResult => {
      this.summaryTabs.push({ title: searchResult.name, count: searchResult.count, command: (event) => {
          // Tab click event method body, this function is invoked on tab click
          this.selectEntityTabEvent(searchResult.entityType);
        }
      });
      this.tabs.push({
        label: searchResult.name + ' (' + searchResult.count + ')', command: (event) => {
          // Tab click event method body, this function is invoked on tab click
          this.selectEntityTabEvent(searchResult.entityType);
        }
      });
    });

    // sort tabs in ascending order
    this.tabs.sort(function (a, b) {
      if (a.label > b.label) {
        return 1;
      } else if (a.label < b.label) {
        return -1;
      } else {
        return 0;
      }
    });

  }

  selectAllTabEvent(event) {
    this._searchSvc.gridConfig.loading = true;
    this._searchSvc.currentSearchQuery.attributeQuery = '';
    this.clearSort();
    this._searchSvc.executeSearch().subscribe(res => {
      this.searchResultRows = (res as any).response.docs;
      this._searchSvc.gridConfig.loading = false;
    });
  }

  selectEntityTabEvent(entityType) {
    console.log('change results to ', entityType);
    // set this tab entity type in search context
    this._searchSvc.gridConfig.loading = true;
    this._searchSvc.currentSearchQuery.attributeQuery = `(${this._searchSvc.SEARCH_CONSTANTS.entityType}:${entityType})`;
    this.clearSort();
    this._searchSvc.executeSearch().subscribe(res => {
      this.searchResultRows = (res as any).response.docs;
      this._searchSvc.gridConfig.loading = false;
    });
  }

  /**
   * Selection logic
   */

  selectOrUnselectAllRecords(select: boolean) {
    console.log(select);
    if (!select) {
      // deselect
      this._searchSvc.selectedResults = [];
      this._searchSvc.totalRecordsSelected = false;
      this.notificationService.clear();
    } else {
      // select all on page
      this._searchSvc.searchResultRows.forEach(element => {
        this._searchSvc.selectedResults.push(element.id);
      });

      // show select total records message
      this.showTotalRecordsBanner();
    }
  }

  showTotalRecordsBanner() {
    console.log('select all');
    this.notificationService.message({
      severity: 'warn',
      summary: `All ${this._searchSvc.currentSearchQuery.rows} result(s)`,
      detail: 'on this page are selected.',
      closable: true,
      eventTitle: `Select all ${this._searchSvc.totalRowCount} result(s).`,
      event: (message) => {
        console.log('select all total records');
        this._searchSvc.totalRecordsSelected = true;
        this.notificationService.clearMessageById(message.id);
        this.showTotalRecordsSelectedBanner();
      }
    });
  }

  showTotalRecordsSelectedBanner() {
    this.notificationService.message({
      severity: 'warn',
      summary: `All ${this._searchSvc.totalRowCount} result(s)`,
      detail: ' are selected.',
      closable: true,
      eventTitle: `Clear selection`,
      event: (message) => {
        this._searchSvc.totalRecordsSelected = false;
        this._searchSvc.selectedResults = [];
        this.notificationService.clearMessageById(message.id);
      }
    });
  }

  /**
   * Edit Event Listeners
   */
  onEdit($event) {
    console.log($event);
  }

  onEditComplete($event) {
    console.log($event);
  }

  onEditCancel($event) {
    console.log($event);
  }

}
