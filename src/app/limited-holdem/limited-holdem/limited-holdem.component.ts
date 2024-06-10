import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { Subscription, map } from 'rxjs';
import { Constants } from 'src/app/commons/constants/constants';
import { Player } from 'src/app/model/player.model';
import { GameTableService } from 'src/app/service/game-table.service';
import { PlayerInputPanelComponent } from '../player-input-panel/player-input-panel.component';
import { GameStartInfoService } from 'src/app/service/game-start-info.service';

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

  constructor(private gameStartInfoService: GameStartInfoService) {}

  ngOnInit() {
    this.playersArraySub = this.gameStartInfoService.playersArray$.subscribe(
      (data) => (this.players$ = data)
    );
    this.playersCountSub = this.gameStartInfoService.playersCount$.subscribe(
      (data) => (this.playersCount$ = data)
    );
  }

  ngOnDestroy(): void {
    this.playersArraySub.unsubscribe();
    this.playersCountSub.unsubscribe();
  }

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Constants.MOBILE_TRANSITION).pipe(
    map(({ matches }) => {
      if (matches) {
        //mobile
        return [
          { title: 'Game Engine', cols: 6, rows: 1 },
          { title: 'Card 3', cols: 6, rows: 1 },
        ];
      }
      //desktop
      return [
        { title: 'Game Engine', cols: 4, rows: 1.5 },
        { title: 'Card 3', cols: 2, rows: 1.5 },
      ];
    })
  );
}
