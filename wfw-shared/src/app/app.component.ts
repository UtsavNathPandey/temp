import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificationComponent } from './../../components/notification/notification.component';
import { WfwNotificationService } from '../../services/notification.service';
import { SearchResultsService } from '../../services/search-results.service';
import { SharedSearchService } from '../../services/shared-search.service';
@Component({
  selector: 'wfw-showcase',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'wfw showcase';
  msgs: any[];

  constructor(
    public notificationService: WfwNotificationService,
    public _searchSvc: SearchResultsService,
    public _sharedSearchSvc: SharedSearchService
  ) {}

  ngOnInit() {
    this._searchSvc.classificationTypes.subscribe(res => console.log(res));
    this._searchSvc.classificationMappings.subscribe(res => console.log(res));
    this._sharedSearchSvc.getSavedSearch('bhdm').subscribe(res => console.log(res));
  }

  // for banners
  showSuccess() {
    this.notificationService.clear();
    this.notificationService.message({
      severity: 'success',
      summary: 'Success Message',
      detail: 'Order submitted',
      closable: true
    });
  }

  showInfo() {
    this.notificationService.clear();
    this.notificationService.message({
      severity: 'info',
      summary: 'Info Message',
      detail: 'PrimeNG rocks'
    });
  }

  showWarn() {
    this.notificationService.clear();
    this.notificationService.message({
      severity: 'warn',
      summary: 'Warn Message',
      detail: 'There are unsaved changes'
    });
  }

  showError() {
    this.notificationService.clear();
    this.notificationService.message({
      severity: 'error',
      summary: 'Error Message',
      detail: 'Validation failed'
    });
  }

  showEvent() {
    this.notificationService.clear();
    this.notificationService.message({
      severity: 'success',
      summary: 'I have an Event',
      detail: 'to trigger click here ->',
      eventTitle: 'click me',
      event: () => {
        alert('event triggered');
      }
    });
  }

  showMultiple() {
    this.notificationService.clear();
    this.notificationService.message({
      severity: 'info',
      summary: 'Message 1',
      detail: 'Auto Closable',
      closable: false,
      autoClear: true
    });
    this.notificationService.message({
      severity: 'warn',
      summary: 'Message 2',
      detail: 'Manually Closable',
      closable: true,
      autoClear: false,
      notificationTimeout: 3000
    });
    this.notificationService.message({
      severity: 'error',
      summary: 'Message 3',
      detail: 'Manually Closable',
      closable: true,
      autoClear: false
    });
    this.notificationService.message({
      severity: 'success',
      summary: 'Message 4',
      detail: 'Auto Closable',
      closable: false,
      autoClear: true,
      notificationTimeout: 3000
    });
  }

  clear() {
    this.notificationService.clear();
  }
}
