import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseStyleAndConfirmComponent } from './choose-style-and-confirm.component';

describe('ChooseStyleAndConfirmComponent', () => {
  let component: ChooseStyleAndConfirmComponent;
  let fixture: ComponentFixture<ChooseStyleAndConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseStyleAndConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseStyleAndConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
