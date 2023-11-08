import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LobbyComponent } from './pages/lobby/lobby.component';
import { NlHoldemComponent } from './pages/nl-holdem/nl-holdem.component';
import { PokerTableComponent } from './pages/nl-holdem/components/poker-table/poker-table.component';

const routes: Routes = [
  { path: '', component: LobbyComponent },
  { path: 'lobby', component: LobbyComponent },
  { path: 'nlholdem', component: NlHoldemComponent },
  { path: 'poker-table', component: PokerTableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
