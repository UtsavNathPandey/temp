/**
 * SearchConfigurationFields Model
 *
 * @export
 * @interface SearchConfigurationFields
 */
export interface SearchConfigurationFields {
    /**
     * id
     *
     * @type {number}
     * @memberof SearchConfigurationFields
     */
    id: number;

    /**
    * title
    *
    * @type {string}
    * @memberof SearchConfigurationFields
    */
    title: string;

    /**
     * ServiceName
     *
     * @type {string}
     * @memberof SearchConfigurationFields
     */
    serviceName: string;

    /**
    * searchSettingsLibrary
    *
    * @type {string}
    * @memberof SearchConfigurationFields
    */
    searchSettingsLibrary: string;

    /**
     * Facet Fields
     *
     * @type {Array<string>}
     * @memberof SearchConfigurationFields
     */
    facetFields: Array<string>;

    /**
     * sortFields
     *
     * @type {Array<string>}
     * @memberof SearchConfigurationFields
     */
    sortFields: Array<string>;

    /**
    * recordsPerPage
    *
    * @type {string}
    * @memberof SearchConfigurationFields
    */
    recordsPerPage: string;

    /**
     * recordsPerPageOptions
     *
     * @type {Array<string>}
     * @memberof SearchConfigurationFields
     */
    recordsPerPageOptions: Array<string>;

    /**
    * resultViews
    *
    * @type {Array<string>}
    * @memberof SearchConfigurationFields
    */
    resultViews: Array<string>;

    /**
     * defaultResultView
     *
     * @type {string}
     * @memberof SearchConfigurationFields
     */
    defaultResultView: string;
}
