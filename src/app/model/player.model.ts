import { Card } from "./cards.model";

export interface Player{
    playerNumber: number;
    playerCards: Array<Card>;
    nextPlayer: Player;
}