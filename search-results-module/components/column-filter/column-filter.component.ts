import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SelectItem } from 'primeng/primeng';

@Component({
  selector: 'wfw-column-filter',
  templateUrl: './column-filter.component.html',
  styleUrls: ['./column-filter.component.scss']
})
export class ColumnFilterComponent implements OnInit {

  @Input('column') column = null;
  @Output() onChange: EventEmitter<any> = new EventEmitter(null);

  public columnFilters: SelectItem[] = [];
  public filterText: string = '';
  public selectedFilter: string = 'startsWith';
  constructor() { }

  ngOnInit() {
    this.columnFilters = [
      {label: 'Starts With', value: 'startsWith'},
      {label: 'Ends With', value: 'endsWith'},
      {label: 'Contains', value: 'contains'},
      {label: 'Equals', value: 'equals'},
      {label: 'In', value: 'in'}
    ];
  }

  filterColumn() {
    this.onChange.emit({
      'value': this.filterText,
      'column': this.column.field,
      'filter': this.selectedFilter
    });
  }

  changeFilter(filter) {
    this.selectedFilter = filter;
    this.onChange.emit({
      'value': this.filterText,
      'column': this.column.field,
      'filter': this.selectedFilter
    });
  }

}
