import { Card } from './cards.model';

export class Player {
  playerNumber: number;
  playerPosition: PlayerPosition;
  playerStatus: PlayerStatus;
  nextPlayer: Player | null;
  playerBet: number;

  constructor(playerNumber: number, playerPosition: PlayerPosition) {
    this.playerPosition = playerPosition;
    this.playerNumber = playerNumber;
    this.nextPlayer = null;
    this.playerStatus = PlayerStatus.NA;
    this.playerBet = 0;
  }
}

export enum PlayerPosition {
  SMALL_BLIND = 'SMALL_BLIND',
  BIG_BLIND = 'BIG_BLIND',
  EARLY = 'EARLY',
  MIDDLE = 'MIDDLE',
  LATE = 'LATE',
}

export enum PlayerStatus {
  NA = 'NA',
  CALL = 'CALL',
  BET = 'BET',
  RAISE = 'RAISE',
  CHECK = 'CHECK',
  FOLD = 'FOLD',
}
