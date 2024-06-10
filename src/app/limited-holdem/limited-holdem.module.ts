import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LimitedHoldemComponent } from './limited-holdem/limited-holdem.component';
import { AddCardComponent } from './add-card/add-card.component';
import { CardSelectionWindowComponent } from './card-selection-window/card-selection-window.component';
import { PlayerBoxComponent } from './player-box/player-box.component';
import { PokerTableComponent } from './poker-table/poker-table.component';
import { PlayerInputPanelComponent } from './player-input-panel/player-input-panel.component';
import { RouterModule } from '@angular/router';
import { LimitedHoldemRoutingModule } from './limited-holdem-route.module';
import { GameInfoDialogComponent } from './game-info-dialog/game-info-dialog.component';

@NgModule({
  declarations: [
    GameInfoDialogComponent,
    LimitedHoldemComponent,
    AddCardComponent,
    CardSelectionWindowComponent,
    PlayerBoxComponent,
    PokerTableComponent,
    PlayerInputPanelComponent,
  ],
  imports: [SharedModule, RouterModule, LimitedHoldemRoutingModule],
})
export class LimitedHoldemModule {}
