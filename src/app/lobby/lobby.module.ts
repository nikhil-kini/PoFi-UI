import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LobbyComponent } from './lobby/lobby.component';
import { RouterModule } from '@angular/router';
import { LobbyRoutingModule } from './lobby-route.module';

@NgModule({
  declarations: [LobbyComponent],
  imports: [SharedModule, RouterModule, LobbyRoutingModule],
})
export class LobbyModule {}
