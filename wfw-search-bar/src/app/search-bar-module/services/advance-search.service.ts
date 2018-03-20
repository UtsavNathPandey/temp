import { Injectable } from '@angular/core';
import {Http, Response, HttpModule} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AdvanceSearchService {

  constructor(
    private http: Http
  ) { }

  /**
   * @method getAdvanceFormData
   * @description get the static data from searchform.json
  */
  getAdvanceFormData() {
    return this.http.get('../assets/data/searchform.json')
    .map(res => res.json());
  }
}
