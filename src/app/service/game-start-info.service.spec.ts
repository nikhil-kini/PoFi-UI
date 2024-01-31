import { TestBed } from '@angular/core/testing';

import { GameStartInfoService } from './game-start-info.service';
import { take } from 'rxjs/internal/operators/take';

describe('GameStartInfoService', () => {
  let service: GameStartInfoService;

  beforeEach(() => {
    service = new GameStartInfoService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get default value for the gameStartData$', (done: DoneFn) => {
    let expectedVal = {
      profileName: 'Not set',
      websiteName: 'Not Set',
      tableSeats: 5,
      anteAmount: 0,
      smallBet: 0,
      bigBet: 0,
    };
    service.gameStartData$.subscribe((value) => {
      expect(value).toEqual(expectedVal);
    });
    done();
  });

  it('get default value for the gameUserInfoData$', (done: DoneFn) => {
    let expectedVal = {
      userPosition: 1,
    };
    service.gameUserInfoData$.subscribe((value) => {
      expect(value).toEqual(expectedVal);
    });
    done();
  });

  it('setGameStartData() value for the gameStartData$', (done: DoneFn) => {
    let expectedVal = {
      profileName: 'Game 1',
      websiteName: 'pokerstar.com',
      tableSeats: 5,
      anteAmount: 1,
      smallBet: 1,
      bigBet: 2,
    };
    service.gameStartData$.pipe(take(1)).subscribe((value) => {
      expect(value)
        .withContext('service test for default value')
        .not.toEqual(expectedVal);
    });

    service.setGameStartData(expectedVal);
    service.gameStartData$.subscribe((value) => {
      expect(value)
        .withContext('service test for set value')
        .toEqual(expectedVal);
    });
    done();
  });

  it('setGameUserInfoData() value for the gameUserInfoData$', (done: DoneFn) => {
    let expectedVal = {
      userPosition: 5,
    };
    service.gameUserInfoData$.pipe(take(1)).subscribe((value) => {
      expect(value)
        .withContext('service test for default value')
        .not.toEqual(expectedVal);
    });

    service.setGameUserInfoData(expectedVal);

    service.gameUserInfoData$.subscribe((value) => {
      expect(value)
        .withContext('service test for set value')
        .toEqual(expectedVal);
    });
    done();
  });
});
