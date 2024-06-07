import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GameStartInfoService } from 'src/app/service/game-start-info.service';

@Component({
  selector: 'pofri-user-game-detail-dailog',
  templateUrl: './user-game-detail-dailog.component.html',
  styleUrls: ['./user-game-detail-dailog.component.scss'],
})
export class UserGameDetailDailogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<UserGameDetailDailogComponent>,
    private builder: FormBuilder,
    private gameStartInfoService: GameStartInfoService
  ) {}

  closePopUp(msg: string) {
    this.ref.close(msg);
  }

  userDetails = this.builder.group({
    userPosition: this.builder.control(''),
  });

  saveUserInfo() {
    console.log(this.userDetails.value);
    this.closePopUp('Save close');
    let userPositionVar = Number(this.userDetails.value.userPosition);
    this.gameStartInfoService.setGameUserInfoData({
      userPosition: userPositionVar,
    });
  }

  cancel() {
    this.closePopUp('Cancel close');
  }
}
