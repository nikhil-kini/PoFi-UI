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
    this.smallBet$ = gameStartData.smallBet;
    this.bigBet$ = gameStartData.bigBet;

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

    //current player Impl
    this.currentPlayer$ = this.startPlayer$;
    this.currentPlayer$!.playerBet = this.smallBet$;
    this.currentPlayer$ = this.getNext(this.currentPlayer$!);
    this.currentPlayer$!.playerBet = this.bigBet$;
    this.currentPlayer$ = this.getNext(this.currentPlayer$!);

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
  playerAction(playerStatus: PlayerStatus) {
    this.currentPlayer$!.playerStatus = playerStatus;
    if (playerStatus === PlayerStatus.RAISE) {
      this.startPlayer$ = this.currentPlayer$;
    }
    this.changeCurrentPlayerToNextAndUpdateRound();
  }

  changeCurrentPlayerToNextAndUpdateRound() {
    if (this.currentPlayer$?.nextPlayer === this.startPlayer$) {
      if (this.tableRound$ === Round.RIVER.valueOf()) {
        //Impl logic
        console.log('GAME END');
      } else {
        this.tableRound$ += 1;
        this.tablePlayState$ = 0;
        this.currentPlayer$ = this.tableSmallBlint$;
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
        potValue: 152,
        betValue: 10,
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
