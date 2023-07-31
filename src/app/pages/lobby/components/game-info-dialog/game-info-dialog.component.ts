import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'pofri-game-info-dialog',
  templateUrl: './game-info-dialog.component.html',
  styleUrls: ['./game-info-dialog.component.scss']
})
export class GameInfoDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref:MatDialogRef<GameInfoDialogComponent>, private builder: FormBuilder){
    
  }

  closepopup(){
    this.ref.close('closed')
  }

  gameInfoForm = this.builder.group({
    seats: this.builder.control(''),
    ante: this.builder.control(''),
    small_bet: this.builder.control(''),
    big_bet: this.builder.control(''),
  });

  saveGameInfo(){
    console.log(this.gameInfoForm.value);
  }
}
