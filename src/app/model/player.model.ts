import { Card } from "./cards.model";

export class Player{
    playerNumber: number;
    playerCards: Array<Card> | undefined;
    playerPosition: PlayerPosition | undefined;
    nextPlayer: Player | null;

    constructor(playerNumber: number){
        this.playerNumber = playerNumber;
        this.nextPlayer = null;
    }

}

export enum PlayerPosition{
    SMALL_BLIND = 1,
    BIG_BLIND = 2,
    EARLY = 3,
    MIDDLE = 4,
    LATE = 5
}