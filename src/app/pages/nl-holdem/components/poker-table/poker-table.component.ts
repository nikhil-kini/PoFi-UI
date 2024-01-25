import { Component, Input } from '@angular/core';
import { Card } from 'src/app/model/cards.model';
import { Player } from 'src/app/model/player.model';
import { GameTableService } from 'src/app/service/game-table.service';

@Component({
  selector: 'pofri-poker-table',
  templateUrl: './poker-table.component.html',
  styleUrls: ['./poker-table.component.scss'],
})
export class PokerTableComponent {
  @Input() tabelPlayers!: Array<Player | null | undefined>;
  @Input() totalPlayersCount!: number | undefined;
  boardCardSelectionArray$: { id: number; card: Card }[] = [];
  userCardSelectionArray$: { id: number; card: Card }[] = [];

  constructor(private gameTS: GameTableService) {}

  ngOnInit() {}

  checkPlayer9(): boolean {
    return this.totalPlayersCount == 9;
  }

  checkPlayer8(): boolean {
    return this.totalPlayersCount == 8;
  }
  checkPlayer7(): boolean {
    return this.totalPlayersCount == 7;
  }
  checkPlayer6(): boolean {
    return this.totalPlayersCount == 6;
  }
  checkPlayer5(): boolean {
    return this.totalPlayersCount == 5;
  }
  checkPlayer4(): boolean {
    return this.totalPlayersCount == 4;
  }
  checkPlayer3(): boolean {
    return this.totalPlayersCount == 3;
  }
  checkPlayer2(): boolean {
    return this.totalPlayersCount == 2;
  }

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
