import { CommonModule } from '@angular/common';
import { WfwEventsService } from 'wfw-shared/services/wfw-events.service';
import { HttpModule } from '@angular/http';
import { GridService } from './../../services/grid.service';
import { ButtonModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed, inject} from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { CellEditorComponent } from './cell-editor.component';

describe('CellEditorComponent', () => {
  let component: CellEditorComponent;
  let fixture: ComponentFixture<CellEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellEditorComponent ],
      imports: [FormsModule, ButtonModule, HttpModule],
      providers: [GridService, WfwEventsService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
