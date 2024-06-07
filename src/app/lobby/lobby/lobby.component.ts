import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthUser } from 'aws-amplify/auth';
import { map } from 'rxjs';
import { Constants } from 'src/app/commons/constants/constants';
import { CognitoService } from 'src/app/service/cognito.service';
import { HttpClientService } from 'src/app/service/http-client.service';
import { environment } from 'src/environments/environment';
import Stripe from 'stripe';
import { GameInfoDialogComponent } from '../game-info-dialog/game-info-dialog.component';

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
    private client: HttpClientService,
    private matDialog: MatDialog
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

  private breakpointObserver = inject(BreakpointObserver);

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Constants.MOBILE_TRANSITION).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Game Engine', cols: 2, rows: 1 },
          // { title: 'Card 2', cols: 1, rows: 1 },
          // { title: 'Card 3', cols: 1, rows: 1 },
          // { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Game Engine', cols: 2, rows: 1 },
        // { title: 'Card 2', cols: 1, rows: 1 },
        // { title: 'Card 3', cols: 1, rows: 2 },
        // { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );

  onOpenDialogClick() {
    var _dialog = this.matDialog.open(GameInfoDialogComponent, {
      width: '360px',
      hasBackdrop: false,
      data: {
        title: 'Game Information',
      },
    });

    _dialog.afterClosed().subscribe((item) => {
      console.log(item);
    });
  }
}
