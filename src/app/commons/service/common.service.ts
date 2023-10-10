import { Injectable } from '@angular/core';
import { MetaCard, Rank, Suit } from 'src/app/model/cards.model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  createCardStackOfSuit(suit: Suit): MetaCard[]{
    let rank = Object.values(Rank).filter(x => !isNaN(Number(x)));
    let deck: MetaCard[] = [];

    rank.forEach(r => {
      deck.push({url: "url('./assets/img/card_faces/" + Suit[suit as Suit].toLowerCase() + "s_" + r + ".svg')",
      card: {
        rank: r as Rank,
        suit: suit
        }
      })
    });

    return deck;
  }
}
