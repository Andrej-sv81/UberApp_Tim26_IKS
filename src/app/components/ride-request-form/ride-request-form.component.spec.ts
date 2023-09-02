import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideRequestFormComponent } from './ride-request-form.component';

describe('RideRequestFormComponent', () => {
  let component: RideRequestFormComponent;
  let fixture: ComponentFixture<RideRequestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RideRequestFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RideRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
