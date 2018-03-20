import { Injectable } from '@angular/core';
import { SelectItem, MenuItem } from 'primeng/primeng';
import { GridConfig } from '../models/grid.interface';
import { GridEntityType } from '../models/grid-entity.model';
import { EntityType } from '../models/entity-type.interface';
import { EntityMetadata } from '../models/entity-metadata.interface';
import { SavedSearch, SearchQuery } from '../models/search.interface';
import { SearchConstants } from '../models/search-constants.model';
import { SearchConfigurationFields } from '../models/search-configuration-fields.model';
import { ActionsResponsive, ItemAction } from '../models/actions-responsive.interface';
import { ClassificationType,
         ClassificationTypes,
         ClassificationMappings,
         ClassificationMappingItem } from '../models/classification-type.interface';
import { ApiClientService } from './api-client.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Rx';
import { WfwEventsService } from './wfw-events.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/skipWhile';

import { DataCatalogues } from '../models/data-catalogue.model';
import { DataCataloguesViews } from '../models/data-catalogue-views.model';
import { DataCataloguesColumns } from '../models/data-catalogue-columns.model';

import { SearchQueryUtils } from './searchQueryUtils';


@Injectable()
export class SearchResultsService {

  public views: SelectItem[];
  public selectedView = 'GRID';
  public selectedResults: string[] = [];

  public gridConfig: GridConfig = {
    'url': 'search',
    'reorderableColumns': true,
    'resizableColumns': true,
    'rows': '10',
    'paginator': true,
    'lazy': true,
    'loading': false,
    'pageLinks': 3,
    'expandableRows': true,
    'rowsPerPageOptions': ['5', '10', '20'],
    'scrollable': true,
    'editable': true,
    'dataValidation': true,
    'columnConfig': {
      'expanded': true,
      'selectionMode': 'multiple',
      'headerConfig': {
        'editable': true,
        'sortable': true,
      }
    }
  };

  public tabs: MenuItem[];
  public searchResultsResponse: any;
  public searchResults: any;
  public searchResultRows: any;
  public searchResultCols: any = [];
  public totalRowCount: number;
  public SEARCH_CONSTANTS: SearchConstants = new SearchConstants();
  public searchQueryUtils: SearchQueryUtils;

  // Search
  public currentSearchQuery: SearchQuery = null;

  // filters
  private _searchConfigurations: BehaviorSubject<SearchConfigurationFields>;
  public searchConfigurations: Observable<SearchConfigurationFields>;
  private SearchConfigurations: SearchConfigurationFields;

  // result item actions
  private _actionsResponsive: BehaviorSubject<ActionsResponsive>;
  public actionsResponsive: Observable<ActionsResponsive>;

  // classifications
  private _classificationTypes: BehaviorSubject<ClassificationTypes>;
  public classificationTypes: Observable<ClassificationTypes>;

  private _classificationMappings: BehaviorSubject<ClassificationMappings>;
  public classificationMappings: Observable<ClassificationMappings>;

  // selection
  public totalRecordsSelected = false;

  constructor(
    private _api: ApiClientService,
    private _wfwEvents: WfwEventsService
  ) {
    this.views = [];
    this.views.push({label: 'List', value: 'LIST'});
    this.views.push({label: 'Grid', value: 'GRID'});

    this.searchQueryUtils = new SearchQueryUtils();

    // load search configurations
    this._searchConfigurations = new BehaviorSubject<SearchConfigurationFields>(null);
    this.searchConfigurations = this._searchConfigurations.asObservable().skipWhile(searchConfigurations => searchConfigurations == null);
    this.searchConfigurationsFieldsFromConfigService()
    .subscribe(searchConfigurations => {
      // TODO: Takes the 1st record. It needs to be changed once the service registry implementation is done.
      this.SearchConfigurations = searchConfigurations[0];
      this._searchConfigurations.next(searchConfigurations[0]);
      const config = searchConfigurations[0] as SearchConfigurationFields;
      this.gridConfig.rowsPerPageOptions = config.recordsPerPageOptions;
      this.gridConfig.rows = config.recordsPerPage;
    });

    // load item actions
    this._actionsResponsive = new BehaviorSubject<ActionsResponsive>(null);
    this.actionsResponsive = this._actionsResponsive.asObservable().skipWhile(actionsResponsive => actionsResponsive == null);
    this.getActionsResponsive()
    .subscribe(actionsResponsive => {
      this._actionsResponsive.next(actionsResponsive);
    });

    // load classifications
    this._classificationTypes = new BehaviorSubject<ClassificationTypes>(null);
    this.classificationTypes = this._classificationTypes.asObservable().skipWhile(classificationTypes => classificationTypes == null);
    this.getClassificationTypes()
    .subscribe(classificationTypes => {
      this._classificationTypes.next(classificationTypes);
    });

    this._classificationMappings = new BehaviorSubject<ClassificationMappings>(null);
    this.classificationMappings =
      this._classificationMappings.asObservable().skipWhile(classificationMappings => classificationMappings == null);
    this.getClassificationMappings()
    .subscribe(classificationMappings => {
      this._classificationMappings.next(classificationMappings);
    });

    this.initSearchQuery();

  }

  initSearchQuery() {
    this.currentSearchQuery = {
      'q': '',
      'rows': this.gridConfig.rows,
      'start': 0,
      'attributeQuery': '',
      'enableFacet': true,
      'facetfield': 'sys_category,sys_dbtype,sys_source,sys_project,sys_entitytype,sys_hasspatial',
      'enableHighLight': true,
      'sortBy': 'score',
      'sortOrder': 'desc',
      'endPoint': 'Default Search Service'
    };
  }

  getDatabases() {
    return this._api.get('/searchservice/databases')
    .map(res => res.json());
  }

  getProjects(queryString?: string) {
    const url = (queryString !== undefined) ? `/searchservice/projects?${queryString}` : '/searchservice/projects';
    return this._api.get(url)
    .map(res => res.json());
  }

  getSources(queryString?: string) {
    const url = (queryString !== undefined) ? `/searchservice/sources?${queryString}` : '/searchservice/sources';
    return this._api.get(url)
    .map(res => res.json());
  }

  getEntityTypes(queryString?: string) {
    const url = (queryString !== undefined) ? `/searchservice/entitytypes?${queryString}` : '/searchservice/entitytypes';
    return this._api.get(url)
    .map(res => res.json() as Array<EntityType> );
  }

  getMetadataForEntityType(entityType: string) {
    return this._api.get(`/solr/ds/metadata?indent=on&q=sys_entitytype:${entityType}&wt=json`)
    .map(res => res.json().response.docs as Array<EntityMetadata>);
  }

  getColumnsForEntityType(entityType: string) {
    return this._api.get(`/searchservice/entitytypes/${entityType}/columns`)
    .map(res => res.json());
  }

  getColumnPickListForEntityType(entityType: string, column: string, queryString?: string) {
    const url = (queryString !== undefined)
      ? `/searchservice/entitytypes/${entityType}/columns/${column}/picklist?${queryString}`
      : `/searchservice/entitytypes/${entityType}/columns/${column}/picklist`;

    return this._api.get(url)
    .map(res => res.json());
  }

  executeSearch() {
    return this._api.post(`/searchservice/search`, this.currentSearchQuery)
    .map(res => res.json())
    .map(res => {
      this._wfwEvents.emit('searchservice_searchCompleted', res);
      this.searchResultsResponse = res;
      this.searchResultRows = res.response.docs;
      this.totalRowCount = res.response.numFound || this.searchResultRows.length;
      return res;
    });
  }

  executeAdvancedSearch(searchContext) {

    const searchCriteria = this.searchQueryUtils.buildSearchCriteria(searchContext, null, this.SearchConfigurations);
    const postData = this.searchQueryUtils.getSearchQuery(searchContext.queryText, searchCriteria);

    return this._api.post(`/searchservice/search`, postData)
    .map(res => res.json())
    .map(res => {
      this._wfwEvents.emit('searchservice_searchCompleted', res);
      this.searchResultsResponse = res;
      this.searchResultRows = res.response.docs;
      this.totalRowCount = res.response.numFound || this.searchResultRows.length;
      return res;
    });
  }

  clearSearch() {
    this.initSearchQuery();
    return this._api.post(`/searchservice/search`, this.currentSearchQuery)
    .map(res => res.json())
    .map(res => {
      this.searchResultsResponse = null;
      this.searchResultRows = [];
      this.searchResultCols = [];
      this.totalRowCount = 0;
      return res;
    });
  }

  // Configurations
  public searchConfigurationsFieldsFromConfigService(): Observable<SearchConfigurationFields> {
    return this._api.get('/applications/bhdm/collections/searchConfigurations/configurations/search')
    .map(res => res.json() as SearchConfigurationFields)
    .catch(this.handleError);
  }

  public getAdvancedSearchConfigurations(): Observable<any> {
    return this._api.get('/applications/bhdm/collections/viewConfigurations/configurations/advancedSearch')
    .map(res => res.json())
    .catch(this.handleError);
  }

  public getActionsResponsive(): Observable<ActionsResponsive> {
    return this._api.get('/applications/bhdm/collections/searchSettings/configurations/actionsResponsive')
    .map(res => res.json() as ActionsResponsive)
    .catch(this.handleError);
  }

  public getClassificationTypes(): Observable<ClassificationTypes> {
    return this._api.get('/applications/bhdm/collections/classificationConfigurations/configurations/classificationTypes')
    .map(res => res.json() as ClassificationTypes)
    .catch(this.handleError);
  }

  public getClassificationMappings(): Observable<ClassificationMappings> {
    return this._api.get('/applications/bhdm/collections/classificationConfigurations/configurations/classificationMapping')
    .map(res => res.json() as ClassificationMappings)
    .catch(this.handleError);
  }

  public getDataCatalogueConfigurationsFromConfigService(): Observable<[DataCatalogues]> {
    return this._api.get('/applications/bhdm/collections/viewConfigurations/configurations/DSPDataCatalogues')
    .map(res => res.json() as DataCatalogues)
    .catch(error => this.handleError(error));
  }

  public getDataCatalogueColumnConfigurationsFromConfigService(): Observable<[DataCataloguesColumns]> {
    return this._api.get('/applications/bhdm/collections/viewConfigurations/configurations/DSPDataCatalogues_Columns')
    .map(res => res.json() as DataCataloguesColumns)
    .catch(error => this.handleError(error));
  }

  public getDataCatalogueViewConfigurationsFromConfigService(): Observable<[DataCataloguesViews]> {
    return this._api.get('/applications/bhdm/collections/viewConfigurations/configurations/DSPDataCatalogue_Views')
    .map(res => res.json() as DataCataloguesViews)
    .catch(error => this.handleError(error));
  }

  /**
  * Error handler
  * @private
  * @param error - response error
  */
  private handleError(error: Response | any) {
    let errMsg: string;

    if (error instanceof Response) {
      errMsg = error.status.toString().concat(' ', error.statusText, ': ', error.text.toString().replace(/[\n\r]/g, ''));
    } else {
      errMsg = error.message ? error.message : error.toString();
    }

    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
