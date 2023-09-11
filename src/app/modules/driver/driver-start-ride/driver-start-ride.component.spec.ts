import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverStartRideComponent } from './driver-start-ride.component';

describe('DriverStartRideComponent', () => {
  let component: DriverStartRideComponent;
  let fixture: ComponentFixture<DriverStartRideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverStartRideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverStartRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
