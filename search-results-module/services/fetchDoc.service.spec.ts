import { FetchDocService } from './fetchDoc.service';
import { TestBed, inject } from '@angular/core/testing';
import {HttpModule} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';


describe('FetchDocService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [FetchDocService]
    });
  });

  it('FetchDocService should be created', inject([FetchDocService], (service: FetchDocService) => {
    expect(service).toBeTruthy();
  }));

  it('should call getDocData method to fetch Doc data and display in doc viewer', inject([FetchDocService], (service: FetchDocService) => {
    const blob = new Blob(['foo', 'bar']);
    spyOn(window, 'open');
    spyOn(window.URL, 'createObjectURL').and.returnValue('url');
    spyOn(service, 'getDocData').and.returnValue(Observable.of(blob));
    service.viewOrDownloadDocument('file.pdf', 'url');
    expect(window.open).toHaveBeenCalled();
    expect(window.URL.createObjectURL).toHaveBeenCalledWith(blob);
    expect(service.getDocData).toHaveBeenCalledWith('file.pdf', 'url');
  }));
});
