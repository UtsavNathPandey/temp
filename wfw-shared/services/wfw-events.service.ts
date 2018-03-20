/*
  File: 
    events.service.ts
  Purpose:  
    Provide shared service to be used by root/child level components to emit 
    events and share data.
  Usage:
    Import the service 
      'import { WfwEventsService } from ./node_modules/wfw-shared/services/events.services.ts'
      ...
      constructor(
        _wfwEvents = WfwEventsServices 
      ){
        this._wfwEvents.event$.subscribe( (event,data) => { ... });
      }
*/
import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable()
export class WfwEventsService {
  private _store = {};
  public event$: EventEmitter<any>;
  
  constructor() {
    this.event$ = new EventEmitter();
  }

  emit(event: string, data?: any) {
    // Emit event and data
    this._store[event] = data || null;
    this.event$.emit({
      "name":event, 
      "data":data || null});
  }

  event(event) {
    // Get previous event
    return this._store[event] || null;
  }
}
