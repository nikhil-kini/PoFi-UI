import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface UserDetails {
  userPosition: number;
}

export interface GameStartDetails {
  profileName: string;
  websiteName: string;
  tableSeats: number;
  anteAmount: number;
  smallBet: number;
  bigBet: number;
}

@Injectable({
  providedIn: 'root',
})
export class GameStartInfoService {
  private gameStartDataSource = new BehaviorSubject<GameStartDetails>({
    profileName: 'Not set',
    websiteName: 'Not Set',
    tableSeats: 5,
    anteAmount: 0,
    smallBet: 0,
    bigBet: 0,
  });
  private gameUserInfoSource = new BehaviorSubject<UserDetails>({
    userPosition: 1,
  });

  gameStartData$ = this.gameStartDataSource.asObservable();
  gameUserInfoData$ = this.gameUserInfoSource.asObservable();

  setGameStartData(data: any) {
    this.gameStartDataSource.next(data);
  }

  setGameUserInfoData(data: UserDetails) {
    this.gameUserInfoSource.next(data);
  }
}
