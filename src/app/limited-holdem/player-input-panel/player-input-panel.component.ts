import { ChangeDetectorRef, Component, OnChanges } from '@angular/core';
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
export class PlayerInputPanelComponent {
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
    this.setUpData();
  }

  ngOnDestroy(): void {
    this.gameUserInfoSubscription.unsubscribe();
    this.gameaStartDataSubscription.unsubscribe();
    console.log('destroyed');
  }

  setUpData() {
    this.gameaStartDataSubscription =
      this.gameStartInfoService.gameStartData$.subscribe(
        (data) => (this.gameStartData = data)
      );
    this.gameUserInfoSubscription =
      this.gameStartInfoService.gameCurrentPlayer$.subscribe((data) => {
        if (data == this.gameTS.userPlayer$) {
          this.getResult();
        }
      });
  }

  toggle() {
    this.gameTS.createTable(this.gameStartData);
    this.gameStartInfoService.setPlayersArraySource(this.gameTS.tablePlayers$);
    this.gameStartInfoService.setPlayerCountSource(this.gameTS.totalPlayers$);
  }

  onOpenDialogPageStart(title: string) {
    var _dialog = this.matDialog.open(GameInfoDialogComponent, {
      width: '360px',
      hasBackdrop: true,
      data: {
        title: title,
      },
    });
    _dialog.afterClosed().subscribe(() => this.toggle());
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
    if (
      this.gameTS.currentPlayer$ === this.gameTS.userPlayer$ &&
      this.gameTS.userCards$
    ) {
      return true;
    }
    return false;
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
    if (!this.gameTS.playerAction(PlayerStatus.RAISE, Number(amount)))
      this.restartGame();
  }

  fold() {
    if (!this.gameTS.playerAction(PlayerStatus.FOLD)) this.restartGame();
  }

  bet(amount: string) {
    if (!this.gameTS.playerAction(PlayerStatus.BET, Number(amount)))
      this.restartGame();
  }

  check() {
    if (!this.gameTS.playerAction(PlayerStatus.CHECK)) this.restartGame();
  }

  restartGame() {
    this.gameTS.newGame();
    this.onOpenDialogPageStart('New Game, Update Information');
  }
}
