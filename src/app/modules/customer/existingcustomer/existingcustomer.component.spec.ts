import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingcustomerComponent } from './existingcustomer.component';

describe('ExistingcustomerComponent', () => {
  let component: ExistingcustomerComponent;
  let fixture: ComponentFixture<ExistingcustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExistingcustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistingcustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
