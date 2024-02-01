import { TestBed } from '@angular/core/testing';

import { GerenaratePlayerSeatingService } from './gerenarate-player-seating.service';
import { Player, PlayerPosition, PlayerStatus } from '../model/player.model';

describe('GerenaratePlayerSeatingService', () => {
  let service: GerenaratePlayerSeatingService;

  beforeEach(() => {
    service = new GerenaratePlayerSeatingService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('addPlayer() method test', () => {
    for (let index = 1; index < 4; index++) {
      service.addPlayer(index, PlayerPosition.EARLY);
    }

    expect(service.head).withContext('Check for head').not.toBeNull();
    expect(service.tail).withContext('Check for tail').not.toBeNull();
    expect(service.playerCount).withContext('Check for playerCount').toEqual(3);
  });

  it('removePlayer() method test head null', () => {
    expect(service.head).withContext('Check for head').toBeNull();
    expect(service.tail).withContext('Check for tail').toBeNull();
    expect(service.playerCount).withContext('Check for playerCount').toEqual(0);
    expect(() => service.removePlayer(3))
      .withContext('table empty error')
      .toThrowError('The Table is Empty');
  });

  it('removePlayer() method test for 1 user', () => {
    for (let index = 0; index < 1; index++) {
      service.addPlayer(index, PlayerPosition.EARLY);
    }

    service.removePlayer(0);

    expect(service.head).withContext('Check for head').toBeNull();
    expect(service.tail).withContext('Check for tail').toBeNull();
    expect(service.playerCount).withContext('Check for playerCount').toEqual(0);
  });

  it('removePlayer() method test for head user', () => {
    for (let index = 0; index < 4; index++) {
      service.addPlayer(index, PlayerPosition.EARLY);
    }

    service.removePlayer(0);

    expect(service.head).withContext('Check for head').not.toBeNull();
    expect(service.tail).withContext('Check for tail').not.toBeNull();
    expect(service.playerCount).withContext('Check for playerCount').toEqual(3);
  });

  it('removePlayer() method test for tail user', () => {
    for (let index = 0; index < 4; index++) {
      service.addPlayer(index, PlayerPosition.EARLY);
    }

    service.removePlayer(3);

    expect(service.head).withContext('Check for head').not.toBeNull();
    expect(service.tail).withContext('Check for tail').not.toBeNull();
    expect(service.playerCount).withContext('Check for playerCount').toEqual(3);
  });

  it('findPlayer() method test head null', () => {
    expect(service.head).withContext('Check for head').toBeNull();
    expect(service.tail).withContext('Check for tail').toBeNull();
    expect(service.playerCount).withContext('Check for playerCount').toEqual(0);
    expect(() => service.findPlayer(3))
      .withContext('table empty error')
      .toThrowError('The Table is Empty');
  });

  it('findPlayer() method test for regular user', () => {
    for (let index = 0; index < 4; index++) {
      service.addPlayer(index, PlayerPosition.EARLY);
    }

    expect(service.findPlayer(2))
      .withContext('Check for find existing player')
      .not.toBeNull();
  });

  it('findPlayer() method test for user not exist', () => {
    for (let index = 0; index < 4; index++) {
      service.addPlayer(index, PlayerPosition.EARLY);
    }

    expect(() => service.findPlayer(5))
      .withContext('player not found')
      .toThrowError('The Player is not found in the table');
  });

  it('size() method test', () => {
    for (let index = 0; index < 4; index++) {
      service.addPlayer(index, PlayerPosition.EARLY);
    }

    expect(service.size()).withContext('Check size').toEqual(4);
  });

  it('toArray() method test empty[]', () => {
    expect(service.toArray()).withContext('check array').toEqual([]);
  });

  it('toArray() method test not empty', () => {
    for (let index = 0; index < 2; index++) {
      service.addPlayer(index, PlayerPosition.EARLY);
    }
    expect(service.toArray())
      .withContext('check array')
      .toEqual([service.head, service.tail]);
  });

  it('softResetPlayers() method test, Fold condition', () => {
    for (let index = 0; index < 2; index++) {
      service.addPlayer(index, PlayerPosition.EARLY);
    }

    service.head!.playerStatus = PlayerStatus.FOLD;
    service.softResetPlayers();
    expect(service.head?.playerStatus.valueOf())
      .withContext('check array')
      .toEqual(PlayerStatus.FOLD);
  });

  it('softResetPlayers() method test', () => {
    for (let index = 0; index < 2; index++) {
      service.addPlayer(index, PlayerPosition.EARLY);
    }

    service.head!.playerStatus = PlayerStatus.RAISE;
    service.tail!.playerStatus = PlayerStatus.CALL;
    service.softResetPlayers();
    expect(service.head?.playerStatus.valueOf())
      .withContext('check array')
      .toEqual(PlayerStatus.NA);
    expect(service.tail?.playerStatus.valueOf())
      .withContext('check array')
      .toEqual(PlayerStatus.NA);
  });
});
