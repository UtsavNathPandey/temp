import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MessagesModule,
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
  ListboxModule } from 'primeng/primeng';
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { WfwIconComponent } from './../../icons/wfw-icon-component';
import { NotificationComponent } from './../../components/notification/notification.component';
import { WfwNotificationService } from '../../services/notification.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        WfwIconComponent,
        NotificationComponent
      ],
      imports : [
        BrowserAnimationsModule,
        RouterTestingModule,
        MessagesModule,
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
        ListboxModule
      ],
      providers: [ WfwNotificationService ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'wfw showcase'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('wfw showcase');
  }));
});
