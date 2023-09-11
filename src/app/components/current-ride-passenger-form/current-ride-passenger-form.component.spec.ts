import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentRidePassengerFormComponent } from './current-ride-passenger-form.component';

describe('CurrentRidePassengerFormComponent', () => {
  let component: CurrentRidePassengerFormComponent;
  let fixture: ComponentFixture<CurrentRidePassengerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentRidePassengerFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentRidePassengerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
