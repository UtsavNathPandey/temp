import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'wfw-filter-chips',
  templateUrl: './filter-chips.component.html',
  styleUrls: ['./filter-chips.component.scss']
})
export class FilterChipsComponent implements OnInit {
  fileLabel: any;
  @Input('fileData') fileData: any;
  @Output() onFilterRemoval: EventEmitter<any> = new EventEmitter(null);

  constructor() { }

  ngOnInit(): void {
    this.fileLabel = this.fileData;
  }

   /**
   * @method remove
   * @description To emit event for removal of the filter option
  */
  remove(): void {
    this.onFilterRemoval.emit('filter remove');
  }

}
