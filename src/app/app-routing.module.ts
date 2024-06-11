import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuccessComponent } from './pages/success/success.component';
import { CancelComponent } from './pages/cancel/cancel.component';
import { authGuard } from './service/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'success',
    component: SuccessComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'cancel',
    component: CancelComponent,
  },
  {
    path: 'lobby',
    loadChildren: () =>
      import('./lobby/lobby.module').then((m) => m.LobbyModule),
    canActivate: [authGuard],
  },
  {
    path: 'l-holdem',
    loadChildren: () =>
      import('./limited-holdem/limited-holdem.module').then(
        (m) => m.LimitedHoldemModule
      ),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
