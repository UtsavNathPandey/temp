import {Injectable} from '@angular/core';
import {Http, ResponseContentType} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()

export class FetchDocService  {

  constructor(private http: Http) {}

  mimeTypes = {
    'pdf': 'application/pdf',
    'txt': 'text/text',
    'xls': 'application/vnd.ms-excel',
    'mp4': 'video/mp4',
    'dlis': 'application/octet-stream',
    'las': 'text/plain',
    'lis': 'application/octet-stream',
    'png': 'image/png',
    'tiff': 'image/tiff'
    };
  /**
   * @method viewOrDownloadDocument
   * @description this method download/open's the document in browser's document viewer
   * @param fileName<string>
   * @param url<string>
  */
  public viewOrDownloadDocument(fileName: string, url: string): void {
    this.getDocData(fileName, url).subscribe((data: Blob) => {
    if (window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveBlob(data, fileName);
    } else {
        const URL = window.URL.createObjectURL(data);
        window.open(URL, '_blank');
    }
    });
  }
  /**
   * @method getDocData
   * @description this method get the document data as Blob from given URL
   * @param fileName<string>
   * @param url<string>
  */
  public getDocData(fileName: string, url: string): Observable<Blob> {
    const fileExtension = fileName.substr((fileName.lastIndexOf('.') + 1));
    return this.http.get(url, {
      responseType: ResponseContentType.Blob
    })
    .map(res => new Blob([res.blob()], {type: this.mimeTypes[fileExtension] }));
  }

}
