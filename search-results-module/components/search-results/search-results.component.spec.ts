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
         ButtonModule,
         DropdownModule,
         MessagesModule,
         DataListModule,
         CarouselModule,
         CheckboxModule } from 'primeng/primeng';
import { async, ComponentFixture, TestBed , inject} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WfwDataGridComponent } from '../data-grid/data-grid.component';
import { SearchResultsComponent } from './search-results.component';
import { ColumnSettingsButtonComponent } from '../column-settings-button/column-settings-button.component';
import { CellEditorComponent } from '../cell-editor/cell-editor.component';
import { ColumnFilterComponent } from '../column-filter/column-filter.component';
import { NotificationComponent } from 'wfw-shared/components/notification/notification.component';
import { SearchResultsHeaderComponent } from './../search-results-header/search-results-header.component';
import { ListViewComponent } from './../list-view/list-view.component';
import { DocsCarouselComponent } from './../docs-carousel/docs-carousel.component';
import { ListItemComponent } from './../list-view/list-item/list-item.component';
import { SearchResultsService } from 'wfw-shared/services/search-results.service';
import { AuthService } from 'wfw-shared/services/auth.service';
import { ApiClientService } from 'wfw-shared/services/api-client.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { ExcelService } from '../../services/excel.service';

describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ColumnFilterComponent,
         SearchResultsComponent ,
         WfwDataGridComponent,
         ColumnSettingsButtonComponent,
         CellEditorComponent,
         SearchResultsHeaderComponent,
         NotificationComponent,
         ListViewComponent,
         DocsCarouselComponent,
         ListItemComponent
      ],
      imports: [
        DataTableModule,
        RadioButtonModule,
        TabMenuModule,
        TabViewModule,
        HttpModule,
        OverlayPanelModule,
        MessagesModule,
        DialogModule,
        ButtonModule,
        DropdownModule,
        DataListModule,
        CarouselModule,
        CheckboxModule,
        FormsModule,
        BrowserAnimationsModule
      ],
      providers: [GridService, WfwEventsService, ExcelService, SearchResultsService, ApiClientService, AuthService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
  });
  it('should get a instance of NotificationComponent', async(() => {
    fixture.detectChanges();
    const message: NotificationComponent = fixture.componentInstance.messages;
    expect(message).toBeDefined();
  }));
  it('should call addMessageToQueue when ngOnInit invoked', async(() => {
    const message: NotificationComponent = fixture.componentInstance.messages;
    const msgs = [{severity: 'success', summary: 'Well done!', detail: 'Alert success - <a href="#">Hyperlink</a>'}];
    spyOn(message, 'addMessageToQueue');
    component.ngOnInit();
    expect(message.addMessageToQueue).toHaveBeenCalledWith(msgs);
  }));

});
