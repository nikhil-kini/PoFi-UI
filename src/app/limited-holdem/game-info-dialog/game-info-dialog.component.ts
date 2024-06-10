import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  GameStartDetails,
  GameStartInfoService,
} from 'src/app/service/game-start-info.service';

@Component({
  selector: 'pofri-game-info-dialog',
  templateUrl: './game-info-dialog.component.html',
  styleUrls: ['./game-info-dialog.component.scss'],
})
export class GameInfoDialogComponent {
  startData = {} as GameStartDetails;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<GameInfoDialogComponent>,
    private builder: FormBuilder,
    private gameStartInfoService: GameStartInfoService,
    private router: Router
  ) {}

  closepopup() {
    this.ref.close('closed');
  }

  gameInfoForm = this.builder.group({
    profileName: this.builder.control(this.startData.profileName, [
      Validators.required,
    ]),
    websiteName: this.builder.control(this.startData.websiteName, [
      Validators.required,
      Validators.pattern(`[a-zA-Z0-9.\-]*`),
    ]),
    tableSeats: this.builder.control(this.startData.tableSeats, [
      Validators.required,
      Validators.pattern('[2-9]'),
    ]),
    anteAmount: this.builder.control(this.startData.anteAmount, [
      Validators.required,
      Validators.pattern('[0-9.]*'),
    ]),
    smallBet: this.builder.control(this.startData.smallBet, [
      Validators.required,
      Validators.pattern('[0-9.]*'),
    ]),
    bigBet: this.builder.control(this.startData.bigBet, [
      Validators.required,
      Validators.pattern('[0-9.]*'),
    ]),
    userPosition: this.builder.control(this.startData.userPosition, [
      Validators.required,
      Validators.pattern('[1-9]'),
    ]),
  });

  saveGameInfo() {
    // console.log(this.gameInfoForm.value.anteAmount);
    // console.log(this.startData.bigBet);
    this.gameStartInfoService.setGameStartData(this.gameInfoForm.value);
    this.closepopup();
    this.router.navigate(['/', 'l-holdem']);
  }
}
