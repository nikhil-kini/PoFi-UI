import { Component, Input } from '@angular/core';
import { Player } from 'src/app/model/player.model';

@Component({
  selector: 'pofri-player-box',
  templateUrl: './player-box.component.html',
  styleUrls: ['./player-box.component.scss']
})
export class PlayerBoxComponent {
  @Input() player: Player | null | undefined;
  @Input() currentPlayer: Player | null | undefined;

  checkCurrentPlayer():boolean{
    if (this.player?.playerNumber === this.currentPlayer?.playerNumber){
     return true;
    }
    else{
     return false;
    }
  }
}
