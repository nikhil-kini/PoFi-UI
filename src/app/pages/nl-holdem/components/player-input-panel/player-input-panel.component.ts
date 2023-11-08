import { Component } from '@angular/core';
import { PlayerStatus } from 'src/app/model/player.model';
import { Round } from 'src/app/model/table.model';
import { GameTableService } from 'src/app/service/game-table.service';

@Component({
  selector: 'pofri-player-input-panel',
  templateUrl: './player-input-panel.component.html',
  styleUrls: ['./player-input-panel.component.scss'],
})
export class PlayerInputPanelComponent {
  handCateory!: any;
  decision!: any;
  handCombination!: any;
  constructor(private gameTS: GameTableService) {}

  ngOnInit() {}

  checkUser(): boolean {
    return this.gameTS.currentPlayer$ === this.gameTS.userPlayer$
      ? true
      : false;
  }

  getRound(): string {
    return Round[this.gameTS.tableRound$];
  }

  getResult() {
    let handCategory = this.gameTS.getHandCategory();
    let decision = this.gameTS.getDecision();
    let handCombination = this.gameTS.getHandCombination();
    handCategory.subscribe((val) => (this.handCateory = val));
    decision.subscribe((val) => (this.decision = val));
    handCombination.subscribe((val) => (this.handCombination = val));
  }

  continue() {
    this.gameTS.playerAction(PlayerStatus.NA);
  }

  call() {
    this.gameTS.playerAction(PlayerStatus.CALL);
  }

  raise() {
    this.gameTS.playerAction(PlayerStatus.RAISE, 5);
  }

  fold() {
    this.gameTS.playerAction(PlayerStatus.FOLD);
  }
}
