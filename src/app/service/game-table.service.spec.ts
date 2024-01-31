import { TestBed } from '@angular/core/testing';

import { GameTableService } from './game-table.service';
import { CommonService } from '../commons/service/common.service';
import { HttpClientService } from './http-client.service';
import { Observable, generate } from 'rxjs';
import { Rank, Suit } from '../model/cards.model';
import { GameType, PlayState, Round } from '../model/table.model';
import { Player, PlayerPosition, PlayerStatus } from '../model/player.model';
import { Position } from '../commons/constants/constants';
import { GerenaratePlayerSeatingService } from './gerenarate-player-seating.service';

fdescribe('GameTableService', () => {
  let service: GameTableService;
  let commonServiceSpy: jasmine.SpyObj<CommonService>;
  let gerenaratePlayerSeatingServiceSpy: jasmine.SpyObj<GerenaratePlayerSeatingService>;
  let httpClientSpy: jasmine.SpyObj<HttpClientService>;

  beforeEach(() => {
    commonServiceSpy = jasmine.createSpyObj('CommonService', [
      'createCardStackOfSuit',
      'createDeck',
    ]);
    gerenaratePlayerSeatingServiceSpy = jasmine.createSpyObj(
      'GerenaratePlayerSeatingService',
      ['addPlayer', 'findPlayer', 'toArray', 'size', 'softResetPlayers']
    );
    httpClientSpy = jasmine.createSpyObj('HttpClientService', [
      'getPreflopDecision',
      'getHandCateory',
      'getPostflopDecision',
      'getHandCombination',
    ]);

    service = new GameTableService(
      commonServiceSpy,
      gerenaratePlayerSeatingServiceSpy,
      httpClientSpy
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getHandCombination() method test for success', (done: DoneFn) => {
    const stub = { gameSessionId: 2, handCombinationResult: 'Result' };
    const stubObs = new Observable((sub) => {
      sub.next(stub);
      sub.complete();
    });
    httpClientSpy.getHandCombination.and.returnValue(stubObs);

    service.userCards$ = [
      { suit: Suit.HEART, rank: Rank.ACE },
      { suit: Suit.DIAMOND, rank: Rank.ACE },
    ];
    service.boardCards$ = [{ suit: Suit.SPADE, rank: Rank.ACE }];
    service.getHandCombination().subscribe((value) => {
      expect(value).withContext('Spy value check').toEqual(stub);
    });
    expect(httpClientSpy.getHandCombination.calls.count())
      .withContext('spy method was called once')
      .toBe(1);
    expect(
      httpClientSpy.getHandCombination.calls.mostRecent().returnValue
    ).toBe(stubObs);
    done();
  });

  it('getDecision() method test Preflop', (done: DoneFn) => {
    const stub = { gameSessionId: 2, decisionResult: ['Call'] };
    const stubObs = new Observable((sub) => {
      sub.next(stub);
      sub.complete();
    });
    httpClientSpy.getPreflopDecision.and.returnValue(stubObs);

    service.userCards$ = [
      { suit: Suit.HEART, rank: Rank.ACE },
      { suit: Suit.DIAMOND, rank: Rank.ACE },
    ];

    service.tableRound$ = Round.PREFLOP;
    service.tablePlayState$ = PlayState.NO_RAISE;
    service.tableGameType$ = GameType.LOOSE;
    service.userPlayer$ = new Player(4, PlayerPosition.EARLY);

    service.getDecision().subscribe((val) => {
      expect(val)
        .withContext('Check Stub value Preflop Decision')
        .toEqual(stub);
    });
    expect(httpClientSpy.getPreflopDecision.calls.count())
      .withContext('spy method was called once')
      .toBe(1);
    expect(
      httpClientSpy.getPreflopDecision.calls.mostRecent().returnValue
    ).toBe(stubObs);
    done();
  });

  it('getDecision() method test Postflop', (done: DoneFn) => {
    const stub = { gameSessionId: 2, decisionResult: ['Call'] };
    const stubObs = new Observable((sub) => {
      sub.next(stub);
      sub.complete();
    });
    httpClientSpy.getPostflopDecision.and.returnValue(stubObs);

    service.userCards$ = [
      { suit: Suit.HEART, rank: Rank.ACE },
      { suit: Suit.DIAMOND, rank: Rank.ACE },
    ];
    service.boardCards$ = [{ suit: Suit.SPADE, rank: Rank.ACE }];
    service.tableRound$ = Round.FLOP;
    service.tablePlayState$ = PlayState.NO_RAISE;
    service.tableGameType$ = GameType.LOOSE;
    service.userPlayer$ = new Player(4, PlayerPosition.EARLY);

    service.getDecision().subscribe((val) => {
      expect(val)
        .withContext('Check Stub value Postflop Decision')
        .toEqual(stub);
    });
    expect(httpClientSpy.getPostflopDecision.calls.count())
      .withContext('spy method was called once')
      .toBe(1);
    expect(
      httpClientSpy.getPostflopDecision.calls.mostRecent().returnValue
    ).toBe(stubObs);
    done();
  });

  it('getHandCategory() method test', (done: DoneFn) => {
    const stub = { gameSessionId: 2, decisionResult: ['Result'] };
    const stubObs = new Observable((sub) => {
      sub.next(stub);
      sub.complete();
    });
    httpClientSpy.getHandCateory.and.returnValue(stubObs);

    service.userCards$ = [
      { suit: Suit.HEART, rank: Rank.ACE },
      { suit: Suit.DIAMOND, rank: Rank.ACE },
    ];

    service.getHandCategory().subscribe((val) => {
      expect(val)
        .withContext('Check Stub value HandCategory Decision')
        .toEqual(stub);
    });
    expect(httpClientSpy.getHandCateory.calls.count())
      .withContext('spy method was called once')
      .toBe(1);
    expect(httpClientSpy.getHandCateory.calls.mostRecent().returnValue).toBe(
      stubObs
    );
    done();
  });

  it('getNext() method test 1 player', () => {
    let currentPlayer = new Player(1, PlayerPosition.SMALL_BLIND);
    currentPlayer.nextPlayer = currentPlayer;

    expect(service.getNext(currentPlayer))
      .withContext('Check for 1 player in game')
      .toEqual(null);
  });

  it('getNext() method test fold condition', () => {
    let currentPlayer = new Player(1, PlayerPosition.SMALL_BLIND);
    currentPlayer.nextPlayer = new Player(2, PlayerPosition.BIG_BLIND);
    currentPlayer.nextPlayer.playerStatus = PlayerStatus.FOLD;
    currentPlayer.nextPlayer.nextPlayer = new Player(3, PlayerPosition.EARLY);

    expect(service.getNext(currentPlayer))
      .withContext('Check for fold player in game')
      .toEqual(currentPlayer.nextPlayer.nextPlayer);
  });

  it('getNext() method test regular condition', () => {
    let currentPlayer = new Player(1, PlayerPosition.SMALL_BLIND);
    currentPlayer.nextPlayer = new Player(2, PlayerPosition.BIG_BLIND);
    currentPlayer.nextPlayer.nextPlayer = new Player(3, PlayerPosition.EARLY);

    expect(service.getNext(currentPlayer))
      .withContext('Check for regular player in game')
      .toEqual(currentPlayer.nextPlayer);
  });

  xit('changeCurrentPlayerToNextAndUpdateRound() method test last player === current Player, last round', () => {
    let currentPlayer = new Player(1, PlayerPosition.SMALL_BLIND);
    currentPlayer.nextPlayer = new Player(2, PlayerPosition.BIG_BLIND);
    currentPlayer.nextPlayer.nextPlayer = new Player(3, PlayerPosition.EARLY);
    currentPlayer.nextPlayer.nextPlayer.nextPlayer = currentPlayer;

    service.startPlayer$ = currentPlayer;
    service.currentPlayer$ = currentPlayer.nextPlayer.nextPlayer;

    service.tableRound$ = Round.RIVER;

    expect('2')
      .withContext('Check for last round, need to impl in game')
      .toEqual('1');
  });

  it('changeCurrentPlayerToNextAndUpdateRound() method test last player === current Player, not last round', () => {
    let currentPlayer = new Player(1, PlayerPosition.SMALL_BLIND);
    currentPlayer.nextPlayer = new Player(2, PlayerPosition.BIG_BLIND);
    currentPlayer.nextPlayer.nextPlayer = new Player(3, PlayerPosition.EARLY);
    currentPlayer.nextPlayer.nextPlayer.nextPlayer = currentPlayer;

    service.startPlayer$ = currentPlayer;
    service.tableSmallBlint$ = currentPlayer.nextPlayer;
    service.currentPlayer$ = currentPlayer.nextPlayer.nextPlayer;
    service.totalPlayers$ = 3;

    service.tableRound$ = 0;
    service.tablePlayState$ = 1;
    service.tablePot$ = 10;
    service.tableAnte$ = 1;
    service.tableRunningBet$ = 2;
    service.isFreshRound$ = false;

    gerenaratePlayerSeatingServiceSpy.softResetPlayers.and.returnValue();

    service.changeCurrentPlayerToNextAndUpdateRound();

    expect(service.startPlayer$)
      .withContext('Check startPlayer$')
      .toEqual(currentPlayer.nextPlayer);
    expect(service.currentPlayer$)
      .withContext('Check currentPlayer$')
      .toEqual(currentPlayer.nextPlayer);
    expect(service.tableRound$.valueOf())
      .withContext('Check tableRound$')
      .toEqual(Round.FLOP);
    expect(service.tablePlayState$.valueOf())
      .withContext('Check tablePlayState$')
      .toEqual(PlayState.NO_RAISE);
    expect(service.tablePot$).withContext('Check tablePot$').toEqual(13);
    expect(service.tableRunningBet$)
      .withContext('Check tableRunningBet$')
      .toEqual(0);
    expect(service.isFreshRound$)
      .withContext('Check isFreshRound$')
      .toEqual(true);

    expect(gerenaratePlayerSeatingServiceSpy.softResetPlayers.calls.count())
      .withContext('spy method was called once')
      .toBe(1);
  });

  it('changeCurrentPlayerToNextAndUpdateRound() method test last player === current Player, not last round, small blind fold', () => {
    let currentPlayer = new Player(1, PlayerPosition.SMALL_BLIND);
    currentPlayer.nextPlayer = new Player(2, PlayerPosition.BIG_BLIND);
    currentPlayer.nextPlayer.nextPlayer = new Player(3, PlayerPosition.EARLY);
    currentPlayer.nextPlayer.nextPlayer.nextPlayer = currentPlayer;

    service.startPlayer$ = currentPlayer;
    service.tableSmallBlint$ = currentPlayer.nextPlayer;
    service.tableSmallBlint$.playerStatus = PlayerStatus.FOLD;
    service.currentPlayer$ = currentPlayer.nextPlayer.nextPlayer;
    service.totalPlayers$ = 3;

    service.tableRound$ = 0;
    service.tablePlayState$ = 1;
    service.tablePot$ = 10;
    service.tableAnte$ = 1;
    service.tableRunningBet$ = 2;
    service.isFreshRound$ = false;

    gerenaratePlayerSeatingServiceSpy.softResetPlayers.and.returnValue();

    service.changeCurrentPlayerToNextAndUpdateRound();

    expect(service.startPlayer$)
      .withContext('Check startPlayer$')
      .toEqual(currentPlayer.nextPlayer.nextPlayer);
    expect(service.currentPlayer$)
      .withContext('Check currentPlayer$')
      .toEqual(currentPlayer.nextPlayer.nextPlayer);
    expect(service.tableRound$.valueOf())
      .withContext('Check tableRound$')
      .toEqual(Round.FLOP);
    expect(service.tablePlayState$.valueOf())
      .withContext('Check tablePlayState$')
      .toEqual(PlayState.NO_RAISE);
    expect(service.tablePot$).withContext('Check tablePot$').toEqual(13);
    expect(service.tableRunningBet$)
      .withContext('Check tableRunningBet$')
      .toEqual(0);
    expect(service.isFreshRound$)
      .withContext('Check isFreshRound$')
      .toEqual(true);

    expect(gerenaratePlayerSeatingServiceSpy.softResetPlayers.calls.count())
      .withContext('spy method was called once')
      .toBe(1);
  });

  it('changeCurrentPlayerToNextAndUpdateRound() method test last player === current Player, player change', () => {
    let currentPlayer = new Player(1, PlayerPosition.SMALL_BLIND);
    currentPlayer.nextPlayer = new Player(2, PlayerPosition.BIG_BLIND);
    currentPlayer.nextPlayer.nextPlayer = new Player(3, PlayerPosition.EARLY);
    currentPlayer.nextPlayer.nextPlayer.nextPlayer = currentPlayer;

    service.startPlayer$ = currentPlayer;
    service.tableSmallBlint$ = currentPlayer.nextPlayer;
    service.currentPlayer$ = currentPlayer.nextPlayer;
    service.totalPlayers$ = 3;

    service.tableRound$ = 0;
    service.tablePlayState$ = 1;
    service.tablePot$ = 10;
    service.tableAnte$ = 1;
    service.tableRunningBet$ = 2;
    service.isFreshRound$ = false;

    gerenaratePlayerSeatingServiceSpy.softResetPlayers.and.returnValue();

    service.changeCurrentPlayerToNextAndUpdateRound();

    expect(service.startPlayer$)
      .withContext('Check startPlayer$')
      .toEqual(currentPlayer);
    expect(service.currentPlayer$)
      .withContext('Check currentPlayer$')
      .toEqual(currentPlayer.nextPlayer.nextPlayer);
    expect(service.tableRound$.valueOf())
      .withContext('Check tableRound$')
      .toEqual(Round.PREFLOP);
    expect(service.tablePlayState$.valueOf())
      .withContext('Check tablePlayState$')
      .toEqual(PlayState.RAISE);
    expect(service.tablePot$).withContext('Check tablePot$').toEqual(10);
    expect(service.tableRunningBet$)
      .withContext('Check tableRunningBet$')
      .toEqual(2);
    expect(service.isFreshRound$)
      .withContext('Check isFreshRound$')
      .toEqual(false);

    expect(gerenaratePlayerSeatingServiceSpy.softResetPlayers.calls.count())
      .withContext('spy method was called once')
      .toBe(0);
  });

  it('playerAction() method test, Player status NA', () => {
    let currentPlayer = new Player(1, PlayerPosition.SMALL_BLIND);
    currentPlayer.nextPlayer = new Player(2, PlayerPosition.BIG_BLIND);
    currentPlayer.nextPlayer.nextPlayer = new Player(3, PlayerPosition.EARLY);
    currentPlayer.nextPlayer.nextPlayer.nextPlayer = currentPlayer;

    service.startPlayer$ = currentPlayer;
    service.currentPlayer$ = currentPlayer;
    service.totalPlayers$ = 3;

    service.tableRound$ = 0;
    service.tablePlayState$ = 1;
    service.tablePot$ = 10;
    service.tableAnte$ = 1;
    service.tableRunningBet$ = 2;
    service.isFreshRound$ = false;

    service.playerAction(PlayerStatus.NA);

    expect(service.startPlayer$.playerStatus)
      .withContext('Check startPlayer$')
      .toEqual(PlayerStatus.NA);
    expect(service.currentPlayer$)
      .withContext('Check currentPlayer$')
      .toEqual(currentPlayer.nextPlayer);
    expect(service.tableRound$.valueOf())
      .withContext('Check tableRound$')
      .toEqual(Round.PREFLOP);
    expect(service.tablePlayState$.valueOf())
      .withContext('Check tablePlayState$')
      .toEqual(PlayState.RAISE);
    expect(service.tablePot$).withContext('Check tablePot$').toEqual(10);
    expect(service.tableRunningBet$)
      .withContext('Check tableRunningBet$')
      .toEqual(2);
    expect(service.isFreshRound$)
      .withContext('Check isFreshRound$')
      .toEqual(false);
  });

  it('playerAction() method test, Player status CHECK', () => {
    let currentPlayer = new Player(1, PlayerPosition.SMALL_BLIND);
    currentPlayer.nextPlayer = new Player(2, PlayerPosition.BIG_BLIND);
    currentPlayer.nextPlayer.nextPlayer = new Player(3, PlayerPosition.EARLY);
    currentPlayer.nextPlayer.nextPlayer.nextPlayer = currentPlayer;

    service.startPlayer$ = currentPlayer;
    service.currentPlayer$ = currentPlayer;
    service.totalPlayers$ = 3;

    service.tableRound$ = 0;
    service.tablePlayState$ = 1;
    service.tablePot$ = 10;
    service.tableAnte$ = 1;
    service.tableRunningBet$ = 2;
    service.isFreshRound$ = false;

    service.playerAction(PlayerStatus.CHECK);

    expect(service.startPlayer$.playerStatus)
      .withContext('Check startPlayer$')
      .toEqual(PlayerStatus.CHECK);
    expect(service.currentPlayer$)
      .withContext('Check currentPlayer$')
      .toEqual(currentPlayer.nextPlayer);
    expect(service.tableRound$.valueOf())
      .withContext('Check tableRound$')
      .toEqual(Round.PREFLOP);
    expect(service.tablePlayState$.valueOf())
      .withContext('Check tablePlayState$')
      .toEqual(PlayState.RAISE);
    expect(service.tablePot$).withContext('Check tablePot$').toEqual(10);
    expect(service.tableRunningBet$)
      .withContext('Check tableRunningBet$')
      .toEqual(2);
    expect(service.isFreshRound$)
      .withContext('Check isFreshRound$')
      .toEqual(false);
  });

  it('playerAction() method test, Player status BET', () => {
    let currentPlayer = new Player(1, PlayerPosition.SMALL_BLIND);
    currentPlayer.nextPlayer = new Player(2, PlayerPosition.BIG_BLIND);
    currentPlayer.nextPlayer.nextPlayer = new Player(3, PlayerPosition.EARLY);
    currentPlayer.nextPlayer.nextPlayer.nextPlayer = currentPlayer;

    service.startPlayer$ = currentPlayer.nextPlayer;
    service.currentPlayer$ = currentPlayer;
    service.totalPlayers$ = 3;

    service.tableRound$ = 0;
    service.tablePlayState$ = 1;
    service.tablePot$ = 10;
    service.tableAnte$ = 1;
    service.tableRunningBet$ = 0;
    service.isFreshRound$ = true;

    service.playerAction(PlayerStatus.BET, 3);

    expect(service.startPlayer$.playerStatus)
      .withContext('Check playerStatus')
      .toEqual(PlayerStatus.BET);
    expect(service.startPlayer$.playerBet)
      .withContext('Check playerBet')
      .toEqual(3);
    expect(service.startPlayer$)
      .withContext('Check startPlayer$')
      .toEqual(currentPlayer);
    expect(service.currentPlayer$)
      .withContext('Check currentPlayer$')
      .toEqual(currentPlayer.nextPlayer);
    expect(service.tableRound$.valueOf())
      .withContext('Check tableRound$')
      .toEqual(Round.PREFLOP);
    expect(service.tablePlayState$.valueOf())
      .withContext('Check tablePlayState$')
      .toEqual(PlayState.RAISE);
    expect(service.tablePot$).withContext('Check tablePot$').toEqual(13);
    expect(service.tableRunningBet$)
      .withContext('Check tableRunningBet$')
      .toEqual(3);
    expect(service.isFreshRound$)
      .withContext('Check isFreshRound$')
      .toEqual(false);
  });

  it('playerAction() method test, Player status CALL', () => {
    let currentPlayer = new Player(1, PlayerPosition.SMALL_BLIND);
    currentPlayer.nextPlayer = new Player(2, PlayerPosition.BIG_BLIND);
    currentPlayer.nextPlayer.nextPlayer = new Player(3, PlayerPosition.EARLY);
    currentPlayer.nextPlayer.nextPlayer.nextPlayer = currentPlayer;

    service.startPlayer$ = currentPlayer;
    service.currentPlayer$ = currentPlayer;
    service.totalPlayers$ = 3;

    service.tableRound$ = 0;
    service.tablePlayState$ = 1;
    service.tablePot$ = 10;
    service.tableAnte$ = 1;
    service.tableRunningBet$ = 3;
    service.isFreshRound$ = false;

    service.playerAction(PlayerStatus.CALL);

    expect(service.startPlayer$.playerStatus)
      .withContext('Check playerStatus')
      .toEqual(PlayerStatus.CALL);
    expect(service.startPlayer$.playerBet)
      .withContext('Check playerBet')
      .toEqual(3);
    expect(service.currentPlayer$)
      .withContext('Check currentPlayer$')
      .toEqual(currentPlayer.nextPlayer);
    expect(service.tableRound$.valueOf())
      .withContext('Check tableRound$')
      .toEqual(Round.PREFLOP);
    expect(service.tablePlayState$.valueOf())
      .withContext('Check tablePlayState$')
      .toEqual(PlayState.RAISE);
    expect(service.tablePot$).withContext('Check tablePot$').toEqual(13);
    expect(service.tableRunningBet$)
      .withContext('Check tableRunningBet$')
      .toEqual(3);
    expect(service.isFreshRound$)
      .withContext('Check isFreshRound$')
      .toEqual(false);
  });

  it('playerAction() method test, Player status RAISE', () => {
    let currentPlayer = new Player(1, PlayerPosition.SMALL_BLIND);
    currentPlayer.nextPlayer = new Player(2, PlayerPosition.BIG_BLIND);
    currentPlayer.nextPlayer.nextPlayer = new Player(3, PlayerPosition.EARLY);
    currentPlayer.nextPlayer.nextPlayer.nextPlayer = currentPlayer;

    service.startPlayer$ = currentPlayer;
    service.currentPlayer$ = currentPlayer.nextPlayer;
    service.totalPlayers$ = 3;

    service.tableRound$ = 0;
    service.tablePlayState$ = 1;
    service.tablePot$ = 10;
    service.tableAnte$ = 1;
    service.tableRunningBet$ = 3;
    service.isFreshRound$ = false;

    service.playerAction(PlayerStatus.RAISE, 3);

    expect(service.startPlayer$.playerStatus)
      .withContext('Check playerStatus')
      .toEqual(PlayerStatus.RAISE);
    expect(service.startPlayer$.playerBet)
      .withContext('Check playerBet')
      .toEqual(6);
    expect(service.startPlayer$)
      .withContext('Check startPlayer$')
      .toEqual(currentPlayer.nextPlayer);
    expect(service.currentPlayer$)
      .withContext('Check currentPlayer$')
      .toEqual(currentPlayer.nextPlayer.nextPlayer);
    expect(service.tableRound$.valueOf())
      .withContext('Check tableRound$')
      .toEqual(Round.PREFLOP);
    expect(service.tablePlayState$.valueOf())
      .withContext('Check tablePlayState$')
      .toEqual(PlayState.RE_RAISE);
    expect(service.tablePot$).withContext('Check tablePot$').toEqual(16);
    expect(service.tableRunningBet$)
      .withContext('Check tableRunningBet$')
      .toEqual(6);
    expect(service.isFreshRound$)
      .withContext('Check isFreshRound$')
      .toEqual(false);
  });

  it('playerAction() method test, Player status FOLD', () => {
    let currentPlayer = new Player(1, PlayerPosition.SMALL_BLIND);
    currentPlayer.nextPlayer = new Player(2, PlayerPosition.BIG_BLIND);
    currentPlayer.nextPlayer.nextPlayer = new Player(3, PlayerPosition.EARLY);
    currentPlayer.nextPlayer.nextPlayer.nextPlayer = currentPlayer;

    service.startPlayer$ = currentPlayer;
    service.currentPlayer$ = currentPlayer;
    service.totalPlayers$ = 3;

    service.tableRound$ = 0;
    service.tablePlayState$ = 1;
    service.tablePot$ = 10;
    service.tableAnte$ = 1;
    service.tableRunningBet$ = 2;
    service.isFreshRound$ = false;

    service.playerAction(PlayerStatus.FOLD);

    expect(service.startPlayer$.playerStatus)
      .withContext('Check startPlayer$')
      .toEqual(PlayerStatus.FOLD);
    expect(service.currentPlayer$)
      .withContext('Check currentPlayer$')
      .toEqual(currentPlayer.nextPlayer);
    expect(service.tableRound$.valueOf())
      .withContext('Check tableRound$')
      .toEqual(Round.PREFLOP);
    expect(service.tablePlayState$.valueOf())
      .withContext('Check tablePlayState$')
      .toEqual(PlayState.RAISE);
    expect(service.tablePot$).withContext('Check tablePot$').toEqual(10);
    expect(service.tableRunningBet$)
      .withContext('Check tableRunningBet$')
      .toEqual(2);
    expect(service.totalPlayers$)
      .withContext('Check tableRunningBet$')
      .toEqual(2);
    expect(service.isFreshRound$)
      .withContext('Check isFreshRound$')
      .toEqual(false);
  });

  it('createTable() method test Tight game', () => {
    let gameData = {
      profileName: 'profile 1',
      websiteName: 'pokerfriend.com',
      tableSeats: 3,
      anteAmount: 1,
      smallBet: 1,
      bigBet: 2,
    };

    let userData = { userPosition: 2 };

    let demPlayer = new Player(1, PlayerPosition.SMALL_BLIND);
    demPlayer.nextPlayer = new Player(2, PlayerPosition.BIG_BLIND);
    demPlayer.nextPlayer.nextPlayer = new Player(3, PlayerPosition.EARLY);
    demPlayer.nextPlayer.nextPlayer.nextPlayer = demPlayer;

    gerenaratePlayerSeatingServiceSpy.addPlayer.and.returnValue();
    gerenaratePlayerSeatingServiceSpy.head = demPlayer;
    gerenaratePlayerSeatingServiceSpy.findPlayer.and.returnValue(
      demPlayer.nextPlayer
    );
    let metaCardArray = [
      { url: 'hil', card: { suit: Suit.CLUB, rank: Rank.ACE } },
    ];
    commonServiceSpy.createDeck.and.returnValue(metaCardArray);
    let tabArray = [
      new Player(1, PlayerPosition.SMALL_BLIND),
      new Player(2, PlayerPosition.BIG_BLIND),
      new Player(3, PlayerPosition.EARLY),
    ];
    gerenaratePlayerSeatingServiceSpy.toArray.and.returnValue(tabArray);

    service.createTable(gameData, userData);

    expect(service.startPlayer$!.playerStatus)
      .withContext('Check playerStatus')
      .toEqual(PlayerStatus.NA);
    expect(service.startPlayer$!.playerBet)
      .withContext('Check playerBet')
      .toEqual(0);
    expect(service.startPlayer$)
      .withContext('Check startPlayer$')
      .toEqual(demPlayer.nextPlayer.nextPlayer);
    expect(service.tableSmallBlint$)
      .withContext('Check tableSmallBlint$')
      .toEqual(demPlayer);
    expect(service.userPlayer$)
      .withContext('Check userPlayer$')
      .toEqual(demPlayer.nextPlayer);
    expect(service.tablePlayers$)
      .withContext('Check tablePlayers$')
      .toEqual(tabArray);
    expect(service.currentPlayer$)
      .withContext('Check currentPlayer$')
      .toEqual(demPlayer.nextPlayer.nextPlayer);
    expect(service.totalPlayers$).withContext('Check totalPlayers').toEqual(3);
    expect(service.tableAnte$).withContext('Check tableAnte').toEqual(1);
    expect(service.smallBet$).withContext('Check smallBet').toEqual(1);
    expect(service.bigBet$).withContext('Check bigBet').toEqual(2);
    expect(service.userPositon$).withContext('Check userPositon').toEqual(2);
    expect(service.tableDeck$)
      .withContext('Check tableDeck')
      .toEqual(metaCardArray);
    expect(service.tableRound$.valueOf())
      .withContext('Check tableRound$')
      .toEqual(Round.PREFLOP);
    expect(service.tablePlayState$.valueOf())
      .withContext('Check tablePlayState$')
      .toEqual(PlayState.NO_RAISE);
    expect(service.tablePot$).withContext('Check tablePot$').toEqual(6);
    expect(service.tableRunningBet$)
      .withContext('Check tableRunningBet$')
      .toEqual(2);
    expect(service.isFreshRound$)
      .withContext('Check isFreshRound$')
      .toEqual(false);
    expect(service.tableGameType$)
      .withContext('Check tableGameType')
      .toEqual(GameType.TIGHT);

    expect(gerenaratePlayerSeatingServiceSpy.addPlayer.calls.count())
      .withContext('generatePlayerService addPlayer Call count')
      .toEqual(3);
    // expect(gerenaratePlayerSeatingServiceSpy.head)
    // .withContext('generatePlayerService findPlayer Call count')
    // .toEqual(1);
    expect(gerenaratePlayerSeatingServiceSpy.findPlayer.calls.count())
      .withContext('generatePlayerService findPlayer Call count')
      .toEqual(1);
    expect(
      gerenaratePlayerSeatingServiceSpy.findPlayer.calls.mostRecent()
        .returnValue
    )
      .withContext('generatePlayerService findPlayer Return Value')
      .toEqual(demPlayer.nextPlayer);
    expect(commonServiceSpy.createDeck.calls.count())
      .withContext('commonServiceSpy createDeck Call count')
      .toEqual(1);
    expect(commonServiceSpy.createDeck.calls.mostRecent().returnValue)
      .withContext('commonServiceSpy createDeck Return Value')
      .toEqual(metaCardArray);

    expect(gerenaratePlayerSeatingServiceSpy.toArray.calls.count())
      .withContext('generatePlayerService toArray Call count')
      .toEqual(1);
    expect(
      gerenaratePlayerSeatingServiceSpy.toArray.calls.mostRecent().returnValue
    )
      .withContext('generatePlayerService toArray Return Value')
      .toEqual(tabArray);
  });

  it('createTable() method test Tight game', () => {
    let gameData = {
      profileName: 'profile 1',
      websiteName: 'pokerfriend.com',
      tableSeats: 7,
      anteAmount: 1,
      smallBet: 1,
      bigBet: 2,
    };

    let userData = { userPosition: 2 };

    let demPlayer = new Player(1, PlayerPosition.SMALL_BLIND);
    demPlayer.nextPlayer = new Player(2, PlayerPosition.BIG_BLIND);
    demPlayer.nextPlayer.nextPlayer = new Player(3, PlayerPosition.EARLY);
    demPlayer.nextPlayer.nextPlayer.nextPlayer = demPlayer;

    gerenaratePlayerSeatingServiceSpy.addPlayer.and.returnValue();
    gerenaratePlayerSeatingServiceSpy.head = demPlayer;
    gerenaratePlayerSeatingServiceSpy.findPlayer.and.returnValue(
      demPlayer.nextPlayer
    );
    let metaCardArray = [
      { url: 'hil', card: { suit: Suit.CLUB, rank: Rank.ACE } },
    ];
    commonServiceSpy.createDeck.and.returnValue(metaCardArray);
    let tabArray = [
      new Player(1, PlayerPosition.SMALL_BLIND),
      new Player(2, PlayerPosition.BIG_BLIND),
      new Player(3, PlayerPosition.EARLY),
    ];
    gerenaratePlayerSeatingServiceSpy.toArray.and.returnValue(tabArray);

    service.createTable(gameData, userData);

    expect(service.startPlayer$!.playerStatus)
      .withContext('Check playerStatus')
      .toEqual(PlayerStatus.NA);
    expect(service.startPlayer$!.playerBet)
      .withContext('Check playerBet')
      .toEqual(0);
    expect(service.startPlayer$)
      .withContext('Check startPlayer$')
      .toEqual(demPlayer.nextPlayer.nextPlayer);
    expect(service.tableSmallBlint$)
      .withContext('Check tableSmallBlint$')
      .toEqual(demPlayer);
    expect(service.userPlayer$)
      .withContext('Check userPlayer$')
      .toEqual(demPlayer.nextPlayer);
    expect(service.tablePlayers$)
      .withContext('Check tablePlayers$')
      .toEqual(tabArray);
    expect(service.currentPlayer$)
      .withContext('Check currentPlayer$')
      .toEqual(demPlayer.nextPlayer.nextPlayer);
    expect(service.totalPlayers$).withContext('Check totalPlayers').toEqual(7);
    expect(service.tableAnte$).withContext('Check tableAnte').toEqual(1);
    expect(service.smallBet$).withContext('Check smallBet').toEqual(1);
    expect(service.bigBet$).withContext('Check bigBet').toEqual(2);
    expect(service.userPositon$).withContext('Check userPositon').toEqual(2);
    expect(service.tableDeck$)
      .withContext('Check tableDeck')
      .toEqual(metaCardArray);
    expect(service.tableRound$.valueOf())
      .withContext('Check tableRound$')
      .toEqual(Round.PREFLOP);
    expect(service.tablePlayState$.valueOf())
      .withContext('Check tablePlayState$')
      .toEqual(PlayState.NO_RAISE);
    expect(service.tablePot$).withContext('Check tablePot$').toEqual(10);
    expect(service.tableRunningBet$)
      .withContext('Check tableRunningBet$')
      .toEqual(2);
    expect(service.isFreshRound$)
      .withContext('Check isFreshRound$')
      .toEqual(false);
    expect(service.tableGameType$)
      .withContext('Check tableGameType')
      .toEqual(GameType.LOOSE);

    expect(gerenaratePlayerSeatingServiceSpy.addPlayer.calls.count())
      .withContext('generatePlayerService addPlayer Call count')
      .toEqual(7);
    // expect(gerenaratePlayerSeatingServiceSpy.head)
    // .withContext('generatePlayerService findPlayer Call count')
    // .toEqual(1);
    expect(gerenaratePlayerSeatingServiceSpy.findPlayer.calls.count())
      .withContext('generatePlayerService findPlayer Call count')
      .toEqual(1);
    expect(
      gerenaratePlayerSeatingServiceSpy.findPlayer.calls.mostRecent()
        .returnValue
    )
      .withContext('generatePlayerService findPlayer Return Value')
      .toEqual(demPlayer.nextPlayer);
    expect(commonServiceSpy.createDeck.calls.count())
      .withContext('commonServiceSpy createDeck Call count')
      .toEqual(1);
    expect(commonServiceSpy.createDeck.calls.mostRecent().returnValue)
      .withContext('commonServiceSpy createDeck Return Value')
      .toEqual(metaCardArray);

    expect(gerenaratePlayerSeatingServiceSpy.toArray.calls.count())
      .withContext('generatePlayerService toArray Call count')
      .toEqual(1);
    expect(
      gerenaratePlayerSeatingServiceSpy.toArray.calls.mostRecent().returnValue
    )
      .withContext('generatePlayerService toArray Return Value')
      .toEqual(tabArray);
  });
});
