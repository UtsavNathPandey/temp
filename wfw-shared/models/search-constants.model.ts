export class SearchConstants {
    public numRowsToFetch: number;
    public columnTypeInteger: string;
    public columnTypeString: string;
    public columnTypeDecimal: string;
    public columnTypeShort: string;
    public columnTypeBoolean: string;
    public columnTypeInt64: string;
    public columnTypeSingle: string;
    public columnTypeDouble: string;
    public columnTypeByte: string;
    public columnTypeInt32: string;
    public columnTypeDateTime: string;

    public dcColumnTypeInt: string;

    public basicSearchType: string;
    public advancedSearchType: string;

    public category: string;
    public columnName: string;
    public entityType: string;
    public modelEntityType: string;
    public dataSource: string;
    public dataModel: string;
    public searchModeText: string;
    public searchModeAdvanced: string;
    public searchModeRelatedItem: string;
    public solrFieldNameSysRelation: string;
    public database: string;
    public project: string;
    public primaryKey: string;
    public dataTransferUrl: string;

    public attributesID: string;
    public databaseTypeID: string;
    public dataSourceID: string;
    public dataCategoryID: string;
    public dataTypeID: string;
    public dcExtPropTitleAdditionalColumns: string;

    public dcColumnTypeText: string;
    public dcColumnTypeBool: string;
    public dcColumnTypeDateTime: string;
    public dcColumnTypeReal: string;

    public attributeValueSeparator: string;


    constructor() {
        this.numRowsToFetch = 2000;
        this.columnTypeInteger = 'System.Integer';
        this.columnTypeString = 'System.String';
        this.columnTypeDecimal = 'System.Decimal';
        this.columnTypeShort = 'System.Short';
        this.columnTypeBoolean = 'System.Boolean';
        this.columnTypeInt64 = 'System.Int64';
        this.columnTypeSingle = 'System.Single';
        this.columnTypeDouble = 'System.Double';
        this.columnTypeByte = 'System.Byte';
        this.columnTypeInt32 = 'System.Int32';
        this.columnTypeDateTime = 'System.DateTime';

        this.dcColumnTypeInt = 'int';

        this.basicSearchType = 'basic';
        this.advancedSearchType = 'advanced';

        this.category = 'sys_category';
        this.columnName = 'sys_columnname';
        this.entityType = 'sys_entitytype';
        this.modelEntityType = 'sys_modelentity';
        this.dataSource = 'sys_source';
        this.dataModel = 'sys_model';
        this.searchModeText = 'textSearch';
        this.searchModeAdvanced = 'advancedSearch';
        this.searchModeRelatedItem = 'relatedItemSearch';
        this.solrFieldNameSysRelation = 'sys_relation';
        this.database = 'sys_dbtype';
        this.project = 'sys_project';
        this.primaryKey = 'sys_primarykey';
        this.dataTransferUrl = 'DataTransfer.aspx';

        this.attributesID = '_Attributes';
        this.databaseTypeID = '_DatabaseType';
        this.dataSourceID = '_DataSource';
        this.dataCategoryID = '_DataSources';
        this.dataTypeID = '_DataType';
        this.dcExtPropTitleAdditionalColumns = 'TitleAdditionalColumns';

        this.dcColumnTypeText = 'text';
        this.dcColumnTypeBool = 'bool';
        this.dcColumnTypeDateTime = 'datetime';
        this.dcColumnTypeInt = 'int';
        this.dcColumnTypeReal = 'real';

        this.attributeValueSeparator = ',';
    }
}
