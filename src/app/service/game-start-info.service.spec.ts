import { TestBed } from '@angular/core/testing';

import { GameStartInfoService } from './game-start-info.service';

describe('GameStartInfoService', () => {
  let service: GameStartInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameStartInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
