import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'wfw-cell-editor',
  templateUrl: './cell-editor.component.html',
  styleUrls: ['./cell-editor.component.scss']
})
export class CellEditorComponent implements OnInit, OnDestroy {

  @Input('initialValue') initialValue: string;
  @Input('rowData') rowData: any;
  @Input('colData') colData: any;
  @Input('colField') colField: string;
  @Output() onCellSave: EventEmitter<any> = new EventEmitter(null);
  @Output() onCellClose: EventEmitter<any> = new EventEmitter(null);

  public value: string = '';
  public row: any;
  public cell: any;
  public propName: string;

  constructor() { }

  ngOnInit(): void {
    this.value = this.initialValue;
    this.row = this.rowData;
    this.cell = this.colData;
    this.propName = this.colField;
  }

  /**
   * @method close
   * @description To close the cell editor without updating the data
  */
  close(): void {
    this.value = this.initialValue;
    this.onCellClose.emit('cell close');
  }

  /**
   * @method save
   * @description To update the data with the new value
  */
  save(): void {
    this.row[this.propName].value ? this.row[this.propName].value = this.value : this.row[this.propName] = this.value;
    this.onCellSave.emit(this.value);
  }

  ngOnDestroy(): void {
    this.value = this.initialValue;
  }

}
