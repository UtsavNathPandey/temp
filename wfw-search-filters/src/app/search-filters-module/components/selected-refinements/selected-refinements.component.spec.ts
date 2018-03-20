import { WfwEventsService } from 'wfw-shared/services/wfw-events.service';
import { AuthService } from 'wfw-shared/services/auth.service';
import { HttpModule } from '@angular/http';
import { TreeDataTransformService } from './../../services/tree-data-transform.service';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { WFWSearchResultsModule } from 'wfw-search-results';
import { WFWSearchBarModule } from 'wfw-search-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TreeModule, OverlayPanelModule } from 'primeng/primeng';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { SelectedRefinementsComponent } from './selected-refinements.component';
import { SearchFiltersComponent } from './../search-filters/search-filters.component';
import { AvailableRefinementsComponent } from './../available-refinements/available-refinements.component';
import { FilterChipsComponent } from './../filter-chips/filter-chips.component';
import { RefinementService } from './../../services/refinement.service';
import { SearchResultsService } from 'wfw-shared/services/search-results.service';
import { ApiClientService } from 'wfw-shared/services/api-client.service';
import { SaveRefinementsFormComponent } from './../save-refinements-form/save-refinements-form.component';

describe('SelectedRefinementsComponent', () => {
  let component: SelectedRefinementsComponent;
  let fixture: ComponentFixture<SelectedRefinementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedRefinementsComponent, SearchFiltersComponent,
        AvailableRefinementsComponent, FilterChipsComponent, SaveRefinementsFormComponent ],
      imports: [ TreeModule, WFWSearchBarModule, WFWSearchResultsModule,
        BrowserAnimationsModule, OverlayPanelModule, FormsModule, ReactiveFormsModule, HttpModule ],
      providers: [ RefinementService, SearchResultsService, ApiClientService,
        TreeDataTransformService, AuthService, WfwEventsService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedRefinementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create selected refinements component', () => {
    expect(component).toBeTruthy();
  });

  it('should call removeAppliedRefinement when removeAppliedRefinement method invoked',
  inject([RefinementService], (refService: RefinementService) => {
    spyOn(refService, 'removeAppliedRefinements');
    const i = 0;
    component.removeAppliedRefinement(i);
    expect(refService.removeAppliedRefinements).toHaveBeenCalledWith(i);
  }));

  it('should call removeAllAppliedRefinement when removeAllAppliedRefinement method invoked',
  inject([RefinementService], (refService: RefinementService) => {
    spyOn(refService, 'clearAllAppliedRefinements');
    component.removeAllAppliedRefinement();
    expect(refService.clearAllAppliedRefinements).toHaveBeenCalledWith();
  }));

});
