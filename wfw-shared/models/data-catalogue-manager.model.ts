
/**
 * DataCatalogues Model
 *
 * @export
 * @interface DataCataloguesManager
 */
export interface DataCataloguesManager {
    /**
     * UniqueName
     *
     * @type {string}
     * @memberof DataCatalogues
     */
    UniqueName: string;

    /**
     * DisplayName
     *
     * @type {string}
     * @memberof DataCatalogues
     */
    DisplayName: string;

    /**
     * Name
     *
     * @type {string}
     * @memberof DataCatalogues
     */
    Name: string;

    /**
     * Entity
     *
     * @type {string}
     * @memberof DataCatalogues
     */
    Entity: string;

    /**
     * DataModel
     *
     * @type {string}
     * @memberof DataCatalogues
     */
    DataModel: string;

    /**
     * IsCommonModel
     *
     * @type {string}
     * @memberof DataCatalogues
     */
    IsCommonModel: string;


    /**
     * EnableCart
     *
     * @type {string}
     * @memberof DataCatalogues
     */
    EnableCart: string;

    /**
    * IsBrowseable
    *
    * @type {string}
    * @memberof DataCatalogues
    */
    IsBrowseable: string;

    /**
    * ShowInClassification
    *
    * @type {string}
    * @memberof DataCatalogues
    */
    ShowInClassification: string;

    /**
    * UniqueID
    *
    * @type {string}
    * @memberof DataCatalogues
    */
    UniqueID: string;

    /**
     * Filter
     *
     * @type {string}
     * @memberof DataCatalogues
     */
    Filter: string;

    /**
     * AdministratorEmails
     *
     * @type {string}
     * @memberof DataCatalogues
     */
    AdministratorEmails: string;

    /**
     * ExtendedInfo
     *
     * @type {string}
     * @memberof DataCatalogues
     */
    ExtendedInfo: string;

    /**
    * Columns
    *
    * @type {DataCataloguesColumns}
    * @memberof DataCatalogues
    */
    Columns: Array<any>;

    /**
    * Views
    *
    * @type {DataCataloguesViews}
    * @memberof DataCatalogues
    */
    Views: Array<any>;

}
