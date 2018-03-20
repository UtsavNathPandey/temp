import { SearchUtils } from './searchUtils';
import { SearchConstants } from '../models/search-constants.model';

export class SearchCriteria {
    public filterQuery: string;
    public attributeQuery: any = [];
    public facetField: string;
    public start: string;
    public rows: string;
    public highlighting: boolean;
    public sortBy: string;
    public sortOrder: string;
    public spatialSearchCriteria: string;

    constructor() {
        this.filterQuery = '';
        this.attributeQuery = [];
        this.facetField = '';
        this.start = '';
        this.rows = '';
        this.highlighting = true;
        this.sortBy = '';
        this.sortOrder = '';
        this.spatialSearchCriteria = '';
    }
}


export class SearchQueryUtils {
    private searchUtil: SearchUtils;
    private searchConstants: SearchConstants;

    constructor() {
        this.searchUtil = new SearchUtils();
        this.searchConstants = new SearchConstants();
    }

    public getSearchQuery(queryText, searchCriteria) {
        let escapedQueryText = '';
        let spatialQuery: any;
        if (!queryText) {
            queryText = '*:* ';
            escapedQueryText = queryText;
        } else if (queryText === '*:* ') {
            // Bug 291212:Persistence for refinements within spatial search
            escapedQueryText = queryText;
        } else {
            // Bug:186646:Text Search - Error occurs on keywords that include some of the characters.
            escapedQueryText = this.searchUtil.escapeSpecialChars(queryText, false);
        }

        const filterQuery = searchCriteria.filterQuery;
        const attributeQuery = searchCriteria.attributeQuery;
        const facetField = searchCriteria.facetField;
        const start = searchCriteria.start;
        const rows = searchCriteria.rows;
        const highlighting = searchCriteria.highlighting;
        const sortBy = searchCriteria.sortBy;
        const sortOrder = searchCriteria.sortOrder;

        if (searchCriteria.spatialSearchCriteria) {
            spatialQuery = searchCriteria.spatialSearchCriteria;
        }
        // .../DSP Services/SearchService.svc/GetSearchResult?q=*&rows=5&enableFacet
        // =true&facetfield=sys_dbtype,sys_project,category&enableHighLight=true&sortBy=score
        // &sortOrder=desc&spatialquery=sys_spatial:"Intersects(
        // MULTIPOLYGON(((-111.48046821356 46.799998283386, -111.39257758856 42.053904533386,
        // -102.16406196356 41.966013908386, -102.33984321356 48.030467033386, -111.48046821356 46.799998283386))))"
        // &endPoint=Default Search Service
        let searchUri = 'q=' + encodeURIComponent(escapedQueryText) + '&rows=' + rows;

        if (start > 0) {
            searchUri = searchUri + '&start=' + start;
        }
        if (filterQuery) {
            searchUri = searchUri + '&filterQuery=' + filterQuery;
        }
        if (attributeQuery) {
            searchUri = searchUri + '&attributeQuery=' + attributeQuery;
        }
        if (facetField != null) {
            searchUri = searchUri + '&enableFacet=true&facetfield=' + facetField;
        }
        if (highlighting != null && highlighting === true) {
            searchUri = searchUri + '&enableHighLight=' + highlighting;
        }
        if (sortBy != null && sortBy !== undefined && sortOrder != null && sortOrder !== undefined) {
            searchUri = searchUri + '&sortBy=' + sortBy + '&sortOrder=' + sortOrder;
        }
        if (searchCriteria.spatialSearchCriteria) {
            searchUri = searchUri + '&spatialquery=' + searchCriteria.spatialSearchCriteria;
        }
        if (searchCriteria.fl) {
            searchUri = searchUri + '&p_fl=' + searchCriteria.fl;
        }

        const searchQueryData = {
            'q': encodeURIComponent(escapedQueryText),
            'rows': rows,
            'start': start,
            'attributeQuery': attributeQuery,
            'enableFacet': true,
            'facetfield': facetField,
            'enableHighLight': true,
            'sortBy': sortBy,
            'sortOrder': sortOrder,
            'endPoint': 'Default Search Service',
            'spatialquery': spatialQuery,
            'queryString': searchUri
        };

        return searchQueryData;
    }

    public buildSearchCriteria(searchContext, forExportToExcel, searchConfigurationFields) {
        const searchCriteria = new SearchCriteria();
        searchCriteria.filterQuery = this.getFacetQuery(searchContext);

        if (searchContext) {
            const attrQueries = [];
            const dbPrjEntityQuery = this.buildEntityDBTypeAndProjectConstraints(searchContext, forExportToExcel);

            if (dbPrjEntityQuery) {
                attrQueries.push(dbPrjEntityQuery);
            }

            searchCriteria.attributeQuery = attrQueries;

        }

        searchCriteria.spatialSearchCriteria = searchContext.spatialSearchCriteria;
        // Add this facet field for the purpose of determing how many spatial data existss
        // We use this info to fetch more data that only contains spatial info
        const facetFields = searchConfigurationFields.facetFields.join(',');
        searchCriteria.facetField = facetFields;
        /*  if (!searchCriteria.facetField)
        searchCriteria.facetField = "sys_hasspatial";
        else
        searchCriteria.facetField += ",sys_hasspatial";*/

        searchCriteria.start = searchContext.start;
        searchCriteria.rows = searchContext.rows;
        searchCriteria.highlighting = true;

        let selectedSortBy = searchContext.sortBy.value;

        if (!selectedSortBy || selectedSortBy === '') {
            const sortByFields = searchConfigurationFields.sortFields.join(',');
            const sortByFieldsMap = this.createSortByFieldsMap(sortByFields);
            if (sortByFieldsMap.length > 0) {
                // making  Relevance as default sort field for new search
                const defaultSortBy = sortByFieldsMap[sortByFieldsMap.length - 1];

                if (defaultSortBy) {
                    selectedSortBy = defaultSortBy.value;
                }
            }
        }

        searchCriteria.sortBy = selectedSortBy;
        searchCriteria.sortOrder = searchContext.sortOrder;

        return searchCriteria;
    }

    private getFacetQuery(searchContext) {
        const facetFieldFilters = searchContext.facetFieldFilters;
        let facetQuery = '';
        if (facetFieldFilters && facetFieldFilters.length > 0) {
          const facetFilterArr = facetFieldFilters;
          for (let index = 0; index < facetFilterArr.length; index++) {
            const entry = facetFilterArr[index];
            if (entry.refinementType != null && entry.refinementValue != null) {
              const fq = entry.refinementType + ':"' + entry.refinementValue + '"';
              if (facetQuery) {
                facetQuery += ',' + fq;
              } else {
                facetQuery = fq;
              }
            }
          }
        }
        return facetQuery;
      }

    private createSortByFieldsMap(sortByFields) {
        const sortByFieldsMap = [];
        const cbMenuItems = [];
        sortByFields.forEach(function (field, index) {
          field = field.trim();
          let sortByField = {};

          // if field name is 'Relevance', asign value as 'score'
          if (field === 'Relevance') {
            sortByField = { name: field, value: 'score', isSelected: true };
          } else {
            // Sort by field should be present in the configuration(item.xml)
            // if field is not present in master field, asign name as field given by user.
            sortByField = { name: field, value: field, isSelected: false };
          }

          sortByFieldsMap.push(sortByField);

        });

        return sortByFieldsMap;
      }

    public buildEntityDBTypeAndProjectConstraints(advancedSearchContext, forExportToExcel) {
        let cons = '';
        let exportConstraints = '';
        if (!advancedSearchContext) {
            return cons;
        }

        // final format
        // ((sys_entitytype:e1 OR sys_entitytype:e2l) AND (sys_model:OW5000)
        // AND (sys_dbtype:db1 OR sys_dbtype:db2) AND (sys_project:p1 OR sys_project:p2))
        const query = [];

        let modelQuery = '';
        if (advancedSearchContext.entityModel) {
            modelQuery = '(' + this.searchConstants.dataModel + ':' + advancedSearchContext.entityModel + ')';
            query.push(modelQuery);
        }

        let entityQuery = '';
        let entityTypeArray = [];
        if (advancedSearchContext.selectedPrimaryDataType) {
            entityTypeArray = advancedSearchContext.selectedPrimaryDataType.split(',');

            for (let i = 0; i < entityTypeArray.length; i++) {
                const entityToFind = entityTypeArray[i];
                const entityTypeSearchDataItems =
                    this.getEntityTypeSearchDataItems(entityToFind, advancedSearchContext.attributeConstraints);
                const entityTypeAttributesConstraints = this.buildAttributeConstraints(entityTypeSearchDataItems, forExportToExcel);

                if (entityTypeAttributesConstraints) {
                    if (forExportToExcel) {
                        entityQuery += `(${this.searchConstants.entityType}:${entityToFind})`;
                        exportConstraints = `&filterQuery=${entityTypeAttributesConstraints}`;
                    } else {
                        entityQuery += `(${this.searchConstants.entityType}:${entityToFind} AND ${entityTypeAttributesConstraints})`;
                    }
                } else {
                    entityQuery += `(${this.searchConstants.entityType}:${entityToFind})`;
                }

                if (i < entityTypeArray.length - 1) {
                    entityQuery += ' OR ';
                }
            }

            if (entityQuery) {
                if (forExportToExcel) {
                    query.push(entityQuery);
                } else {
                    query.push('(' + entityQuery + ')');
                }
            }
        }

        let categoryQuery = '';
        let categoryArray = [];

        if (advancedSearchContext.selectedCategories) {
            categoryArray = advancedSearchContext.selectedCategories.split(',');

            categoryQuery = this.getSolrQueryForCategory(categoryArray);

            if (categoryQuery) {
                categoryQuery = '(' + categoryQuery + ')';
                query.push(categoryQuery);
            }
        }

        let dbTypeQuery = '';
        let dbTypeArray = [];

        if (advancedSearchContext.selectedDBTypes) {
            dbTypeArray = advancedSearchContext.selectedDBTypes.split(',');

            dbTypeQuery = this.getSolrQueryForDBTypes(dbTypeArray);

            if (dbTypeQuery) {
                dbTypeQuery = '(' + dbTypeQuery + ')';
                query.push(dbTypeQuery);
            }
        }

        let dbInstanceQuery = '';
        let dbInstanceArray = [];

        if (advancedSearchContext.selectedSources) {
            dbInstanceArray = advancedSearchContext.selectedSources.split(',');

            dbInstanceQuery = this.getSolrQueryForDBInstances(dbInstanceArray);

            if (dbInstanceQuery) {
                dbInstanceQuery = '(' + dbInstanceQuery + ')';
                query.push(dbInstanceQuery);
            }
        }

        let projectsQuery = '';
        let projectsArray = [];

        if (advancedSearchContext.selectedProjects) {
            projectsArray = advancedSearchContext.selectedProjects.split(',');

            projectsQuery = this.getSolrQueryForProjects(projectsArray);

            if (projectsQuery) {
                projectsQuery = '(' + projectsQuery + ')';
                query.push(projectsQuery);
            }
        }

        if (query.length > 0) {
            cons = query.join(' AND ');
        }
        if (forExportToExcel) {
            cons += exportConstraints;
        }

        return cons;
    }

    private getEntityTypeSearchDataItems(entityType, allAttributesSearchDataItem) {
        const entityTypeSearchDataItems = [];

        if (allAttributesSearchDataItem !== undefined && allAttributesSearchDataItem.length > 0) {

            for (let i = 0; i < allAttributesSearchDataItem.length; i++) {
                if (allAttributesSearchDataItem[i].entityType === entityType
                    || allAttributesSearchDataItem[i].entityType.includes(entityType)
                ) {
                    entityTypeSearchDataItems.push(allAttributesSearchDataItem[i]);
                }
            }
        }

        return entityTypeSearchDataItems;
    }

    private buildAttributeConstraints(attributesSearchDataItem, forExportToExcel) {
        // final format:
        // (attr1:<op_and_val> AND[OR] attr2:<op_and_val>)
        let cons = '';
        const attributeConstraintsQuery = '';

        const isFilterQuery = true;
        if (attributesSearchDataItem.length > 0) {

            for (let i = 0; i < attributesSearchDataItem.length; i++) {
                // Clone it so that original searchcontext is not modified
                const consObj = this.searchUtil.cloneItem(attributesSearchDataItem[i], null, null);

                if (consObj.value === '') {
                    consObj.value = `""`;
                } else {
                    // Bug:186646:Text Search - Error occurs on keywords that include some of the characters.
                    //  consObj.value = searchUtil.escapeSpecialChars(consObj.value, isFilterQuery);

                    if (consObj.value) {

                        if (!this.searchUtil.isJsonString(consObj.value)) {
                            // TFS: 252989
                            // Split values before handling special characters and rejoin them
                            let arrValues = consObj.value.split(this.searchConstants.attributeValueSeparator);

                            // Bug:186646:Text Search - Error occurs on keywords that include some of the characters.
                            // arrValues = $.map(arrValues, function (item, index) {
                            // return this.searchUtil.escapeSpecialChars(item, isFilterQuery); });
                            arrValues = arrValues.map(function (item, index) {
                                const searchUtil = new SearchUtils();
                                return searchUtil.escapeSpecialChars(item, isFilterQuery);
                            });

                            consObj.value = arrValues.join(this.searchConstants.attributeValueSeparator);
                            // TFS: 252989
                        }
                    }
                }

                // get attribute constraint sub query with respect to operator under context
                if (forExportToExcel) {
                    consObj.value = consObj.value.replace(/\"/g, '\\\"');
                    const attrConstraint = '"' + consObj.value + '"';
                    if (i === 0) {
                        cons = attrConstraint;
                    } else {
                        cons += '&&' + attrConstraint;
                    }
                } else {
                    const attrConstraint = this.getConstraintForAttribute(consObj);
                    if (i === 0) {
                        cons = attrConstraint;
                    } else {
                        const attributeConstraintLogicalOperator = consObj.searchLogicalOperator.toUpperCase();

                        if (attributeConstraintLogicalOperator === 'AND') {
                            cons += `) ${consObj.searchLogicalOperator.toUpperCase()} (${attrConstraint}`;
                        } else {
                            cons += ` ${consObj.searchLogicalOperator.toUpperCase()} ${attrConstraint}`;
                        }
                    }
                }

            }// for
        }

        if (cons) {
            if (forExportToExcel) {
                cons = attributesSearchDataItem[0].selectedSearchColumn + ':(' + encodeURIComponent(cons) + ')';
            } else {
                cons = '(' + encodeURIComponent(cons) + ')';
            }
        }

        return cons;
    }

    private getConstraintForAttribute(attributeConstraints) {

        const columnPrefix = attributeConstraints.selectedSearchColumn + ':';
        let query = '';
        let arrValues;

        if (attributeConstraints.value) {
            if (!this.searchUtil.isJsonString(attributeConstraints.value)) {
                arrValues = attributeConstraints.value.split(this.searchConstants.attributeValueSeparator);
            } else {
                attributeConstraints.value = attributeConstraints.value.replace(/\"/g, '\\\"');
                arrValues = [attributeConstraints.value];
            }
        } else {
            arrValues = [attributeConstraints.value];
        }

        const totalValues = arrValues.length;

        switch (attributeConstraints.selectedSearchOperator) {

            // TFS: 252989
            case 'Equals':
                if (attributeConstraints.currentColumnType === 'System.DateTime') {
                    query = columnPrefix + `[${attributeConstraints.value} TO ${attributeConstraints.value2}]`;
                } else {
                    // Format: (Column: Value1 OR Column: Value2 OR Column: Value3 ...)
                    for (let index = 0; index < arrValues.length; index++) {
                        query += columnPrefix + ((index + 1 === totalValues) ? `"` + arrValues[index] + `"`
                            : `"` + arrValues[index] + `" OR `);
                    }
                    query = totalValues > 1 ? ' (' + query + ') ' : query;
                }
                break;
            case 'NotEquals':
                if (attributeConstraints.currentColumnType === 'System.DateTime') {
                    query = `*:* !${columnPrefix}[${attributeConstraints.value} TO ${attributeConstraints.value2}]`;
                } else {
                    // Format: (*:* !Column: Value1 OR !Column: Value2 OR !Column: Value3 ...)
                    query = ' (*:* ';
                    for (let index = 0; index < arrValues.length; index++) {
                        query += ('!' + columnPrefix) + ((index + 1 === totalValues) ? `"` + arrValues[index] + `"`
                            : `"` + arrValues[index] + `" OR `);
                    }
                    query += ') ';
                }
                break;
            case 'Like':
                // Format: (Column: *Value1* OR Column: *Value2* OR Column: *Value3* ...)
                for (let index = 0; index < arrValues.length; index++) {
                    query += columnPrefix + ((index + 1 === totalValues) ? '*' + arrValues[index] + '*'
                        : '*' + arrValues[index] + '* OR ');
                }
                query = totalValues > 1 ? ' (' + query + ') ' : query;
                break;
            case 'NotLike':
                // Format: (*:* !Column: *Value1* OR !Column: *Value2* OR !Column: *Value3* ...)
                query = ' (*:* ';
                for (let index = 0; index < arrValues.length; index++) {
                    query += ('!' + columnPrefix) + ((index + 1 === totalValues) ? '*' + arrValues[index] + '*'
                        : '*' + arrValues[index] + '* OR ');
                }
                query += ') ';
                break;
            // TFS: 252989
            case 'LessThanEqualTo':
                query = `${columnPrefix}[* TO ${attributeConstraints.value}]`;
                break;
            case 'GreaterThanEqualTo':
                query = `${columnPrefix}[${attributeConstraints.value} TO *]`;
                break;
            case 'Between':
                query = `${columnPrefix}[${attributeConstraints.value} TO ${attributeConstraints.value2}]`;
                break;
            case 'In List':
                query += columnPrefix + ' (';
                // $.each(arrValues, function (index, item) {
                for (let index = 0; index < arrValues.length; index++) {
                    query += ((index + 1 === totalValues) ? `"` + arrValues[index] + `"` : `"` + arrValues[index] + `" `);
                }
                query += ' )';
                break;
        }

        return query;
    }


    private getSolrQueryForProjects(projectsArray) {
        // format:
        // sys_project:p1 OR sys_project:p2
        let projectQuery = '';
        const searchConstants = new SearchConstants();

        projectsArray.forEach(function (pj, i) {
            const project = searchConstants.project + ':' + pj.trim();
            projectQuery += project;

            if (i < projectsArray.length - 1) {
                projectQuery += ' OR ';
            }

        });
        return projectQuery;
    }

    private getSolrQueryForEntityType(entitiesArray) {
        // format:
        // sys_entitytype:e1 OR sys_entitytype:e2
        let entityQuery = '';
        const searchConstants = new SearchConstants();

        entitiesArray.forEach(function (entity, i) {
            const entityType = searchConstants.entityType + ':' + entity.trim();
            entityQuery += entityType;

            if (i < entitiesArray.length - 1) {
                entityQuery += ' OR ';
            }
        });

        return entityQuery;
    }

    private getSolrQueryForDBTypes(dbTypeArray) {
        // format:
        // sys_dbtype:db1 OR sys_dbtype:db2

        let dbQuery = '';
        const searchConstants = new SearchConstants();
        dbTypeArray.forEach(function (db, i) {
            const dbType = searchConstants.database + ':' + db.trim();
            dbQuery += dbType;

            if (i < dbTypeArray.length - 1) {
                dbQuery += ' OR ';
            }
        });

        return dbQuery;
    }

    private getSolrQueryForCategory(categoryArray) {
        // format:

        let categoryQuery = '';
        const searchConstants = new SearchConstants();
        categoryArray.forEach(function (category, i) {
            if (category.trim().startsWith('2')) {
                const categories = searchConstants.category + ':' + category.trim();
                categoryQuery += categories;

                if (i < categoryArray.length - 1) {
                    categoryQuery += ' OR ';
                }
            }
        });

        return categoryQuery;
    }

    private getSolrQueryForDBInstances(dbInstanceArray) {

        let dbQuery = '';
        const searchConstants = new SearchConstants();
        dbInstanceArray.forEach(function (src, i) {
            const dbInstance = searchConstants.dataSource + ':' + src.trim();
            dbQuery += dbInstance;

            if (i < dbInstanceArray.length - 1) {
                dbQuery += ' OR ';
            }
        });

        return dbQuery;
    }
}
