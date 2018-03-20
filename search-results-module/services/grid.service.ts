import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()

export class GridService  {

    constructor(private http: Http) {}

    /**
     * @method getGridData
     * @description get the data from json file
     * @param file json file name
    */

    getGridData(file: string): Observable<any> {
        return this.http.get('/assets/data/search.json')
        .map(res => res.json());
    }

}
