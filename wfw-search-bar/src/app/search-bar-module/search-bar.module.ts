import { NgModule } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SharedModule, ButtonModule, InputTextModule } from 'primeng/primeng';
import { AdvancedSearchComponent } from './components/advanced-search/advanced-search.component';
import { ConditionComponent } from './components/condition/condition.component';
import { OverlayPanelModule } from 'primeng/primeng';
import { MultiSelectModule } from 'primeng/primeng';
import { DropdownModule } from 'primeng/primeng';
import { AdvanceSearchService } from './services/advance-search.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ButtonModule,
    InputTextModule,
    OverlayPanelModule,
    MultiSelectModule,
    ReactiveFormsModule,
    DropdownModule
  ],
  entryComponents: [
    SearchBarComponent
  ],
  exports: [
    SearchBarComponent
  ],
  providers: [
    AdvanceSearchService
  ],
  declarations: [SearchBarComponent, AdvancedSearchComponent, ConditionComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
})
export class WFWSearchBarModule {
  public static entry = SearchBarComponent;
 }
