import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { Subscription, map } from 'rxjs';
import { Constants } from 'src/app/commons/constants/constants';
import { Player } from 'src/app/model/player.model';
import { GameTableService } from 'src/app/service/game-table.service';
import { PlayerInputPanelComponent } from '../player-input-panel/player-input-panel.component';
import {
  GameStartDetails,
  GameStartInfoService,
} from 'src/app/service/game-start-info.service';
import { GameInfoDialogComponent } from '../game-info-dialog/game-info-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'pofri-limited-holdem',
  templateUrl: './limited-holdem.component.html',
  styleUrls: ['./limited-holdem.component.scss'],
})
export class LimitedHoldemComponent implements OnInit, OnDestroy {
  private breakpointObserver = inject(BreakpointObserver);
  players$!: Array<Player | null | undefined>;
  playersCount$!: number | undefined;
  playersArraySub!: Subscription;
  playersCountSub!: Subscription;
  gameaStartDataSubscription!: Subscription;
  gameStartData!: GameStartDetails;

  constructor(
    private gameStartInfoService: GameStartInfoService,
    private matDialog: MatDialog,
    private gameTS: GameTableService
  ) {}

  ngOnInit() {
    this.playersArraySub = this.gameStartInfoService.playersArray$.subscribe(
      (data) => (this.players$ = data)
    );
    this.playersCountSub = this.gameStartInfoService.playersCount$.subscribe(
      (data) => (this.playersCount$ = data)
    );
    this.gameaStartDataSubscription =
      this.gameStartInfoService.gameStartData$.subscribe(
        (data) => (this.gameStartData = data)
      );

    this.onOpenDialogPageStart('Game Information');
  }

  ngOnDestroy(): void {
    this.playersArraySub.unsubscribe();
    this.playersCountSub.unsubscribe();
    this.gameaStartDataSubscription.unsubscribe();
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

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver
    .observe([
      Constants.MOBILE_TRANSITION,
      '(max-width:600px)',
      Constants.TABLET_TRANSITION,
    ])
    .pipe(
      map((val) => {
        const breakPoint = val.breakpoints;
        console.log(breakPoint);

        if (breakPoint[Constants.MOBILE_TRANSITION]) {
          //mobile
          return [
            { title: 'Game Engine', cols: 6, rows: 5 },
            { title: 'Card 3', cols: 6, rows: 6 },
          ];
        } else if (breakPoint['(max-width:600px)']) {
          return [
            { title: 'Game Engine', cols: 6, rows: 6 },
            { title: 'Card 3', cols: 6, rows: 6 },
          ];
        } else if (breakPoint[Constants.TABLET_TRANSITION]) {
          //Tablet
          return [
            { title: 'Game Engine', cols: 6, rows: 7 },
            { title: 'Card 3', cols: 6, rows: 6 },
          ];
        } else {
          //desktop
          return [
            { title: 'Game Engine', cols: 4, rows: 8 },
            { title: 'Card 3', cols: 2, rows: 8 },
          ];
        }
      })
    );
}
