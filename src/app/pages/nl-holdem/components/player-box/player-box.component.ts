import { Component, Input } from '@angular/core';
import { Player } from 'src/app/model/player.model';
import { GameTableService } from 'src/app/service/game-table.service';

@Component({
  selector: 'pofri-player-box',
  templateUrl: './player-box.component.html',
  styleUrls: ['./player-box.component.scss'],
})
export class PlayerBoxComponent {
  @Input() player: Player | null | undefined;

  constructor(private gameTS: GameTableService) {}

  checkCurrentPlayer(): boolean {
    if (this.player === this.gameTS.currentPlayer$) {
      return true;
    } else {
      return false;
    }
  }
}
