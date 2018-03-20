import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { WfwEventsService } from 'wfw-shared/services/wfw-events.service';
import { AppComponent } from './app.component';
import { WFWSearchBarModule } from './search-bar-module/search-bar.module';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    WFWSearchBarModule,
    HttpModule
  ],
  providers: [ WfwEventsService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
