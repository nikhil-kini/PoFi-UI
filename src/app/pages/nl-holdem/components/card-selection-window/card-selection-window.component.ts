import { Component } from '@angular/core';
import { CommonService } from 'src/app/commons/service/common.service';
import { MetaCard, Suit } from 'src/app/model/cards.model';

@Component({
  selector: 'pofri-card-selection-window',
  templateUrl: './card-selection-window.component.html',
  styleUrls: ['./card-selection-window.component.scss']
})
export class CardSelectionWindowComponent{
  heartCard: MetaCard[] | undefined;
  spadeCard: MetaCard[] | undefined;
  clubCard: MetaCard[] | undefined;
  diamondCard: MetaCard[] | undefined;

  constructor(private commonService: CommonService){

  }

  ngOnInit(){
    this.heartCard = this.commonService.createCardStackOfSuit(Suit.HEART);
    this.spadeCard = this.commonService.createCardStackOfSuit(Suit.SPADE);
    this.clubCard = this.commonService.createCardStackOfSuit(Suit.CLUB);
    this.diamondCard = this.commonService.createCardStackOfSuit(Suit.DIAMOND);
  }
}
