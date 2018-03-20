export interface SavedSearch {
    'SearchTitle': string;
    'Username': string;
    'QueryText': string;
    'SearchRefinements': {
        'queryText': string;
        'start': number;
        'rows': number;
        'sortOrder': string;
        'sortBy': {
            'name': string;
            'value': string;
            'isSelected': boolean;
        };
        'selectedCategories': string;
        'selectedDBTypes': string;
        'selectedSources': string;
        'selectedProjects': string;
        'entityModelText': string;
        'selectedPrimaryDataType': string;
        'facetFieldFilters': Array<any>;
        'entityModel': string;
        'spatialSearchCriteria': string;
        'attributeConstraints': Array<any>,
        'backEnabled': false
    };
    'ToolTip': string;
    'SavedQueryStatus': string;
}

export interface SearchQuery {
    'q': string;
    'rows': string;
    'start': number;
    'attributeQuery': string;
    'enableFacet': boolean;
    'facetfield': string;
    'enableHighLight': boolean;
    'sortBy': string;
    'sortOrder': string;
    'endPoint': string;
}
