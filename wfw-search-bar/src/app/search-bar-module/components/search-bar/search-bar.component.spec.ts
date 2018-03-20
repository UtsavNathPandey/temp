import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { WfwEventsService } from 'wfw-shared/services/wfw-events.service';
import { HttpModule, Response, ResponseOptions} from '@angular/http';
import { OverlayPanelModule } from 'primeng/primeng';
import { MultiSelectModule } from 'primeng/primeng';
import { DropdownModule } from 'primeng/primeng';
import { AdvanceSearchService } from '../../services/advance-search.service';
import { SearchBarComponent } from './search-bar.component';
import { AdvancedSearchComponent } from '../advanced-search/advanced-search.component';
import { ConditionComponent } from '../condition/condition.component';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchBarComponent, AdvancedSearchComponent, ConditionComponent],
      imports: [FormsModule, OverlayPanelModule, MultiSelectModule, DropdownModule, ReactiveFormsModule,
        HttpModule],
      providers: [WfwEventsService, AdvanceSearchService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // it('should call method onSearchComplete, when executeSearch method invoked', () => {
  //   spyOn(component, 'onSearchComplete');
  //   component.executeSearch();
  //   expect(component.onSearchComplete).toHaveBeenCalledWith({});
  // });
  it('should  clear the search, when clearSearch method invoked', () => {
    component.search = 'hi there';
    component.clearSearch();
    expect(component.search).toEqual('');
  });
  it('should emit onClearSearch event, when clearSearch method invoked', () => {
    // spy on event emitter
    spyOn(component.onClearSearch, 'emit');
    component.clearSearch();

    fixture.detectChanges();
    expect(component.onClearSearch.emit).toHaveBeenCalledWith();
  });
  // it('should call eventService when onSearchComplete method invoked', inject([WfwEventsService], (eventService: WfwEventsService) => {
  //   spyOn(eventService, 'emit');
  //   const results = {
  //     'count': 3,
  //     'docs': [
  //       { 'title': 'doc1' },
  //       { 'title': 'doc2' },
  //       { 'title': 'doc3' },
  //     ]
  //   };
  //   component.onSearchComplete(results);
  //   expect(eventService.emit).toHaveBeenCalledWith('searchbar_searchCompleted', results);
  // }));
});
