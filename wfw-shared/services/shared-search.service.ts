import { Injectable } from '@angular/core';
import { SavedSearch, SearchQuery } from '../models/search.interface';
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
export class SharedSearchService {

    // Saved Search
    public savedSearches: Array<SavedSearch> = [];

    constructor(
        private _api: ApiClientService,
        private _wfwEvents: WfwEventsService
    ) {
    }

    getSavedSearch(appName: string) {
        return this._api.get(`/searchservice/getSavedSearch/${appName}`)
            .map(res => res.json())
            .do(searches => this.savedSearches = searches);
    }

    updateSavedSearch(appName: string) {
        return this._api.post(`/searchservice/getSavedSearch/${appName}`, this.savedSearches)
            .map(res => res.json());
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
