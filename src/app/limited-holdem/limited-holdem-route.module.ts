import { RouterModule, Routes } from '@angular/router';
import { LimitedHoldemComponent } from './limited-holdem/limited-holdem.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: LimitedHoldemComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LimitedHoldemRoutingModule {}
