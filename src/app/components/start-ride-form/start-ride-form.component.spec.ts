import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartRideFormComponent } from './start-ride-form.component';

describe('StartRideFormComponent', () => {
  let component: StartRideFormComponent;
  let fixture: ComponentFixture<StartRideFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartRideFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartRideFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
