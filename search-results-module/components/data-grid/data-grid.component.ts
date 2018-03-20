import { Component, OnInit, OnChanges, Host, Input, Output, HostListener, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { DataTable } from 'primeng/primeng';
import { MenuItem, TabMenu, SelectItem } from 'primeng/primeng';
import { GridService } from './../../services/grid.service';
import { ExcelService } from '../../services/excel.service';
import { GridConfig } from 'wfw-shared/models/grid.interface';
import { GridBaseClass } from './grid.base.class';

@Component({
  selector: 'wfw-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss']
})
export class WfwDataGridComponent extends GridBaseClass implements OnInit, OnChanges {

  @Input('counter') counter = 0;
  @Input('gridHeight') gridHeight: number;
  @Input('gridConfig') gridConfig: GridConfig;
  @Input('tabs') tabs: MenuItem[] = [];
  @Input('rows') rows: any;
  @Input('isNested') isNested: boolean = false;
  @Input('gridCols') gridCols: Array<any> = [];
  @Input('totalRowCount') totalRowCount: number;
  @Input('queryText') queryText: string;

  @Output() onEdit: EventEmitter<any> = new EventEmitter(null);
  @Output() onEditComplete: EventEmitter<any> = new EventEmitter(null);
  @Output() onEditCancel: EventEmitter<any> = new EventEmitter(null);
  @Output() onLazyLoadTriggered: EventEmitter<any> = new EventEmitter(null);
  @Output() allRecordsChecked: EventEmitter<boolean> = new EventEmitter(false);

  @ViewChild('dt') grid: DataTable;
  @ViewChild('tabMenu') public tabMenu: TabMenu;

  public activeTab: MenuItem;
  public tabsPosition: number = 0;
  public tabMenuWidth: number = 0;
  public tabMenuContainerWidth: number = 0;
  public currentlySelectedColumnIndex: number = null;
  public currentFilterColumnIndex: number = null;
  public columnChooserDialogVisible: boolean = false;

  public nestedGridHeight: number;
  public excelFileName: string = 'gridExcel';

  constructor(
    private excelService: ExcelService,
    private elementRef: ElementRef,
    private gridService: GridService
  ) {
    super();
    /* calling GridBaseClass method to disable drag and drop functionality for specific columns */
    this.disableDragOnColumn();
    this.disableDropOnColumn();
  }

  ngOnInit() {
    // increment the counter for the nested grids
    this.counter++;
  }

  ngOnChanges() {
    // set the grid height whenever the panel height changes on resize
    this.setGridHeight();
  }

  lazyLoad(event) {
    this.onLazyLoadTriggered.emit(event);
  }

  selectOrUnselectAllResults(event) {
    this.allRecordsChecked.emit(event.checked);
  }

  /**
   * @method setGridHeight
   * @description set the grid height
  */
  setGridHeight() {
    if (this.grid) {
      this.grid['scrollHeight'] = (this.gridHeight) + 'px';
      this.nestedGridHeight = this.gridHeight - 130;
    }
  }

  /**
     * @method setNoOfRecords
     * @description Set the no of records in the grid
  */
  getNoOfRecords(): String {
    if (this.grid != null && this.totalRowCount) {
      const from = this.totalRowCount > 0 ? this.grid.first + 1 : 0;
      const to = ( from - 1 + Number(this.grid.rows) ) > this.totalRowCount ? this.totalRowCount : (from - 1 + Number(this.grid.rows) );
      const noOfRecords = `${from} - ${to} of ${this.totalRowCount} results for "${this.queryText}"`;

      return noOfRecords;
    } else {
      return '';
    }
  }

  /**
     * @method drag
     * @description This method is called when dragging on a tab is started and it saves the dragged element ID
     * @param event Dragged tab element
  */
  drag(event): void {
    event.dataTransfer.setData('draggedElt', event.target.getAttribute('data-index'));
    event.dataTransfer.setData('draggedContentId', event.target.getAttribute('data-grid-tab-id'));
  }

  /**
   * @method drop
   * @description This method is called when a dragged tab is dropped on a tab whose position is shifted right
   * and dragged element takes its position
   * @param event Dropped tab element
  */
  drop(event): void {
    event.preventDefault();
    if (event.dataTransfer.getData('draggedContentId') === event.target.getAttribute('data-grid-tab-id')) {
      const fromIndex = event.dataTransfer.getData('draggedElt');
      this.tabs.splice(event.target.getAttribute('data-index'), 0, this.tabs.splice(fromIndex, 1)[0]);
    }
  }

  /**
   * @method allowDrop
   * @description Inorder to allow drop on the element the default handling is prevented. This is fired on dragover event
   * @param event Tab element upon which dragged element is taken
  */
  allowDrop(event): void {
    event.preventDefault();
  }

  /**
   * @method exportToExcel
   * @description To export grid data to the excel service
  */
  exportToExcel(): void {
    this.excelService.exportToExcel(this.rows, this.excelFileName);
  }

  /**
	* Tabs methods
	*/

  public scrollTabMenuLeft(event) {
    const tabMenuDom = this.elementRef.nativeElement.querySelector('.ui-tabmenu.ui-widget.ui-widget-content.ui-corner-all ul');
    tabMenuDom.scrollLeft -= 100;
  }

  public scrollTabMenuRight(event) {
    const tabMenuDom = this.elementRef.nativeElement.querySelector('.ui-tabmenu.ui-widget.ui-widget-content.ui-corner-all ul');
    tabMenuDom.scrollLeft += 100;
  }

  /**
   * Column Settings
   */

  public setCurrentlySelectedColumnIndex(index) {
    this.currentlySelectedColumnIndex = index;
  }

  public hideCurrentlySelectedColumn() {
    this.gridCols[this.currentlySelectedColumnIndex].hidden = true;
  }

  public toggleColumn(index) {
    this.gridCols[index].hidden = !this.gridCols[index].hidden;
  }

  public setColumnForFiltering(index) {
    this.currentFilterColumnIndex = index;
  }

  public setColumnToFilter(filter) {
    console.log(filter);
    this.gridCols[this.currentFilterColumnIndex].filterMatchMode = filter.value;
  }

  public filterColumn($event) {
    this.grid.filter($event.value, $event.column, $event.filter);
  }

  /**
   * Edit Event Pass throughs
   */

  onEditInit($event) {
    this.onEdit.emit($event);
  }

  closeEditor() {
    this.grid.switchCellToViewMode(this.grid.editingCell);
  }

  /**
   * @method editSuccess
   * @param $event: result from the cell-editor component
   * @description To handle the result after cell data edit is completed
  */
  editSuccess($event: any) {
    this.grid.domHandler.removeClass(this.grid.editingCell, 'ui-cell-editing');
    this.onEditComplete.emit($event);
  }

  /**
   * @method editCancel
   * @param $event: result from the cell-editor component
   * @description To handle the result after cell data edit is cancelled
  */
  editCancel($event) {
    this.grid.domHandler.removeClass(this.grid.editingCell, 'ui-cell-editing');
    this.onEditCancel.emit($event);
  }

  /**
   * @method styleForCell
   * @param elm: DOM element of actual cell
   * @param cell: data of actual cell. Can be a string or object of type {value, color}
   * @description To export grid data to the excel service
  */
  private styleForCell(cell: any, elm: any) {
    if (cell && cell.color) {
      let td;

      if (elm.parentNode) {
        td = elm.parentNode.parentNode;
      }

      if (this.gridConfig.dataValidation && td) {
          // hack to make td styling work:
          // https://github.com/primefaces/primeng/issues/2157
          td.classList.add(cell.color);
      }
    }
  }
}
