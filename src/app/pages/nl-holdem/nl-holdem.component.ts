import { BreakpointObserver } from '@angular/cdk/layout';
import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs';
import { Constants, Position } from 'src/app/commons/constants/constants';
import { MetaCard, Rank, Suit } from 'src/app/model/cards.model';
import { Player, PlayerStatus } from 'src/app/model/player.model';
import { GameStartDetails } from 'src/app/model/table.model';
import { GameStartServiceService } from 'src/app/service/game-start-service.service';
import { GerenaratePlayerSeatingService } from 'src/app/service/gerenarate-player-seating.service';
import { UserGameDetailDailogComponent } from './components/user-game-detail-dailog/user-game-detail-dailog.component';

@Component({
  selector: 'pofri-nl-holdem',
  templateUrl: './nl-holdem.component.html',
  styleUrls: ['./nl-holdem.component.scss'],
})
export class NlHoldemComponent implements OnChanges {
  private breakpointObserver = inject(BreakpointObserver);
  startData = {} as GameStartDetails;
  userInfo = { userPosition: '5' };
  totalPlayers = parseInt(this.userInfo.userPosition);
  players: Array<Player | null | undefined>;
  currentPlayer: Player | null;

  constructor(
    private gameStartService: GameStartServiceService,
    private matDialog: MatDialog,
    private gerenaratePlayerSeatingService: GerenaratePlayerSeatingService
  ) {
    this.players = [];
    this.currentPlayer = null;
  }

  ngOnInit() {
    this.onOpenDialogPageStart();
    this.setData();
    this.createDeck();
  }

  setData() {
    this.gameStartService.gameStartData$.subscribe((data) => {
      this.startData = data as GameStartDetails;
    });
    this.gameStartService.gameUserInfoData$.subscribe((data) => {
      this.userInfo = data;
    });
  }

  getResult() {
    console.log('do this do that');
    this.currentPlayer = this.getNext(this.currentPlayer!);
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
      console.log(this.userInfo);

      let totalPlayers = parseInt(this.userInfo.userPosition);

      let playerPosition = Position.PLAYER_POSITION[totalPlayers];

      for (let index = 1; index <= totalPlayers; index++) {
        this.gerenaratePlayerSeatingService.addPlayer(
          index,
          playerPosition[index - 1]
        );
        console.log('player added');
        console.log(this.gerenaratePlayerSeatingService);
      }
      this.players = this.gerenaratePlayerSeatingService.toArray();
      this.currentPlayer = this.gerenaratePlayerSeatingService.head;
    });
  }

  call() {
    this.currentPlayer!.playerStatus = PlayerStatus.CALL;
    this.currentPlayer = this.getNext(this.currentPlayer!);
    this.players = this.gerenaratePlayerSeatingService.toArray();
  }

  raise() {
    this.currentPlayer!.playerStatus = PlayerStatus.RAISE;
    this.currentPlayer = this.getNext(this.currentPlayer!);
    this.players = this.gerenaratePlayerSeatingService.toArray();
  }

  fold() {
    this.currentPlayer!.playerStatus = PlayerStatus.FOLD;
    this.currentPlayer = this.getNext(this.currentPlayer!);
    this.players = this.gerenaratePlayerSeatingService.toArray();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
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

  createDeck(): Array<MetaCard> {
    let suit = Object.values(Suit).filter((x) => !isNaN(Number(x)));
    let rank = Object.values(Rank).filter((x) => !isNaN(Number(x)));

    let deck: MetaCard[] = [];
    suit.forEach((s) => {
      rank.forEach((r) => {
        deck.push({
          url:
            "url('img/card_faces/" +
            Suit[s as Suit].toLowerCase() +
            '_' +
            r +
            ".svg')",
          card: {
            rank: r as Rank,
            suit: s as Suit,
          },
        });
      });
    });

    console.log(deck);

    return deck;
  }
}
