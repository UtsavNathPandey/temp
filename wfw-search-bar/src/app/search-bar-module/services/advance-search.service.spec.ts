import { TestBed, inject } from '@angular/core/testing';
import {HttpModule} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { AdvanceSearchService } from './advance-search.service';

describe('SearchResultsService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [AdvanceSearchService]
    });
  });

  it('should be created', inject([AdvanceSearchService], (service: AdvanceSearchService) => {
    expect(service).toBeTruthy();
  }));

});
