import { Observable } from 'rxjs/Observable';
import { FilterConfig, FilterParameters } from './../models/tree-config';
import { RefinementService } from './refinement.service';
import { WfwEventsService } from 'wfw-shared/services/wfw-events.service';
import { AuthService } from 'wfw-shared/services/auth.service';
import { HttpModule } from '@angular/http';
import { ApiClientService } from 'wfw-shared/services/api-client.service';
import { SearchResultsService } from 'wfw-shared/services/search-results.service';
import { TestBed, inject } from '@angular/core/testing';
import { TreeDataTransformService } from './tree-data-transform.service';

describe('TreeDataTransformService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [TreeDataTransformService, SearchResultsService, ApiClientService,
        AuthService, WfwEventsService, RefinementService]
    });
  });

  it('should be created', inject([TreeDataTransformService], (service: TreeDataTransformService) => {
    expect(service).toBeTruthy();
  }));

   xit('should call createFilters', inject([RefinementService, TreeDataTransformService, SearchResultsService],
    (service: RefinementService, tService: TreeDataTransformService, srchResSvc: SearchResultsService) => {
      const response = {classificationMapping: [{'mapping': 'WellInformation', 'entity': 'CM.Well'},
      {'mapping': 'WellPlanning', 'entity': 'CM.WellPlanInterval'}]};
      spyOn(srchResSvc, 'getClassificationMappings').and.returnValue(Observable.of(response));
      tService.setClassificationMappings();
      const filtrParam2: FilterParameters = {sys_category: ['0/EDM/', 1],
                           sys_entitytype: ['Well', 6]};
      const tree2 = tService.createFilters(filtrParam2);
      /*const res = {'data_sources': [{'label': 'Data Sources', 'data': 'Data Sources', 'children': [{
       'label': 'EDM (1)', 'data': 'EDM', 'children': [], 'expanded': true}], 'expanded': true}],
       'data_types': [{'label': 'Data Types', 'data': 'Data Types', 'children': [{'label':
       'Reference Data', 'data': 'ReferenceData', 'children': [{'label': 'Company (1)', 'data':
       'Company', 'children': [], 'expanded': true}], 'expanded': true}], 'expanded': true}]};*/
      const res2 = {'data_sources': [{'label': 'Data Sources', 'data': 'Data Sources',
      'children': [{'label': 'EDM (1)', 'data': 'EDM', 'children': [], 'expanded': true}],
      'expanded': true}], 'data_types': [{'label': 'Data Types', 'data': 'Data Types',
      'children': [{'label': 'Well Information', 'data': 'WellInformation', 'children':
      [{'label': 'Well (1)', 'data': 'Well', 'children': [], 'expanded': true}],
      'expanded': true}], 'expanded': true}]};
      console.log('tree2' + tree2 );
      console.log('res2' + res2 );
      expect(tree2).toEqual(res2);
   }));
});
