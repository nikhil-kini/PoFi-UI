import { Component, EventEmitter, Inject, Output, Type } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Rank, Suit } from 'src/app/model/cards.model';
import { GameStartInfoService } from 'src/app/service/game-start-info.service';

@Component({
  selector: 'pofri-user-game-detail-dailog',
  templateUrl: './user-game-detail-dailog.component.html',
  styleUrls: ['./user-game-detail-dailog.component.scss'],
})
export class UserGameDetailDailogComponent {
  suitEnums = Suit;
  suitModes: number[];
  rankEnums = Rank;
  rankModes: number[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<UserGameDetailDailogComponent>,
    private builder: FormBuilder,
    private gameStartInfoService: GameStartInfoService
  ) {
    this.suitModes = Object.keys(this.suitEnums)
      .filter((x) => parseInt(x) >= 0)
      .flatMap((x) => parseInt(x));
    this.rankModes = Object.keys(this.rankEnums)
      .filter((x) => parseInt(x) >= 0)
      .flatMap((x) => parseInt(x));
  }

  closePopUp(msg: string) {
    this.ref.close(msg);
  }

  userDetails = this.builder.group({
    userPosition: this.builder.control(''),
    card1: this.builder.group({
      suit: this.builder.control(''),
      rank: this.builder.control(''),
    }),
    card2: this.builder.group({
      suit: this.builder.control(''),
      rank: this.builder.control(''),
    }),
  });

  saveUserInfo() {
    console.log(this.userDetails.value);
    this.closePopUp('Save close');
    this.gameStartInfoService.setGameUserInfoData(this.userDetails.value);
  }

  cancel() {
    this.closePopUp('Cancel close');
  }
}
