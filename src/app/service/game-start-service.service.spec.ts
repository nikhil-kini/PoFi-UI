import { TestBed } from '@angular/core/testing';

import { GameStartServiceService } from './game-start-service.service';

describe('GameStartServiceService', () => {
  let service: GameStartServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameStartServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
