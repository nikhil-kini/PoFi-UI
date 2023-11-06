export interface GameTable {
  gameRound: number;
  potValue: number;
  currentBetOnTable: number;
  gameType: GameType;
  playState: PlayState;
}

export enum GameType {
  TIGHT,
  LOOSE,
}

export enum PlayState {
  NO_RAISE,
  RAISE,
  RE_RAISE,
}

export enum Round {
  PREFLOP,
  FLOP,
  TURN,
  RIVER,
}
