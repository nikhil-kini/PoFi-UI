import { Injectable } from '@angular/core';
import { Player, PlayerStatus } from '../model/player.model';
import { MetaCard, Rank, Suit } from '../model/cards.model';
import { CommonService } from '../commons/service/common.service';
import { GerenaratePlayerSeatingService } from './gerenarate-player-seating.service';
import { Position } from '../commons/constants/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameTableService {
  currentPlayer$!: Player | null;
  userPlayer$!: Player | null;
  startPlayer$!: Player | null;
  tableDeck$!: MetaCard[];
  tablePlayers$!: Array<Player | null | undefined>;

  observerCurrentPlayer$: Observable<Player> = new Observable();

  constructor(
    private commonService: CommonService,
    private gerenaratePlayerSeatingService: GerenaratePlayerSeatingService
  ) {}

  /**
   *
   * @param totalPlayers Total player seats in the game
   *
   */
  createTable(totalPlayers: number, userPositon: number) {
    let playerPosition = Position.PLAYER_POSITION[totalPlayers];

    for (let index = 1; index <= totalPlayers; index++) {
      this.gerenaratePlayerSeatingService.addPlayer(
        index,
        playerPosition[index - 1]
      );
      console.log('player added');
      console.log(this.gerenaratePlayerSeatingService);
    }

    this.startPlayer$ = this.gerenaratePlayerSeatingService.head;
    this.userPlayer$ =
      this.gerenaratePlayerSeatingService.findPlayer(userPositon);
    this.tablePlayers$ = this.gerenaratePlayerSeatingService.toArray(
      this.userPlayer$
    );

    //current player Impl
    this.currentPlayer$ = this.startPlayer$;

    this.tableDeck$ = this.commonService.createDeck();
  }

  /**
   *
   * @param playerStatus palyer status to be updated for current player.
   */
  playerAction(playerStatus: PlayerStatus) {
    this.currentPlayer$!.playerStatus = playerStatus;
    this.currentPlayer$ = this.getNext(this.currentPlayer$!);
    console.log(this.currentPlayer$);
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
}
