import { Component, OnChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Player, PlayerStatus } from 'src/app/model/player.model';
import { Round } from 'src/app/model/table.model';
import { GameTableService } from 'src/app/service/game-table.service';
import { LimitedHoldemComponent } from '../limited-holdem/limited-holdem.component';
import {
  GameStartDetails,
  GameStartInfoService,
} from 'src/app/service/game-start-info.service';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { GameInfoDialogComponent } from '../game-info-dialog/game-info-dialog.component';

@Component({
  selector: 'pofri-player-input-panel',
  templateUrl: './player-input-panel.component.html',
  styleUrls: ['./player-input-panel.component.scss'],
})
export class PlayerInputPanelComponent implements OnChanges {
  private gameStartData!: GameStartDetails;
  players$!: Array<Player | null | undefined>;
  playersCount$!: number | undefined;
  gameaStartDataSubscription!: Subscription;
  gameUserInfoSubscription!: Subscription;

  handCateory = 'NA';
  decision!: any;
  handCombination = 'NA';

  constructor(
    private gameTS: GameTableService,
    private gameStartInfoService: GameStartInfoService,
    private matDialog: MatDialog
  ) {}

  ngOnInit() {
    this.onOpenDialogPageStart('Game Information');
    this.setUpData();
  }

  ngOnDestroy(): void {
    this.gameUserInfoSubscription.unsubscribe();
    this.gameaStartDataSubscription.unsubscribe();
  }

  setUpData() {
    this.gameaStartDataSubscription =
      this.gameStartInfoService.gameStartData$.subscribe(
        (data) => (this.gameStartData = data)
      );
    this.gameStartInfoService.gameCurrentPlayer$.subscribe((data) =>
      console.log(data)
    );
  }

  toggle() {
    this.gameTS.createTable(this.gameStartData);
    this.gameStartInfoService.setPlayersArraySource(this.gameTS.tablePlayers$);
    this.gameStartInfoService.setPlayerCountSource(this.gameTS.totalPlayers$);
  }
  onOpenDialogPageStart(title: string) {
    var _dialog = this.matDialog.open(GameInfoDialogComponent, {
      width: '360px',
      hasBackdrop: false,
      data: {
        title: title,
      },
    });
    _dialog.afterClosed().subscribe(() => this.toggle());
  }

  ngOnChanges() {
    this.getResult();
    console.log('changes');
  }

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
    handCategory.subscribe(
      (val) => (this.handCateory = val.handCategoryResult)
    );
    decision.subscribe(
      (val) => (this.decision = val.decisionResults.join(' / '))
    );
    handCombination.subscribe(
      (val) => (this.handCombination = val.completeHandCombinations[0])
    );
  }

  checkIfCurrentAmountIsPlayerAmount(): boolean {
    return this.gameTS.tableRunningBet$ ===
      this.gameTS.currentPlayer$?.playerBet
      ? true
      : false;
  }

  call() {
    if (!this.gameTS.playerAction(PlayerStatus.CALL)) this.restartGame();
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
    if (!this.gameTS.playerAction(PlayerStatus.CHECK)) this.restartGame();
  }

  restartGame() {
    this.gameTS.newGame();
    this.onOpenDialogPageStart('Update Game Information');
  }
}
