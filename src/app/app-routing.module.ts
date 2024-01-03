import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LobbyComponent } from './pages/lobby/lobby.component';
import { NlHoldemComponent } from './pages/nl-holdem/nl-holdem.component';
import { PokerTableComponent } from './pages/nl-holdem/components/poker-table/poker-table.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SuccessComponent } from './pages/success/success.component';
import { CancelComponent } from './pages/cancel/cancel.component';

const routes: Routes = [
  {
    path: '',
    component: LobbyComponent,
  },
  {
    path: 'success',
    component: SuccessComponent,
  },
  {
    path: 'cancel',
    component: CancelComponent,
  },
  {
    path: 'lobby',
    component: LobbyComponent,
  },
  {
    path: 'nlholdem',
    component: NlHoldemComponent,
  },
  {
    path: 'poker-table',
    component: PokerTableComponent,
  },
  {
    path: 'sign-in',
    component: SignInComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: '**',
    redirectTo: 'sign-in',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
