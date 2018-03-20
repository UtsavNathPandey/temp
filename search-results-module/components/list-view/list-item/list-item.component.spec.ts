import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { ListItemComponent } from './list-item.component';
import { SearchResultsService } from 'wfw-shared/services/search-results.service';
import { DataListModule, CheckboxModule, SharedModule, CarouselModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'wfw-shared/services/auth.service';
import { ApiClientService } from 'wfw-shared/services/api-client.service';
import { DocsCarouselComponent } from './../../docs-carousel/docs-carousel.component';

describe('ListItemComponent', () => {
  let component: ListItemComponent;
  let fixture: ComponentFixture<ListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListItemComponent, DocsCarouselComponent ],
      imports: [ CheckboxModule, DataListModule, HttpModule, FormsModule, SharedModule, CarouselModule],
      providers: [ SearchResultsService, AuthService, ApiClientService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create list item component', () => {
    expect(component).toBeTruthy();
  });
  it('should close the carousel when hideCarousel method is called with false', () => {
    component.hideCarousel(false);
    expect(component.showCarousel).toBe(false);
  });
  it('should log an message when add to cart method invoked', () => {
    spyOn(console, 'log');
    component.addRecordToCart();
    expect(console.log).toHaveBeenCalledWith('add to cart  clicked');
  });
  it('should log an message when launchLogViewer method invoked', () => {
    spyOn(console, 'log');
    component.launchLogViewer();
    expect(console.log).toHaveBeenCalledWith('logviewer clicked');
  });
});
