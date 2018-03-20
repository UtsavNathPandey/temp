import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeModule, TreeNode, OverlayPanelModule, ButtonModule } from 'primeng/primeng';
import { SearchFiltersComponent } from './components/search-filters/search-filters.component';
import { SelectedRefinementsComponent } from './components/selected-refinements/selected-refinements.component';
import { AvailableRefinementsComponent } from './components/available-refinements/available-refinements.component';
import { FilterChipsComponent } from './components/filter-chips/filter-chips.component';
import { SaveRefinementsFormComponent } from './components/save-refinements-form/save-refinements-form.component';

import { TreeDataTransformService } from './services/tree-data-transform.service';
import { RefinementService } from './services/refinement.service';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TreeModule,
    FormsModule,
    OverlayPanelModule,
    ButtonModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    SearchFiltersComponent
  ],
  exports: [
    SearchFiltersComponent
  ],
  declarations: [SearchFiltersComponent, SelectedRefinementsComponent,
                 AvailableRefinementsComponent, FilterChipsComponent,
                 SaveRefinementsFormComponent],
  providers: [TreeDataTransformService, RefinementService]
})
export class WFWSearchFiltersModule {
  public static entry = SearchFiltersComponent;
 }
