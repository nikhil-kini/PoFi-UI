import { Injectable } from '@angular/core';
import { Player, PlayerStatus } from '../model/player.model';
import { Card, MetaCard, Rank, Suit } from '../model/cards.model';
import { CommonService } from '../commons/service/common.service';
import { GerenaratePlayerSeatingService } from './gerenarate-player-seating.service';
import { Position } from '../commons/constants/constants';
import { GameType, PlayState, Round } from '../model/table.model';
import { Observable } from 'rxjs';
import { HttpClientService } from './http-client.service';
import {
  GameStartDetails,
  GameStartInfoService,
  UserDetails,
} from './game-start-info.service';

@Injectable({
  providedIn: 'root',
})
export class GameTableService {
  currentPlayer$!: Player | null;
  userPlayer$!: Player | null;
  tableSmallBlint$!: Player | null;
  startPlayer$!: Player | null;
  tableDeck$!: MetaCard[];
  tablePlayers$!: Array<Player | null | undefined>;
  tableRound$!: Round;
  boardCards$!: Card[];
  userCards$!: Card[];
  tablePlayState$!: PlayState;
  tableGameType$!: GameType;
  tablePot$!: number;
  tableRunningBet$!: number;
  isFreshRound$!: boolean;

  totalPlayers$!: number;
  tableAnte$!: number;
  smallBet$!: number;
  bigBet$!: number;
  userPositon$!: number;

  constructor(
    private commonService: CommonService,
    private gerenaratePlayerSeatingService: GerenaratePlayerSeatingService,
    private httpClient: HttpClientService,
    private gameStartInfoService: GameStartInfoService
  ) {}

  /**
   *
   * @param totalPlayers Total player seats in the game
   *
   */
  createTable(gameStartData: GameStartDetails, gameUserInfoData: UserDetails) {
    this.totalPlayers$ = gameStartData.tableSeats;
    this.tableAnte$ = gameStartData.anteAmount;
    this.smallBet$ = Number(gameStartData.smallBet);
    this.bigBet$ = Number(gameStartData.bigBet);

    this.userPositon$ = gameUserInfoData.userPosition;

    let playerPosition = Position.PLAYER_POSITION[this.totalPlayers$];

    for (let index = 1; index <= this.totalPlayers$; index++) {
      this.gerenaratePlayerSeatingService.addPlayer(
        index,
        playerPosition[index - 1]
      );
      console.log('player added');
      console.log(this.gerenaratePlayerSeatingService);
    }

    this.startPlayer$ = this.gerenaratePlayerSeatingService.head;
    this.tableSmallBlint$ = this.startPlayer$;
    this.userPlayer$ = this.gerenaratePlayerSeatingService.findPlayer(
      this.userPositon$
    );
    this.tablePlayers$ = this.gerenaratePlayerSeatingService.toArray(
      this.userPlayer$
    );

    this.isFreshRound$ = false;
    this.currentPlayer$ = this.startPlayer$;
    this.currentPlayer$!.playerBet = this.smallBet$;
    this.currentPlayer$ = this.getNext(this.currentPlayer$!);
    this.currentPlayer$!.playerBet = this.bigBet$;
    this.currentPlayer$ = this.getNext(this.currentPlayer$!);
    this.tableRunningBet$ = this.bigBet$;
    this.startPlayer$ = this.currentPlayer$;
    this.tablePot$ =
      this.bigBet$ + this.smallBet$ + this.tableAnte$ * this.totalPlayers$;

    this.tableDeck$ = this.commonService.createDeck();
    this.tableRound$ = 0;
    this.tablePlayState$ = 0;
    if (this.gerenaratePlayerSeatingService.size() <= 5) {
      this.tableGameType$ = GameType.TIGHT;
    } else {
      this.tableGameType$ = GameType.LOOSE;
    }
  }

  /**
   *
   * @param playerStatus palyer status to be updated for current player.
   */
  playerAction(playerStatus: PlayerStatus, addAmount?: number) {
    this.currentPlayer$!.playerStatus = playerStatus;
    switch (playerStatus) {
      case PlayerStatus.NA:
        break;
      case PlayerStatus.CHECK:
        break;
      case PlayerStatus.BET:
        this.tableRunningBet$ = addAmount!;
        this.tablePot$ += addAmount!;
        this.currentPlayer$!.playerBet = this.tableRunningBet$;
        this.isFreshRound$ = false;
        this.startPlayer$ = this.currentPlayer$;
        break;
      case PlayerStatus.CALL:
        let diff = this.tableRunningBet$ - this.currentPlayer$!.playerBet;
        this.tablePot$ += diff;
        this.currentPlayer$!.playerBet = this.tableRunningBet$;
        break;
      case PlayerStatus.RAISE:
        if (this.tablePlayState$ < 2) this.tablePlayState$ += 1;
        this.startPlayer$ = this.currentPlayer$;
        this.tableRunningBet$ += addAmount!;
        this.tablePot$ += this.tableRunningBet$;
        this.currentPlayer$!.playerBet = this.tableRunningBet$;
        break;
      case PlayerStatus.FOLD:
        this.totalPlayers$ -= 1;
        break;
    }

    this.changeCurrentPlayerToNextAndUpdateRound();
  }

  changeCurrentPlayerToNextAndUpdateRound() {
    if (this.currentPlayer$?.nextPlayer === this.startPlayer$) {
      if (this.tableRound$ === Round.RIVER.valueOf()) {
        //Impl logic
        alert('Game end');
      } else {
        this.tableRound$ += 1;
        this.tablePlayState$ = 0;
        this.currentPlayer$ =
          this.tableSmallBlint$?.playerStatus === PlayerStatus.FOLD
            ? this.getNext(this.tableSmallBlint$)
            : this.tableSmallBlint$;
        this.startPlayer$ = this.currentPlayer$;
        this.tablePot$ += this.tableAnte$ * this.totalPlayers$;
        this.tableRunningBet$ = 0;
        this.gerenaratePlayerSeatingService.softResetPlayers();
        this.isFreshRound$ = true;
      }
    } else {
      this.currentPlayer$ = this.getNext(this.currentPlayer$!);
    }
  }

  /**
   * getNext(Player) gives the next player who is not FOLDED.
   * @param currentPlayer current player in the game
   * @returns the next player whose Player Status is not FOLD
   */
  getNext(currentPlayer: Player): Player | null {
    let nextPlayer = currentPlayer.nextPlayer;
    if (currentPlayer === nextPlayer) return null;

    if (nextPlayer?.playerStatus === PlayerStatus.FOLD)
      nextPlayer = this.getNext(nextPlayer);

    return nextPlayer;
  }

  getHandCategory(): Observable<any> {
    return this.httpClient.getHandCateory({
      gameSessionId: 2,
      userCards: this.userCards$.map((value) => {
        return { suit: Suit[value.suit], rank: Rank[value.rank] };
      }),
    });
  }

  getDecision(): Observable<any> {
    if (this.tableRound$ < 1) {
      return this.httpClient.getPreflopDecision({
        gameSessionId: 2,
        userCards: this.userCards$.map((value) => {
          return { suit: Suit[value.suit], rank: Rank[value.rank] };
        }),
        againstPlay: PlayState[this.tablePlayState$],
        gameType: GameType[this.tableGameType$],
        gamePosition: this.userPlayer$?.playerPosition,
      });
    } else {
      return this.httpClient.getPostflopDecision({
        gameSessionId: 2,
        userCards: this.userCards$.map((value) => {
          return { suit: Suit[value.suit], rank: Rank[value.rank] };
        }),
        boardCards: this.boardCards$.map((value) => {
          return { suit: Suit[value.suit], rank: Rank[value.rank] };
        }),
        gameLevel: Round[this.tableRound$],
        potValue: this.tablePot$,
        betValue: this.tableRunningBet$,
      });
    }
  }

  getHandCombination(): Observable<any> {
    return this.httpClient.getHandCombination({
      gameSessionId: 2,
      userCards: this.userCards$.map((value) => {
        return { suit: Suit[value.suit], rank: Rank[value.rank] };
      }),
      boardCards: this.boardCards$
        ? this.boardCards$.map((value) => {
            return { suit: Suit[value.suit], rank: Rank[value.rank] };
          })
        : [],
      gameLevel: Round[this.tableRound$],
    });
  }
}
