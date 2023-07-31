import { Card } from "./cards.model";

export interface Player{
    playerNumber: number;
    playerCards: Array<Card>;
    playerPosition: PlayerPosition;
    nextPlayer: Player;
}

export enum PlayerPosition{
    SMALL_BLIND = 1,
    BIG_BLIND = 2,
    EARLY = 3,
    MIDDLE = 4,
    LATE = 5
}