import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseBarberComponent } from './choose-barber.component';

describe('ChooseBarberComponent', () => {
  let component: ChooseBarberComponent;
  let fixture: ComponentFixture<ChooseBarberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseBarberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseBarberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
