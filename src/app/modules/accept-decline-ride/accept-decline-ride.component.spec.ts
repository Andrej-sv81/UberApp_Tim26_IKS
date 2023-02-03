import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptDeclineRideComponent } from './accept-decline-ride.component';

describe('AcceptDeclineRideComponent', () => {
  let component: AcceptDeclineRideComponent;
  let fixture: ComponentFixture<AcceptDeclineRideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptDeclineRideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceptDeclineRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
