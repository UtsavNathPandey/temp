import { TestBed, inject } from '@angular/core/testing';
import {HttpModule} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { SearchResultsService } from './search-results.service';

describe('SearchResultsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [SearchResultsService]
    });
  });

  it('should be created', inject([SearchResultsService], (service: SearchResultsService) => {
    expect(service).toBeTruthy();
  }));

  it('should initialize gridConfig data', inject([SearchResultsService], (service: SearchResultsService) => {
    expect(service).toBeTruthy();
    expect(service.gridConfig.resizableColumns).toBeTruthy();
  }));

   it('Should Render the Tabs for Data grid using facets from responce object',
      inject([SearchResultsService], (service: SearchResultsService) => {
    const searchResults = {'facet_counts': {'facet_fields': {'sys_entitytype':
    ['Well', 14237, 'WellLog', 10056, 'Wellbore', 4969, 'WellListMember', 616260, 'WellListMember', 88513]}}};
    service.renderTabs(searchResults);
    expect(service.searchResults.length).toBe(5);
    expect(service.tabs.length).toBe(5);
    expect(service.searchResults[0].name).toEqual('Well');
    expect(service.tabs[0].label).toContain('Well');
  }));

});
