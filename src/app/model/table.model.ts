export interface GameTable{
    gameRound: number;
    potValue: number;
    currentBetOnTable: number;
    gameType: GameType;
    playState: PlayState;
}

export enum GameType{
    TIGHT = 1,
    LOOSE = 2
}

export enum PlayState{
    NO_RAISE = 1,
    RAISE = 2,
    RE_RAISE = 3
}