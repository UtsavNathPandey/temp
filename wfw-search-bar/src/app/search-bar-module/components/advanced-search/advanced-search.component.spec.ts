import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import {MockBackend, MockConnection} from '@angular/http/testing';
import { CommonModule } from '@angular/common';
import { HttpModule, Response, ResponseOptions} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AdvancedSearchComponent } from './advanced-search.component';
import { ConditionComponent } from '../condition/condition.component';
import { AdvanceSearchService } from '../../services/advance-search.service';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormArray, FormControl, FormBuilder, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { OverlayPanelModule } from 'primeng/primeng';
import { MultiSelectModule } from 'primeng/primeng';
import { DropdownModule } from 'primeng/primeng';

describe('AdvancedSearchComponent', () => {
  let component: AdvancedSearchComponent;
  let fixture: ComponentFixture<AdvancedSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvancedSearchComponent, ConditionComponent, SearchBarComponent ],
      imports: [
        HttpModule, CommonModule, FormsModule,
        ReactiveFormsModule, OverlayPanelModule, DropdownModule, MultiSelectModule
      ],
      providers: [
        AdvanceSearchService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancedSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('addCondition', () => {
    it('should add new condition', () => {
      component.addCondition();
      spyOn(component, 'buildItem');
      fixture.detectChanges();
      expect(component.itemsFormArray.length).toEqual(2);
    });
  });

  describe('deleteCondition', () => {
    it('should delete condition', () => {
      component.deleteCondition(1);
      fixture.detectChanges();
      expect(component.itemsFormArray.controls.length).toEqual(1);
    });
  });

  describe('buildFormItems', () => {
    it('should add the items', () => {
      component.buildFormItems();
      spyOn(component, 'buildItem');
      fixture.detectChanges();
      expect(FormArray.length).toEqual(3);
    });
  });

  describe('buildItem', () => {
    it('should add the item', () => {
      component.buildItem();
      fixture.detectChanges();
      expect(FormGroup.length).toEqual(3);
    });
  });

});
