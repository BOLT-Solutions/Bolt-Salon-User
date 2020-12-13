import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserwelcomepageComponent } from './userwelcomepage.component';

describe('UserwelcomepageComponent', () => {
  let component: UserwelcomepageComponent;
  let fixture: ComponentFixture<UserwelcomepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserwelcomepageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserwelcomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
