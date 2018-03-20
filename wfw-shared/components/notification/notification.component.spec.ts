import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { NotificationComponent } from './notification.component';
import { WfwNotificationService } from '../../services/notification.service';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;
  const SUCCESS_MESSAGE = {id: 0, severity: 'success', summary: 'Success Message', detail: 'Order submitted', closable: true};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationComponent ],
      providers: [ WfwNotificationService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load data from service', inject([WfwNotificationService], (notificationService: WfwNotificationService) => {
    spyOn(notificationService, 'message');
    notificationService.message(SUCCESS_MESSAGE);
    expect(notificationService.message).toHaveBeenCalledWith( SUCCESS_MESSAGE );
  }));

  it('should remove message from service when close button is clicked',
     inject([WfwNotificationService], (notificationService: WfwNotificationService) => {
    spyOn(notificationService, 'message');
    notificationService.message(SUCCESS_MESSAGE);
    component.clear(null, SUCCESS_MESSAGE.id);
    expect(notificationService.clearMessageById).toHaveBeenCalledWith(null, SUCCESS_MESSAGE.id);
  }));

});
