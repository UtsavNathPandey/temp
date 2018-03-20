import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

import { WfwSharedModule } from '../../wfw-shared.module';
import {
  MessagesModule,
  OverlayPanelModule,
  CheckboxModule,
  AccordionModule,
  InputTextModule,
  InputTextareaModule,
  DropdownModule,
  PasswordModule,
  AutoCompleteModule,
  InputMaskModule,
  CalendarModule,
  RadioButtonModule,
  SliderModule,
  SplitButtonModule,
  ToggleButtonModule,
  SelectButtonModule,
  MultiSelectModule,
  SpinnerModule,
  ListboxModule,
  MegaMenuModule,
  TieredMenuModule,
  DataTableModule,
  ContextMenuModule} from 'primeng/primeng';
import { MenuComponent } from './showcase/menu/menu.component';
import { FormComponent } from './showcase/form/form.component';
import { DataTableComponent } from './showcase/data-table/data-table.component';
import { ApiClientService } from '../../services/api-client.service';
import { AuthService } from '../../services/auth.service';
import { SearchResultsService } from '../../services/search-results.service';
import { WfwEventsService } from '../../services/wfw-events.service';
import { SharedSearchService } from '../../services/shared-search.service';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FormComponent,
    DataTableComponent
  ],
  imports: [
    RouterModule.forRoot([{path: '', component: AppComponent}]),
    HttpModule,
    BrowserModule,
    FormsModule,
    WfwSharedModule,
    HttpModule,
    MessagesModule,
    OverlayPanelModule,
    CheckboxModule,
    AccordionModule,
    BrowserAnimationsModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    FormsModule,
    PasswordModule,
    AutoCompleteModule,
    InputMaskModule,
    CalendarModule,
    RadioButtonModule,
    SliderModule,
    SplitButtonModule,
    ToggleButtonModule,
    SelectButtonModule,
    MultiSelectModule,
    SpinnerModule,
    ListboxModule,
    MegaMenuModule,
    TieredMenuModule,
    DataTableModule,
    ContextMenuModule
  ],
  providers: [ SearchResultsService, ApiClientService, AuthService, WfwEventsService, SharedSearchService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
