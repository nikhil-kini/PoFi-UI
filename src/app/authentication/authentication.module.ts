import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AuthenticationRoutingModule } from './authentication-route.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AuthenticationComponent],
  imports: [SharedModule, RouterModule, AuthenticationRoutingModule],
})
export class AuthenticationModule {}
