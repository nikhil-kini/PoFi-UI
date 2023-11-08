import { Component, Input } from '@angular/core';
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
}
