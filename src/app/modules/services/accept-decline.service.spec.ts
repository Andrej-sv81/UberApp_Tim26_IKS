import { TestBed } from '@angular/core/testing';

import { AcceptDeclineService } from './accept-decline.service';

describe('AcceptDeclineService', () => {
  let service: AcceptDeclineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcceptDeclineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
