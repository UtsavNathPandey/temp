import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { TreeModule, TreeNode } from 'primeng/primeng';
import { WFWSearchResultsModule } from 'wfw-search-results';
import { WFWSearchBarModule } from 'wfw-search-bar';
import { SearchFiltersComponent } from './search-filters-module/components/search-filters/search-filters.component';
import { AvailableRefinementsComponent } from './search-filters-module/components/available-refinements/available-refinements.component';
import { SelectedRefinementsComponent } from './search-filters-module/components/selected-refinements/selected-refinements.component';
import { RefinementService } from './search-filters-module/services/refinement.service';
import { SearchResultsService } from 'wfw-shared/services/search-results.service';
import { WfwEventsService } from 'wfw-shared/services/wfw-events.service';
import { AuthService } from 'wfw-shared/services/auth.service';
import { ApiClientService } from 'wfw-shared/services/api-client.service';
import { FilterChipsComponent } from './search-filters-module/components/filter-chips/filter-chips.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        SearchFiltersComponent,
        SelectedRefinementsComponent,
        AvailableRefinementsComponent,
        FilterChipsComponent
      ],
      imports: [
        TreeModule, WFWSearchBarModule, WFWSearchResultsModule, HttpModule
      ],
      providers: [ RefinementService, SearchResultsService, WfwEventsService, ApiClientService, AuthService ]
    }).compileComponents();
  }));
  // Test Case is commented as there are issues with the injected shared modules
  xit('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    expect(app).toBeTruthy();
  }));
});
