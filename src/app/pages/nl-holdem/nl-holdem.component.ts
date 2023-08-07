import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs';
import { Constants } from 'src/app/constants/constants';
import { Player } from 'src/app/model/player.model';
import { GameStartDetails } from 'src/app/model/table.model';
import { GameStartServiceService } from 'src/app/service/game-start-service.service';
import { GerenaratePlayerSeatingService } from 'src/app/service/gerenarate-player-seating.service';
import { UserGameDetailDailogComponent } from './components/user-game-detail-dailog/user-game-detail-dailog.component';


@Component({
  selector: 'pofri-nl-holdem',
  templateUrl: './nl-holdem.component.html',
  styleUrls: ['./nl-holdem.component.scss']
})
export class NlHoldemComponent implements OnChanges{
  private breakpointObserver = inject(BreakpointObserver);
  startData = {} as GameStartDetails;
  userInfo = {userPosition: '0'};
  @Input() currentPlayer: any | null;

  constructor(private gameStartService: GameStartServiceService, private matDialog: MatDialog, private gps: GerenaratePlayerSeatingService) {
    
  }

  ngOnInit() {
    this.onOpenDialogPageStart();
    this.setData();
  }

  setData(){
    this.gameStartService.gameStartData$.subscribe(
      data => {
        this.startData = data as GameStartDetails;
      }
    );
    this.gameStartService.gameUserInfoData$.subscribe(
      data => {
        this.userInfo = data;
      }
    );

    
  }

  getResult(){
    console.log('do this do that');
    this.currentPlayer = this.currentPlayer.nextPlayer;
  }

  onOpenDialogPageStart() {
    var _dialog = this.matDialog.open(UserGameDetailDailogComponent, {
      width: '360px',
      hasBackdrop: false,
      data: {
        title: 'User Information',
      }
    });

    _dialog.afterClosed().subscribe(item => {
      console.log(item);
      console.log(this.userInfo);

      for (let index = 0; index < parseInt(this.userInfo.userPosition); index++) {
        this.gps.addPlayer(index);
        console.log('player added');
        console.log(this.gps);
      }
      this.currentPlayer = this.gps.head;
    });

  }

  call(){
    this.currentPlayer = this.currentPlayer.nextPlayer;
  }

  raise(){
    this.currentPlayer = this.currentPlayer.nextPlayer;
  }

  fold(){
    this.gps.removePlayer(this.currentPlayer?.playerNumber);
    this.currentPlayer = this.currentPlayer.nextPlayer;
  }

  ngOnChanges(changes: SimpleChanges): void {
      console.log(changes);
  }


  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Constants.MOBILE_TRANSITION).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Game Engine', cols: 2, rows: 1 },
          // { title: 'Card 2', cols: 1, rows: 1 },
          // { title: 'Card 3', cols: 1, rows: 1 },
          // { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Game Engine', cols: 2, rows: 1 },
        // { title: 'Card 2', cols: 1, rows: 1 },
        // { title: 'Card 3', cols: 1, rows: 2 },
        // { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );

  
}
