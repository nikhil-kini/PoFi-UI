import { Component, Input } from '@angular/core';
import { Player } from 'src/app/model/player.model';

@Component({
  selector: 'pofri-poker-table',
  templateUrl: './poker-table.component.html',
  styleUrls: ['./poker-table.component.scss']
})
export class PokerTableComponent {
  @Input() players: Array<Player | null | undefined> | undefined;
  @Input() currentPlayer: Player | null | undefined;
  totalPlayers : number | undefined;

  constructor(){
    
  }

  ngOnInit(){
    this.totalPlayers = this.players?.length;
  }

  checkPlayer9():boolean{
    return this.totalPlayers == 9;
  }

  checkPlayer8():boolean{
    return this.totalPlayers == 8;
  }
  checkPlayer7():boolean{
    return this.totalPlayers == 7;
  }
  checkPlayer6():boolean{
    return this.totalPlayers == 6;
  }
  checkPlayer5():boolean{
    return this.totalPlayers == 5;
  }
  checkPlayer4():boolean{
    return this.totalPlayers == 4;
  }
  checkPlayer3():boolean{
    return this.totalPlayers == 3;
  }
  checkPlayer2():boolean{
    return this.totalPlayers == 2;
  }
}
