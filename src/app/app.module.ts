import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { LobbyComponent } from './pages/lobby/lobby.component';
import { NlHoldemComponent } from './pages/nl-holdem/nl-holdem.component';
import { DashboardComponent } from './pages/lobby/components/dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { GameInfoDialogComponent } from './pages/lobby/components/game-info-dialog/game-info-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { GameStartInfoService } from './service/game-start-info.service';
import { UserGameDetailDailogComponent } from './pages/nl-holdem/components/user-game-detail-dailog/user-game-detail-dailog.component';
import { MatSelectModule } from '@angular/material/select';
import { PlayerBoxComponent } from './pages/nl-holdem/components/player-box/player-box.component';
import { PokerTableComponent } from './pages/nl-holdem/components/poker-table/poker-table.component';
import { MatTabsModule } from '@angular/material/tabs';
import { CardSelectionWindowComponent } from './pages/nl-holdem/components/card-selection-window/card-selection-window.component';
import { AddCardComponent } from './pages/nl-holdem/components/add-card/add-card.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { PlayerInputPanelComponent } from './pages/nl-holdem/components/player-input-panel/player-input-panel.component';
import { PlayerCardInputPanelComponent } from './pages/nl-holdem/components/player-card-input-panel/player-card-input-panel.component';
import { HttpClientModule } from '@angular/common/http';
import { GameTableService } from './service/game-table.service';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SuccessComponent } from './pages/success/success.component';
import { CancelComponent } from './pages/cancel/cancel.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    LobbyComponent,
    NlHoldemComponent,
    DashboardComponent,
    GameInfoDialogComponent,
    UserGameDetailDailogComponent,
    PlayerBoxComponent,
    PokerTableComponent,
    CardSelectionWindowComponent,
    AddCardComponent,
    PlayerInputPanelComponent,
    PlayerCardInputPanelComponent,
    SignUpComponent,
    SignInComponent,
    SuccessComponent,
    CancelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatSlideToggleModule,
    FormsModule,
    MatCardModule,
    MatGridListModule,
    MatMenuModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatTabsModule,
    OverlayModule,
    ScrollingModule,
    HttpClientModule,
  ],
  providers: [GameStartInfoService, GameTableService],
  bootstrap: [AppComponent],
})
export class AppModule {}
