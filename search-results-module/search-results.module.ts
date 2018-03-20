import { DocsCarouselComponent } from './components/docs-carousel/docs-carousel.component';
import { NgModule } from '@angular/core';
import { CommonModule,  } from '@angular/common';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { FormsModule } from '@angular/forms';
import { WfwDataGridComponent } from './components/data-grid/data-grid.component';
import { CellEditorComponent } from './components/cell-editor/cell-editor.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTableModule,
        DataListModule,
        DropdownModule,
        SharedModule,
        RadioButtonModule,
        TabViewModule,
        TabMenuModule,
        OverlayPanelModule,
        DialogModule,
        CheckboxModule,
        ButtonModule,
        CarouselModule } from 'primeng/primeng';
import { ColumnSettingsButtonComponent } from './components/column-settings-button/column-settings-button.component';
import { ColumnFilterComponent } from './components/column-filter/column-filter.component';
import { SearchResultsHeaderComponent } from './components/search-results-header/search-results-header.component';
import { ListViewComponent } from './components/list-view/list-view.component';

import { FetchDocService } from './services/fetchDoc.service';
import { GridService } from './services/grid.service';
import { ExcelService } from './services/excel.service';
import { ListItemComponent } from './components/list-view/list-item/list-item.component';
import { WfwSharedModule } from 'wfw-shared/wfw-shared.module';
import { SearchSummaryComponent } from './components/list-view/search-summary/search-summary.component';
import { TabViewComponent } from './components/data-grid/tab-view/tab-view.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DataTableModule,
    SharedModule,
    TabViewModule,
    TabMenuModule,
    OverlayPanelModule,
    DialogModule,
    ButtonModule,
    RadioButtonModule,
    DropdownModule,
    DataListModule,
    CheckboxModule,
    WfwSharedModule,
    CarouselModule
  ],
  entryComponents: [
    SearchResultsComponent
  ],
  exports: [
    SearchResultsComponent
  ],
  providers: [
    GridService,
    ExcelService,
    FetchDocService
  ],
  declarations: [
    SearchResultsComponent,
    WfwDataGridComponent,
    ColumnSettingsButtonComponent,
    CellEditorComponent,
    ColumnFilterComponent,
    SearchResultsHeaderComponent,
    ListViewComponent,
    ListItemComponent,
    DocsCarouselComponent,
    SearchSummaryComponent,
    TabViewComponent
  ]
})
export class WFWSearchResultsModule {
  public static entry = SearchResultsComponent;
}
