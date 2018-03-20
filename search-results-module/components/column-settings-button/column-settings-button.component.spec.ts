import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnSettingsButtonComponent } from './column-settings-button.component';

describe('ColumnSettingsButtonComponent', () => {
  let component: ColumnSettingsButtonComponent;
  let fixture: ComponentFixture<ColumnSettingsButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColumnSettingsButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnSettingsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
