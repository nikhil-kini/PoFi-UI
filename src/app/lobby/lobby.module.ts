import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LobbyComponent } from './lobby/lobby.component';
import { GameInfoDialogComponent } from './game-info-dialog/game-info-dialog.component';
import { RouterModule } from '@angular/router';
import { LobbyRoutingModule } from './lobby-route.module';

@NgModule({
  declarations: [LobbyComponent, GameInfoDialogComponent],
  imports: [SharedModule, RouterModule, LobbyRoutingModule],
})
export class LobbyModule {}
