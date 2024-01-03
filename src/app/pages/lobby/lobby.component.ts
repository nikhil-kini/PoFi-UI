import { Component } from '@angular/core';
import { AuthUser } from 'aws-amplify/auth';
import { CognitoService } from 'src/app/service/cognito.service';
import { HttpClientService } from 'src/app/service/http-client.service';
import { environment } from 'src/environments/environment';
import Stripe from 'stripe';

@Component({
  selector: 'pofri-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss'],
})
export class LobbyComponent {
  authUser!: AuthUser;
  cusId!: string;
  constructor(
    private cognito: CognitoService,
    private client: HttpClientService
  ) {}

  ngOnInit() {}

  getUserInfo() {
    this.cognito.getUser().then((res) => {
      this.authUser = res;
    });
    console.log(this.authUser);

    this.client.getClientInformation(this.authUser.userId).subscribe((res) => {
      console.log(res);
      this.cusId = res.stripeId;
    });
  }

  checkout() {
    this.client
      .proceedToCheckout({ cus_id: this.cusId, user_id: this.authUser.userId })
      .subscribe((result: any) => {
        console.log(result);
        window.location.href = result;
      });
  }
}
