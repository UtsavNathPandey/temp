import { Injectable } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

import { NotificationType } from "../models/notification-type.interface";

@Injectable()
export class WfwNotificationService {
  private _messageData: Array<NotificationType> = [];
  private _messages: BehaviorSubject<
    Array<NotificationType>
  > = new BehaviorSubject(this._messageData);

  public Messages: Observable<
    Array<NotificationType>
  > = this._messages.asObservable();

  constructor() {}

  /**
   * @method clearMessage
   * @description this method used to clear a message.
   * @param m - A message object to be cleared
   */
  clearMessage(m: NotificationType): void {
    let index: number = -1;
    this._messageData.forEach((val, i) => {
      if (val.id === m.id) {
        index = i;
        return;
      }
    });

    this._messageData.splice(index, 1);
    this._messages.next(this._messageData);
  }

  /**
   * @method clearMessageById
   * @description this method used to clear a message by an id.
   * @param id - the id of the message to be cleared
   */
  clearMessageById(id: number): void {
    let index: number = -1;
    this._messageData.forEach((val, i) => {
      if (val.id === id) {
        index = i;
        return;
      }
    });
    this._messageData.splice(index, 1);
    this._messages.next(this._messageData);
  }

  /**
   * @method message
   * @description add a message to the behavior subject
   * @param message - A message object to be displayed
   */
  message(message: NotificationType) {
    message = this._addMessageId(message);
    this._messageData.push(message as NotificationType);
    // All banners need to have a global hide timer that will automatically hide the banner from the user after 3 seconds (3000ms).
    if (message.autoClear) {
      setTimeout(() => {
        this.clearMessageById(message.id);
      }, message.notificationTimeout);
    }
    this._messages.next(this._messageData);
  }

  /**
   * @method _addMessageId
   * @description this is a utility method used to add an id to a message object
   * @param message - message to add the id
   */
  private _addMessageId(
    message: NotificationType | { type: String; text: String }
  ): NotificationType {
    return Object.assign({}, message, {
      id: this._messageData.length + 1
    }) as NotificationType;
  }

  /**
   * @method clear
   * @description clear out all the messages
   */
  clear() {
    this._messageData = [];
    this._messages.next(this._messageData);
  }

  /**
   * @method _addMessageId
   * @description return all messages as an observable
   */
  getMessages(): Observable<Array<NotificationType>> {
    return this.Messages;
  }
}
