import { Component, OnInit, Output, Input, ViewChild, EventEmitter } from '@angular/core';
import { SearchResultsService } from 'wfw-shared/services/search-results.service';
import { WfwNotificationService } from 'wfw-shared/services/notification.service';
import { NotificationType } from 'wfw-shared/models/notification-type.interface';
import { MenuItem, DataList } from 'primeng/primeng';
import { SummaryTab } from './search-summary/summary-tab.interface';
@Component({
  selector: 'wfw-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {

  @Input() summaryTabs: SummaryTab[];
  @Output() allRecordsChecked: EventEmitter<any> = new EventEmitter(null);

  @ViewChild('dl') list: DataList;
  constructor(
    public _searchSvc: SearchResultsService,
    private notificationService: WfwNotificationService
  ) { }

  ngOnInit() {

  }

  selectOrUnselectAllResults(event) {
    this.allRecordsChecked.emit(event);
  }

  /**
     * @method setNoOfRecords
     * @description Set the no of records in the list
  */
  getNoOfRecords(): String {
    const total = this._searchSvc.totalRowCount;
    if (this.list != null && total) {
      const from = total > 0 ? this.list.first + 1 : 0;
      const to = ( from - 1 + Number(this.list.rows) ) > total ? total : (from - 1 + Number(this.list.rows) );
      const noOfRecords = `${from} - ${to} of ${total} results for "${this._searchSvc.currentSearchQuery.q}"`;

      return noOfRecords;
    } else {
      return '';
    }
  }

  loadData(event) {
  // event.first = First row offset
  // event.rows = Number of rows per page

    if (this._searchSvc.searchResultRows) {
      this._searchSvc.currentSearchQuery.rows = event.rows;
      this._searchSvc.currentSearchQuery.start = event.first;
      this._searchSvc.executeSearch().subscribe();
    }
  }

}
