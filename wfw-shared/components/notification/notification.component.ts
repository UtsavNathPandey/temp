import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NotificationType } from './../../models/notification-type.interface';
import { WfwNotificationService } from '../../services/notification.service';

@Component({
  selector: 'wfw-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {

  public Messages: Observable<Array<NotificationType>> = this.notificationService.getMessages();

  constructor(
    public notificationService: WfwNotificationService
  ) {
  }

  clear(event, id) {
    this.notificationService.clearMessageById(id);
  }

}
