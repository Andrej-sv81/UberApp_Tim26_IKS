import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentRidePassengerComponent } from './current-ride-passenger.component';

describe('CurrentRidePassengerComponent', () => {
  let component: CurrentRidePassengerComponent;
  let fixture: ComponentFixture<CurrentRidePassengerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentRidePassengerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentRidePassengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
