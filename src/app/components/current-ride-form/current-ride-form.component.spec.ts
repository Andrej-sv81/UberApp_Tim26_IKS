import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentRideFormComponent } from './current-ride-form.component';

describe('CurrentRideFormComponent', () => {
  let component: CurrentRideFormComponent;
  let fixture: ComponentFixture<CurrentRideFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentRideFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentRideFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
