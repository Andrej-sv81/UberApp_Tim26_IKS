import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideEstimatedFormComponent } from './ride-estimated-form.component';

describe('RideEstimatedFormComponent', () => {
  let component: RideEstimatedFormComponent;
  let fixture: ComponentFixture<RideEstimatedFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RideEstimatedFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RideEstimatedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
