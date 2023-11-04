import { Injectable } from '@angular/core';
import { Player, PlayerStatus } from '../model/player.model';
import { MetaCard } from '../model/cards.model';
import { CommonService } from '../commons/service/common.service';
import { GerenaratePlayerSeatingService } from './gerenarate-player-seating.service';
import { Position } from '../commons/constants/constants';
import { Round } from '../model/table.model';

@Injectable({
  providedIn: 'root',
})
export class GameTableService {
  currentPlayer$!: Player | null;
  userPlayer$!: Player | null;
  startPlayer$!: Player | null;
  tableDeck$!: MetaCard[];
  tablePlayers$!: Array<Player | null | undefined>;
  tableRound$!: Round;

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
    this.tableRound$ = 0;
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
      }
    }
    this.currentPlayer$ = this.getNext(this.currentPlayer$!);
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
