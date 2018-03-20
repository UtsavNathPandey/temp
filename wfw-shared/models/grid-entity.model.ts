export class GridEntityType {
    name: string;
    count: number;
    entityType: string;
    entityModel: string;
    catalogueName: string;
    dataModel: string;
    columnList: any[];
    gridViewColumnList: any[];
    fullViewColumnList: any[];
    data: any[];
    constructor(name: string, count: number) {
        this.name = name;
        this.count = count;
        this.entityType = name;
        this.entityModel = '';
        this.catalogueName = '';
        this.dataModel = '';
        this.columnList = [];
        this.gridViewColumnList = [];
        this.fullViewColumnList = [];
        this.data = [];
    }
}