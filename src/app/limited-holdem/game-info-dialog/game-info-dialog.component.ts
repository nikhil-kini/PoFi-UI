import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
    private gameStartInfoService: GameStartInfoService
  ) {}

  closepopup() {
    this.ref.close('closed');
  }

  gameInfoForm = this.builder.group({
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
    this.gameStartInfoService.setGameStartData(this.gameInfoForm.value);
    this.closepopup();
  }
}
