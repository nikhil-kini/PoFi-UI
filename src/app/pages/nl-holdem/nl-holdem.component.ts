import { BreakpointObserver } from '@angular/cdk/layout';
import {
  Component,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map, Observable } from 'rxjs';
import { Constants, Position } from 'src/app/commons/constants/constants';
import { MetaCard, Rank, Suit } from 'src/app/model/cards.model';
import { Player, PlayerStatus } from 'src/app/model/player.model';
import { GameStartDetails } from 'src/app/model/table.model';
import { GameStartInfoService } from 'src/app/service/game-start-info.service';
import { GerenaratePlayerSeatingService } from 'src/app/service/gerenarate-player-seating.service';
import { UserGameDetailDailogComponent } from './components/user-game-detail-dailog/user-game-detail-dailog.component';
import { GameTableService } from 'src/app/service/game-table.service';

@Component({
  selector: 'pofri-nl-holdem',
  templateUrl: './nl-holdem.component.html',
  styleUrls: ['./nl-holdem.component.scss'],
})
export class NlHoldemComponent {
  private breakpointObserver = inject(BreakpointObserver);
  startData = {} as GameStartDetails;
  userInfo = { userPosition: '5' };
  totalPlayers = parseInt(this.userInfo.userPosition);
  players: Array<Player | null | undefined>;
  currentPlayer: Player | null;

  observerGTS$: Observable<GameTableService>;

  constructor(
    private gameStartInfoService: GameStartInfoService,
    private matDialog: MatDialog,
    private gerenaratePlayerSeatingService: GerenaratePlayerSeatingService,
    private gameTableService: GameTableService
  ) {
    this.players = [];
    this.currentPlayer = null;
    this.observerGTS$ = new Observable((observer) => {
      observer.next(gameTableService);
    });
  }

  ngOnInit() {
    this.onOpenDialogPageStart();
    this.setData();
  }

  setData() {
    this.gameStartInfoService.gameStartData$.subscribe((data) => {
      this.startData = data as GameStartDetails;
    });
    this.gameStartInfoService.gameUserInfoData$.subscribe((data) => {
      this.userInfo = data;
    });
  }

  getResult() {
    console.log('do this do that');
    // this.currentPlayer = this.getNext(this.currentPlayer!);
    this.gameTableService.playerAction(PlayerStatus.NA);
    this.currentPlayer = this.gameTableService.currentPlayer$;
  }

  onOpenDialogPageStart() {
    var _dialog = this.matDialog.open(UserGameDetailDailogComponent, {
      width: '360px',
      hasBackdrop: false,
      data: {
        title: 'User Information',
      },
    });

    // change userPosition to Total Players
    _dialog.afterClosed().subscribe((item) => {
      console.log(item);
      console.log('--------------------');
      console.log(this.userInfo);

      let totalPlayers = parseInt(this.userInfo.userPosition);

      this.gameTableService.createTable(totalPlayers, 2);
      // this.gameTableService.observerGPS$.subscribe(
      //   (val) => (this.players = val.toArray(this.gameTableService.userPlayer$))
      // );
      this.players = this.gameTableService.tablePlayers$;
      this.observerGTS$.subscribe(
        (value) => (this.currentPlayer = value.currentPlayer$)
      );
      // this.players = this.gerenaratePlayerSeatingService.toArray();
      // this.currentPlayer = this.gerenaratePlayerSeatingService.head;
    });
  }

  call() {
    this.gameTableService.playerAction(PlayerStatus.CALL);
    this.currentPlayer = this.gameTableService.currentPlayer$;
    // this.currentPlayer!.playerStatus = PlayerStatus.CALL;
    // this.currentPlayer = this.getNext(this.currentPlayer!);
    // this.players = this.gerenaratePlayerSeatingService.toArray();
  }

  raise() {
    this.gameTableService.playerAction(PlayerStatus.RAISE);
    this.currentPlayer = this.gameTableService.currentPlayer$;
    // this.currentPlayer!.playerStatus = PlayerStatus.RAISE;
    // this.currentPlayer = this.getNext(this.currentPlayer!);
    // this.players = this.gerenaratePlayerSeatingService.toArray();
  }

  fold() {
    this.gameTableService.playerAction(PlayerStatus.FOLD);
    this.currentPlayer = this.gameTableService.currentPlayer$;
    // this.currentPlayer!.playerStatus = PlayerStatus.FOLD;
    // this.currentPlayer = this.getNext(this.currentPlayer!);
    // this.players = this.gerenaratePlayerSeatingService.toArray();
  }

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Constants.MOBILE_TRANSITION).pipe(
    map(({ matches }) => {
      if (matches) {
        //mobile
        return [
          { title: 'Game Engine', cols: 2, rows: 1 },
          { title: 'Card 2', cols: 2, rows: 1 },
          { title: 'Card 3', cols: 2, rows: 2 },
          // { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }
      //desktop
      return [
        { title: 'Game Engine', cols: 1, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 2, rows: 2 },
        // { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );

  /**
   * getNext(Player) gives the next player who is not FOLDED.
   * @param currentPlayer current player in the game
   * @returns the next player whose Player Status is not FOLD
   */
  getNext(currentPlayer: Player): Player | null {
    let nextPlayer = currentPlayer.nextPlayer;
    if (currentPlayer === nextPlayer) return null;

    if (nextPlayer?.playerStatus === PlayerStatus.FOLD)
      nextPlayer = this.getNext(nextPlayer);

    return nextPlayer;
  }
}
