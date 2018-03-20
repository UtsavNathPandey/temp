export interface GridConfig {
    url: string;
    reorderableColumns: boolean;
    resizableColumns: boolean;
    rows: string;
    lazy: boolean;
    loading: boolean;
    paginator: boolean;
    pageLinks: number;
    expandableRows: boolean;
    rowsPerPageOptions: Array<string>;
    scrollable: boolean;
    editable: boolean;
    dataValidation: boolean;
    columnConfig: {
        expanded:  boolean;
        selectionMode: string;
        headerConfig: {
            editable: boolean;
            sortable: boolean;
        }
    };
}
