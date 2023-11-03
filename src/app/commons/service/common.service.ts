import { Injectable } from '@angular/core';
import { MetaCard, Rank, Suit } from 'src/app/model/cards.model';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor() {}

  createCardStackOfSuit(suit: Suit): MetaCard[] {
    let rank = Object.values(Rank).filter((x) => !isNaN(Number(x)));
    let deck: MetaCard[] = [];

    rank.forEach((r) => {
      deck.push({
        url:
          "url('./assets/img/card_faces/" +
          Suit[suit as Suit].toLowerCase() +
          's_' +
          r +
          ".svg')",
        card: {
          rank: r as Rank,
          suit: suit,
        },
      });
    });

    return deck;
  }

  /**
   * Creats the card deck, expects no argument.
   * @returns deck of MetaCards[] which contains all card in the deck
   */
  createDeck(): Array<MetaCard> {
    let deck: MetaCard[] = [];

    deck.concat(this.createCardStackOfSuit(Suit.HEART));
    deck.concat(this.createCardStackOfSuit(Suit.DIAMOND));
    deck.concat(this.createCardStackOfSuit(Suit.CLUB));
    deck.concat(this.createCardStackOfSuit(Suit.SPADE));

    return deck;
  }
}
