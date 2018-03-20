import { TreeDataTransformService } from './../../services/tree-data-transform.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { TreeModule, OverlayPanelModule } from 'primeng/primeng';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockBackend } from '@angular/http/testing';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { SearchFiltersComponent } from './search-filters.component';
import { SelectedRefinementsComponent } from './../selected-refinements/selected-refinements.component';
import { AvailableRefinementsComponent } from './../available-refinements/available-refinements.component';
import { RefinementService } from './../../services/refinement.service';
import { FilterChipsComponent } from './../filter-chips/filter-chips.component';
import { SaveRefinementsFormComponent } from './../save-refinements-form/save-refinements-form.component';
import { WfwEventsService } from 'wfw-shared/services/wfw-events.service';
import { SearchResultsService } from 'wfw-shared/services/search-results.service';
import { ApiClientService } from 'wfw-shared/services/api-client.service';
import { AuthService } from 'wfw-shared/services/auth.service';

describe('SearchFiltersComponent', () => {
  let component: SearchFiltersComponent;
  let fixture: ComponentFixture<SearchFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchFiltersComponent, SelectedRefinementsComponent,
        AvailableRefinementsComponent, FilterChipsComponent, SaveRefinementsFormComponent ],
      imports: [ HttpModule, BrowserAnimationsModule, TreeModule, OverlayPanelModule,
          FormsModule, ReactiveFormsModule ],
      providers: [ {provide: HttpClient, deps: [MockBackend]}, RefinementService, WfwEventsService,
                    SearchResultsService, ApiClientService, AuthService, TreeDataTransformService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create search filters component', () => {
    expect(component).toBeTruthy();
  });
});
