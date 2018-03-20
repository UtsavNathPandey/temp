import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SaveRefinementsFormComponent } from './save-refinements-form.component';
import { OverlayPanelModule } from 'primeng/primeng';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';

describe('SaveRefinementsFormComponent', () => {
  let component: SaveRefinementsFormComponent;
  let fixture: ComponentFixture<SaveRefinementsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveRefinementsFormComponent ],
      imports: [
        BrowserAnimationsModule,
        OverlayPanelModule,
        FormsModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveRefinementsFormComponent);
    component = fixture.componentInstance;
    component.appliedRefinements = [];
    component.saveRefinementsFormPanelOverlay = {
      hide: function() {

      }
    };
    fixture.detectChanges();
  });

  it('should create save as form component', () => {
    expect(component).toBeTruthy();
  });

  describe('onSaveBtnClick', () => {
    it('should console the save refinements and refinements name', () => {
      component.saveRefinementsName = {
        'name': 'test',
        'refinemelts': {}
      };
      spyOn(console, 'log');
      component.onSaveBtnClick();
      expect(console.log).toHaveBeenCalledWith('save search' + component.saveRefinementsName);
    });
  });
});
