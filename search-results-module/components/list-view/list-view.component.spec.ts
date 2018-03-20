import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { DataListModule, CheckboxModule, CarouselModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';
import { ListViewComponent } from './list-view.component';
import { ListItemComponent } from './list-item/list-item.component';
import { SearchResultsService } from 'wfw-shared/services/search-results.service';
import { AuthService } from 'wfw-shared/services/auth.service';
import { ApiClientService } from 'wfw-shared/services/api-client.service';
import { DocsCarouselComponent } from './../docs-carousel/docs-carousel.component';


describe('ListViewComponent', () => {
  let component: ListViewComponent;
  let fixture: ComponentFixture<ListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListViewComponent, ListItemComponent, DocsCarouselComponent ],
      imports: [ CheckboxModule, DataListModule, CarouselModule, HttpModule, FormsModule ],
      providers: [ SearchResultsService, ApiClientService, AuthService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
