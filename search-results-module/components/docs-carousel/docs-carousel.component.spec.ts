import { HttpModule } from '@angular/http';
import { FetchDocService } from './../../services/fetchDoc.service';
import { CarouselModule } from 'primeng/primeng';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { DocsCarouselComponent } from './docs-carousel.component';

describe('DocsCarouselComponent', () => {
  let component: DocsCarouselComponent;
  let fixture: ComponentFixture<DocsCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CarouselModule, HttpModule ],
      declarations: [ DocsCarouselComponent ],
      providers: [ FetchDocService ]
    })
    .compileComponents();
  }));

  it('should create carousel component', () => {
    fixture = TestBed.createComponent(DocsCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('should close the carousel when hideCarousel method is called', () => {
    fixture = TestBed.createComponent(DocsCarouselComponent);
    component = fixture.componentInstance;
    component.showHideCarouselChange.subscribe(g => {
       expect(g).toEqual(false);
    });
    component.hideCarousel();
  });
  it('should set the Pager by calling setPager method', () => {
    fixture = TestBed.createComponent(DocsCarouselComponent);
    component = fixture.componentInstance;
    component.showHideCarousel = true;
    fixture.detectChanges();
    component.setPager();
    expect(component.from).toBe(1);
    expect(component.to).toBe(3);
  });
  it('should call the setPager method when the carousel component is updated', () => {
    fixture = TestBed.createComponent(DocsCarouselComponent);
    component = fixture.componentInstance;
    spyOn(component, 'setPager');
    fixture.detectChanges();
    component.onCarouselChange();
    expect(component.setPager).toHaveBeenCalled();
  });
  it('Should display the document in doc viewer when user clicks on document icon from doc carousel'
    , inject([FetchDocService], (service: FetchDocService) => {
      fixture = TestBed.createComponent(DocsCarouselComponent);
      component = fixture.componentInstance;
      spyOn(service, 'viewOrDownloadDocument');
      component.showDocPreview('fileName', 'url');
      expect(service.viewOrDownloadDocument).toHaveBeenCalledWith('fileName', 'url');
  }));
  afterEach(() => {
    fixture.destroy();
  });
});
