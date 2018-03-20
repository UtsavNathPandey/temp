import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormArray, FormControl, FormBuilder, Validators } from '@angular/forms';
import { OverlayPanelModule } from 'primeng/primeng';
import { MultiSelectModule } from 'primeng/primeng';
import { DropdownModule } from 'primeng/primeng';
import { ConditionComponent } from './condition.component';


describe('ConditionComponent', () => {
  let component: ConditionComponent;
  let fixture: ComponentFixture<ConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConditionComponent ],
      imports: [ BrowserModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule, OverlayPanelModule, DropdownModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionComponent);
    component = fixture.componentInstance;
    component.idParent = 1;
    component.item = new FormGroup({
      andOrConditionSelectName: new FormControl('', Validators.required),
      companyNamesSelectName: new FormControl('', Validators.required),
      selectConditionsName: new FormControl('', Validators.required),
      valueName: new FormControl('', Validators.required)
    });
    component.conditionOptions = {
        'select': {
          'options': [
            {
              'label': 'And',
              'value': 'And'
            },
            {
              'label': 'Or',
              'value': 'Or'
            }
          ]
        },
        'companyName': {
          'options': [
            {
              'label': 'Company1',
              'value': 'Company1'
            },
            {
              'label': 'Company2',
              'value': 'Company2'
            }
          ]
        },
        'selectCondition': {
          'options': [
            {
              'label': 'test1',
              'value': 'test1'
            },
            {
              'label': 'test2',
              'value': 'test2'
            }
          ]
        },
        'value': ''
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
