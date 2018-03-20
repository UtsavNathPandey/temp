import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { WfwEventsService } from 'wfw-shared/services/wfw-events.service';

@Component({
  selector: 'wfw-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  public search = '';
  @Output() onClearSearch: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private _wfwEvents: WfwEventsService
  ) {
    this._wfwEvents.event$.subscribe( event => {
      if (this[event.name]) {
        this[event.name](event.data);
      }
    });
  }

  ngOnInit() {
  }

  /**
   @metod executeSearch
   @description use this method to initiate search
  */
  executeSearch() {
    console.log('SearchBar: Execute search - ', this.search);
    this._wfwEvents.emit('searchbar_executeSearch', this.search);
  }

  /**
   @metod clearSearch
   @description use this method to clear serach results in  filter refinements, search results page, search input and gis map
  */
  clearSearch(): void {
    this.search = '';
    console.log('SearchBar: Clear search - ', this.search);
    this._wfwEvents.emit('searchbar_clearSearch');
  }

}
