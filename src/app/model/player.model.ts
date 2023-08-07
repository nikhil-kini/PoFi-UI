import { Card } from "./cards.model";

export class Player{
    playerNumber: number;
    playerPosition: PlayerPosition | undefined;
    nextPlayer: Player | null;

    constructor(playerNumber: number){
        this.playerNumber = playerNumber;
        this.nextPlayer = null;
    }

}

export enum PlayerPosition{
    SMALL_BLIND,
    BIG_BLIND,
    EARLY,
    MIDDLE,
    LATE
}