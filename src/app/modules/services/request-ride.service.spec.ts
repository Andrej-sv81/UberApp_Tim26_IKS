import { TestBed } from '@angular/core/testing';

import { RequestRideService } from './request-ride.service';

describe('RequestRideService', () => {
  let service: RequestRideService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestRideService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
