import { TestBed } from '@angular/core/testing';

import { EstimatedRideService } from './estimated-ride.service';

describe('EstimatedRideService', () => {
  let service: EstimatedRideService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstimatedRideService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
