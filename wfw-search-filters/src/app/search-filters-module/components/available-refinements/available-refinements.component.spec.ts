import { WfwEventsService } from 'wfw-shared/services/wfw-events.service';
import { AuthService } from 'wfw-shared/services/auth.service';
import { HttpModule } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { TreeModule, TreeNode, OverlayPanelModule } from 'primeng/primeng';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { AvailableRefinementsComponent } from './available-refinements.component';
import { SearchFiltersComponent } from './../search-filters/search-filters.component';
import { SelectedRefinementsComponent } from './../selected-refinements/selected-refinements.component';
import { FilterChipsComponent } from './../filter-chips/filter-chips.component';
import { RefinementService } from './../../services/refinement.service';
import { SearchResultsService } from 'wfw-shared/services/search-results.service';
import { TreeDataTransformService } from './../../services/tree-data-transform.service';
import { SaveRefinementsFormComponent } from './../save-refinements-form/save-refinements-form.component';
import { ApiClientService } from 'wfw-shared/services/api-client.service';


describe('AvailableRefinementsComponent', () => {
  let component: AvailableRefinementsComponent;
  let fixture: ComponentFixture<AvailableRefinementsComponent>;

  const dataTreeCheckbox = [
    {
      'label': 'OpenWorks',
      'data': 'OpenWorks',
      'styleClass': 'fontBold',
      'expanded': true,
      'children': [{
        'label': 'District 1',
        'data': 'District 1',
        'expanded': true,
        'children': [
          { 'label': 'Project 1', 'data': 'Project 1', 'expanded': true },
          { 'label': 'Project 2', 'data': 'Project 2', 'expanded': true }
        ]
      },
      {
        'label': 'District 2',
        'data': 'District 2',
        'expanded': true,
        'children': [
          { 'label': 'Project 1', 'data': 'Project 1', 'expanded': true }
        ]
      }]
    }];
  const dataTreeLinear = [
    {
      'label': 'Data Type',
      'data': 'Data Type',
      'styleClass': 'fontBold',
      'expanded': true,
      'children': [
        {
          'label': 'Documents2',
          'data': 'Documents Folder',
          'styleClass': 'fontBold',
        },
        {
          'label': 'Documents3',
          'data': 'Documents Folder',
          'styleClass': 'fontBold',
        },
        {
          'label': 'Documents4',
          'data': 'Documents Folder',
          'styleClass': 'fontBold',
        }
      ]
    }
    ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchFiltersComponent, SelectedRefinementsComponent, AvailableRefinementsComponent,
                      FilterChipsComponent, SaveRefinementsFormComponent ],
      imports: [
        TreeModule,
        OverlayPanelModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule
      ],
      providers: [ RefinementService, SearchResultsService, TreeDataTransformService,
        ApiClientService, AuthService, WfwEventsService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableRefinementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create available refinements component', () => {
    expect(component).toBeTruthy();
  });

  it('should call updateSelection when updateSelection method invoked', inject([RefinementService], (refService: RefinementService) => {
    spyOn(refService, 'setAppliedRefinements');
    component.selectedFile = dataTreeCheckbox;
    component.updateSelection(component.selectedFile);
    expect(refService.setAppliedRefinements).toHaveBeenCalledWith(component.selectedFile);
  }));
});
