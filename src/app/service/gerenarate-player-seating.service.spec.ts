import { TestBed } from '@angular/core/testing';

import { GerenaratePlayerSeatingService } from './gerenarate-player-seating.service';

describe('GerenaratePlayerSeatingService', () => {
  let service: GerenaratePlayerSeatingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GerenaratePlayerSeatingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
