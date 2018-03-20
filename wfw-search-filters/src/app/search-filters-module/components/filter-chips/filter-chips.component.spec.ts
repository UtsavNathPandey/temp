import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterChipsComponent } from './filter-chips.component';
import { SearchFiltersComponent } from './../search-filters/search-filters.component';
import { SelectedRefinementsComponent } from './../selected-refinements/selected-refinements.component';
import { AvailableRefinementsComponent } from './../available-refinements/available-refinements.component';
import { RefinementService } from './../../services/refinement.service';
import { SaveRefinementsFormComponent } from './../save-refinements-form/save-refinements-form.component';
import { TreeModule, OverlayPanelModule } from 'primeng/primeng';

describe('FilterChipsComponent', () => {
  let component: FilterChipsComponent;
  let fixture: ComponentFixture<FilterChipsComponent>;
  const fileData = {TreeNode: {label: 'Open Works'}};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterChipsComponent, AvailableRefinementsComponent, SelectedRefinementsComponent,
                      SearchFiltersComponent, SaveRefinementsFormComponent ],
      imports: [
        TreeModule,
        OverlayPanelModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [ RefinementService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterChipsComponent);
    component = fixture.componentInstance;
    component.fileData = fileData;
    fixture.detectChanges();
  });

  it('should create filter chips component', () => {
    expect(component).toBeTruthy();
  });

  it('should call remove when remove method invoked', () => {
    component.remove();
    component.onFilterRemoval.subscribe(msg => {
      expect(msg).toContain('filter remove');
    });
  });
});
