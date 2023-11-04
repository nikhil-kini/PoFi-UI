import { Component } from '@angular/core';
import { PlayerStatus } from 'src/app/model/player.model';
import { GameTableService } from 'src/app/service/game-table.service';

@Component({
  selector: 'pofri-player-input-panel',
  templateUrl: './player-input-panel.component.html',
  styleUrls: ['./player-input-panel.component.scss'],
})
export class PlayerInputPanelComponent {
  constructor(private gameTS: GameTableService) {}

  checkUser(): boolean {
    return this.gameTS.currentPlayer$ === this.gameTS.userPlayer$
      ? true
      : false;
  }

  getResult() {
    this.gameTS.playerAction(PlayerStatus.NA);
  }

  call() {
    this.gameTS.playerAction(PlayerStatus.CALL);
  }

  raise() {
    this.gameTS.playerAction(PlayerStatus.RAISE);
  }

  fold() {
    this.gameTS.playerAction(PlayerStatus.FOLD);
  }
}
