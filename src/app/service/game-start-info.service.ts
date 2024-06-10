import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Player, PlayerPosition } from '../model/player.model';

export interface GameStartDetails {
  profileName: string;
  websiteName: string;
  tableSeats: number;
  anteAmount: number;
  smallBet: number;
  bigBet: number;
  userPosition: number;
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
    userPosition: 1,
  });
  private gameCurrentPlayerInfoSource = new BehaviorSubject<Player>(
    new Player(1, PlayerPosition.SMALL_BLIND)
  );

  private playersArraySource = new BehaviorSubject<
    Array<Player | null | undefined>
  >([]);

  private playersCountSource = new BehaviorSubject<number | undefined>(0);

  gameStartData$ = this.gameStartDataSource.asObservable();
  gameCurrentPlayer$ = this.gameCurrentPlayerInfoSource.asObservable();
  playersArray$ = this.playersArraySource.asObservable();
  playersCount$ = this.playersCountSource.asObservable();

  setGameStartData(data: any) {
    this.gameStartDataSource.next(data);
  }

  setGameCurrentPlayerInfoSource(data: Player) {
    this.gameCurrentPlayerInfoSource.next(data);
  }

  setPlayersArraySource(data: Array<Player | null | undefined>) {
    this.playersArraySource.next(data);
  }

  setPlayerCountSource(data: number | undefined) {
    this.playersCountSource.next(data);
  }
}
