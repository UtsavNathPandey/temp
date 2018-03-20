import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { WfwEventsService } from 'wfw-shared/services/wfw-events.service';
import { HttpModule } from '@angular/http';
import { GridService } from './../../services/grid.service';
import { DataTableModule,
         RadioButtonModule,
         SharedModule,
         TabViewModule,
         TabMenuModule,
         OverlayPanelModule,
         DialogModule,
         ButtonModule } from 'primeng/primeng';
import { async, ComponentFixture, TestBed , inject} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { WfwDataGridComponent } from '../data-grid/data-grid.component';
import { GridConfig } from 'wfw-shared/models/grid.interface';
import { CellEditorComponent } from '../cell-editor/cell-editor.component';
import { ExcelService } from '../../services/excel.service';
import { ColumnSettingsButtonComponent } from '../column-settings-button/column-settings-button.component';
import { ColumnFilterComponent } from '../column-filter/column-filter.component';
import { Observable } from 'rxjs/Observable';

describe('WfwDataGridComponent', () => {

  let component: WfwDataGridComponent;
  let fixture: ComponentFixture<WfwDataGridComponent>;
  const gridConfig: GridConfig = {
    'url': 'search',
    'reorderableColumns': true,
    'resizableColumns': false,
    'rows': '10',
    'paginator': true,
    'pageLinks': 3,
    'expandableRows': true,
    'rowsPerPageOptions': ['5', '10', '20'],
    'scrollable': true,
    'editable': true,
    'dataValidation': false,
    'columnConfig': {
      'expanded': true,
      'selectionMode': null,
      'headerConfig': {
        'editable': true,
        'sortable': true,
      }
    }
  };
  const rows = [
    { 'id': 'id1', 'field_1': '300', 'field_2': 'FIELD_2_VAL_1', 'field3': 'FIELD_3_VAL_1' },
    { 'id': 'id2', 'field_1': '301', 'field_2': 'FIELD_2_VAL_2', 'field3': 'FIELD_3_VAL_2' },
    { 'id': 'id3', 'field_1': '302', 'field_2': 'FIELD_2_VAL_3', 'field3': 'FIELD_3_VAL_3' },
    { 'id': 'id4', 'field_1': '303', 'field_2': 'FIELD_2_VAL_4', 'field3': 'FIELD_3_VAL_4' }
  ];

  const gridCols = [
    { field:  'id',  header:  'id'},
    { field:  'field_1',  header:  'field_1'},
    { field:  'field_2',  header:  'field_2'},
    { field:  'field3',  header:  'field3'},
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WfwDataGridComponent, CellEditorComponent, ColumnSettingsButtonComponent, ColumnFilterComponent],
      imports: [
        RadioButtonModule,
        OverlayPanelModule,
        DialogModule,
        DataTableModule,
        TabMenuModule,
        TabViewModule,
        HttpModule,
        FormsModule,
        BrowserAnimationsModule
      ],
      providers: [GridService, WfwEventsService, ExcelService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WfwDataGridComponent);
    component = fixture.componentInstance;
    component.counter = 0;
    component.gridHeight =  200;
    component.gridConfig =  gridConfig;
    component.tabs =  [];
    component.gridCols = gridCols;
    component.rows = rows;
    component.totalRowCount = rows.length;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should increment counter when compoent intialize', () => {
     component.counter = 0;
     fixture.detectChanges();
     expect(component.counter).toBe(1);
  });

  it('should call setHeight method when ngOnChanges invoked', () => {
    spyOn(component, 'setGridHeight');
    component.ngOnChanges();
    expect(component.setGridHeight).toHaveBeenCalledWith();
  });

  it('should call exportToExcel when exportToExcel method invoked', inject([ExcelService], (excelService: ExcelService) => {
    spyOn(excelService, 'exportToExcel');
    const gridRows = [{'id': 1}];
    component.rows = gridRows;
    component.exportToExcel();
    expect(excelService.exportToExcel).toHaveBeenCalledWith( gridRows, 'gridExcel');
  }));

  describe('setNoOfRecords', () => {

    it('should call setNoOfRecords on initialization of component', () => {
      jasmine.clock().install();
      spyOn(component, 'setNoOfRecords');
      fixture.detectChanges();
      jasmine.clock().tick(1000);
      expect(component.setNoOfRecords).toHaveBeenCalled();
      jasmine.clock().uninstall();
    });

    it('should set number of records in html', () => {
      fixture.detectChanges();
      component.setNoOfRecords();
      const natElt = fixture.debugElement.nativeElement;
      expect(natElt.querySelector('.ui-paginator > .ui-datatable-no-of-rec').textContent).toContain('1 - 4 of 4');
    });

    it('should not display number of records if grid is not present', () => {
      fixture.detectChanges();
      component.grid = null;
      component.setNoOfRecords();
      const natElt = fixture.debugElement.nativeElement;
      expect(natElt.querySelector('.ui-paginator > .ui-datatable-no-of-rec')).toBeNull();
    });

    it('should not display number of records if paginator class is missing', () => {
      fixture.detectChanges();
      const natElt = fixture.debugElement.nativeElement;
      const paginatorElt = natElt.querySelector('.ui-paginator');
      paginatorElt.className = paginatorElt.className.replace('ui-paginator ', '');
      component.setNoOfRecords();
      expect(natElt.querySelector('.ui-paginator > .ui-datatable-no-of-rec')).toBeNull();
    });

    it('should contain only one number of records element', () => {
      fixture.detectChanges();
      component.setNoOfRecords();
      component.setNoOfRecords();
      const natElt = fixture.debugElement.nativeElement;
      expect(natElt.querySelectorAll('.ui-paginator > .ui-datatable-no-of-rec').length).toBe(1);
    });

  });

  afterEach(() => {
    fixture.destroy();
  });

});
