import { Card } from "./cards.model";

export class Player{
    playerNumber: number;
    playerPosition: PlayerPosition;
    playerStatus: PlayerStatus;
    nextPlayer: Player | null;

    constructor(playerNumber: number, playerPosition: PlayerPosition){
        this.playerPosition = playerPosition;
        this.playerNumber = playerNumber;
        this.nextPlayer = null;
        this.playerStatus = PlayerStatus.NA;
    }

}

export enum PlayerPosition{
    SMALL_BLIND = "SMALL BLIND",
    BIG_BLIND = "BIG BLIND",
    EARLY = "EARLY",
    MIDDLE = "MIDDLE",
    LATE = "LATE"
}

export enum PlayerStatus{
    NA ="NA",
    CALL ="CALL",
    BET ="BET",
    RAISE="RAISE",
    CHECK="CHECK",
    FOLD="FOLD"
}