import { TestBed } from '@angular/core/testing';

import { PassRideDataService } from './pass-ride-data.service';

describe('PassRideDataService', () => {
  let service: PassRideDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassRideDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
