import { Component } from '@angular/core';
import { Card } from 'src/app/model/cards.model';
import { GameTableService } from 'src/app/service/game-table.service';

@Component({
  selector: 'pofri-player-card-input-panel',
  templateUrl: './player-card-input-panel.component.html',
  styleUrls: ['./player-card-input-panel.component.scss'],
})
export class PlayerCardInputPanelComponent {
  boardCardSelectionArray$: { id: number; card: Card }[] = [];
  userCardSelectionArray$: { id: number; card: Card }[] = [];

  constructor(private gameTS: GameTableService) {}

  boardCardSelection(id: number, card: Card) {
    let checkId = this.boardCardSelectionArray$.find((obj) => obj.id === id);
    if (checkId) {
      checkId.card = card;
    } else {
      this.boardCardSelectionArray$.push({ id, card });
    }
    console.log(this.boardCardSelectionArray$);
    this.gameTS.boardCards$ = this.boardCardSelectionArray$.flatMap(
      (obj) => obj.card
    );
  }

  userCardSelection(id: number, card: Card) {
    let checkId = this.userCardSelectionArray$.find((obj) => obj.id === id);
    if (checkId) {
      checkId.card = card;
    } else {
      this.userCardSelectionArray$.push({ id, card });
    }
    console.log(this.userCardSelectionArray$);
    this.gameTS.userCards$ = this.userCardSelectionArray$.flatMap(
      (obj) => obj.card
    );
  }
}
