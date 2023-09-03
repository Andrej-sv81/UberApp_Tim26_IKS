import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptDeclineRideFormComponent } from './accept-decline-ride-form.component';

describe('AcceptDeclineRideFormComponent', () => {
  let component: AcceptDeclineRideFormComponent;
  let fixture: ComponentFixture<AcceptDeclineRideFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptDeclineRideFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceptDeclineRideFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
