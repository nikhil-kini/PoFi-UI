import { BreakpointObserver } from '@angular/cdk/layout';
import {
  AfterContentInit,
  AfterViewInit,
  Component,
  OnDestroy,
  inject,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs';
import { Constants } from 'src/app/commons/constants/constants';
import { Player } from 'src/app/model/player.model';
import {
  GameStartDetails,
  GameStartInfoService,
  UserDetails,
} from 'src/app/service/game-start-info.service';
import { UserGameDetailDailogComponent } from './components/user-game-detail-dailog/user-game-detail-dailog.component';
import { GameTableService } from 'src/app/service/game-table.service';

@Component({
  selector: 'pofri-nl-holdem',
  templateUrl: './nl-holdem.component.html',
  styleUrls: ['./nl-holdem.component.scss'],
})
export class NlHoldemComponent {
  private breakpointObserver = inject(BreakpointObserver);
  private gameStartData!: GameStartDetails;
  private gameUserInfo!: UserDetails;
  players$!: Array<Player | null | undefined>;
  playersCount$!: number | undefined;

  constructor(
    private matDialog: MatDialog,
    private gameTableService: GameTableService,
    private gameStartInfoService: GameStartInfoService
  ) {}

  ngOnInit() {
    this.onOpenDialogPageStart();
    this.setUpData();
  }

  setUpData() {
    this.gameStartInfoService.gameStartData$.subscribe(
      (data) => (this.gameStartData = data)
    );
    this.gameStartInfoService.gameUserInfoData$.subscribe(
      (data) => (this.gameUserInfo = data)
    );
  }

  toggle() {
    this.gameTableService.createTable(this.gameStartData, this.gameUserInfo);
    this.players$ = this.gameTableService.tablePlayers$;
    this.playersCount$ = this.gameTableService.totalPlayers$;
  }
  onOpenDialogPageStart() {
    var _dialog = this.matDialog.open(UserGameDetailDailogComponent, {
      width: '360px',
      hasBackdrop: false,
      data: {
        title: 'User Information',
      },
    });
    _dialog.afterClosed().subscribe(() => this.toggle());
  }

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Constants.MOBILE_TRANSITION).pipe(
    map(({ matches }) => {
      if (matches) {
        //mobile
        return [
          { title: 'Game Engine', cols: 6, rows: 1 },
          { title: 'Card 3', cols: 6, rows: 1.1 },
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
