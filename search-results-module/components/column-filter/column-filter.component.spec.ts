import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RadioButtonModule, OverlayPanelModule } from 'primeng/primeng';
import { ColumnFilterComponent } from './column-filter.component';
import { FormsModule } from '@angular/forms';


describe('ColumnFilterComponent', () => {
  let component: ColumnFilterComponent;
  let fixture: ComponentFixture<ColumnFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColumnFilterComponent ],
      imports: [ FormsModule, RadioButtonModule, OverlayPanelModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
