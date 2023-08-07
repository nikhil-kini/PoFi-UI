export interface GameTable{
    gameRound: number;
    potValue: number;
    currentBetOnTable: number;
    gameType: GameType;
    playState: PlayState;
}

export interface GameStartDetails{
    profileName: string;
    websiteName: string;
    tableSeats: number;
    anteAmount: number;
    smallBet: number;
    bigBet: number;
}

export enum GameType{
    TIGHT,
    LOOSE
}

export enum PlayState{
    NO_RAISE,
    RAISE,
    RE_RAISE
}