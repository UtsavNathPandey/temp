import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SearchResultsHeaderComponent } from './search-results-header.component';
import { DropdownModule, SharedModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';

import { HttpModule } from '@angular/http';
import { SearchResultsService } from 'wfw-shared/services/search-results.service';
import { AuthService } from 'wfw-shared/services/auth.service';
import { ApiClientService } from 'wfw-shared/services/api-client.service';

describe('SearchResultsHeaderComponent', () => {
  let component: SearchResultsHeaderComponent;
  let fixture: ComponentFixture<SearchResultsHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchResultsHeaderComponent ],
      imports: [ HttpModule, DropdownModule, SharedModule, FormsModule, BrowserAnimationsModule ],
      providers: [ SearchResultsService, ApiClientService, AuthService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should log an message when add to cart method invoked', () => {
    spyOn(console, 'log');
    component.addToCart();
    expect(console.log).toHaveBeenCalledWith('global add to cart  clicked');
  });
  it('should log an message when launchLogViewer method invoked', () => {
    spyOn(console, 'log');
    component.launchLogViewer();
    expect(console.log).toHaveBeenCalledWith('global logviewer clicked');
  });

  describe('backToSearch', () => {
    it('should console log', () => {
      spyOn(console, 'log');
      component.backToSearch();
      expect(console.log).toHaveBeenCalledWith('back to search clicked');
    });
  });
});
