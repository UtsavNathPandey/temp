import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { WFWSearchFiltersModule } from './search-filters-module/search-filters.module';
import { ApiClientService } from 'wfw-shared/services/api-client.service';
import { AuthService } from 'wfw-shared/services/auth.service';
import { SearchResultsService } from 'wfw-shared/services/search-results.service';
import { WfwEventsService } from 'wfw-shared/services/wfw-events.service';

import { OverlayPanelModule } from 'primeng/primeng';
// import { SaveRefinementsFormComponent } from './search-filters-module/components/save-refinements-form/save-refinements-form.component';
// debug modules
import { WFWSearchBarModule } from 'wfw-search-bar';
import { WFWSearchResultsModule } from 'wfw-search-results';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    WFWSearchFiltersModule,
    WFWSearchResultsModule,
    WFWSearchBarModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    OverlayPanelModule
  ],
  providers: [ ApiClientService, AuthService, SearchResultsService, WfwEventsService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
