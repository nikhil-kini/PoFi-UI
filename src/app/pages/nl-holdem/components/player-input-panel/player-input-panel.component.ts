import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
  constructor(private gameTS: GameTableService, private builder: FormBuilder) {}

  getPot(): number {
    return this.gameTS.tablePot$;
  }

  getCurrentBet(): number {
    return this.gameTS.tableRunningBet$;
  }

  checkFreshSelection(): boolean {
    return this.gameTS.isFreshRound$;
  }

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

  checkIfCurrentAmountIsPlayerAmount(): boolean {
    return this.gameTS.tableRunningBet$ ===
      this.gameTS.currentPlayer$?.playerBet
      ? true
      : false;
  }

  call() {
    this.gameTS.playerAction(PlayerStatus.CALL);
  }

  raise(amount: string) {
    this.gameTS.playerAction(PlayerStatus.RAISE, Number(amount));
  }

  fold() {
    this.gameTS.playerAction(PlayerStatus.FOLD);
  }

  bet(amount: string) {
    this.gameTS.playerAction(PlayerStatus.BET, Number(amount));
  }

  check() {
    this.gameTS.playerAction(PlayerStatus.CHECK);
  }
}
