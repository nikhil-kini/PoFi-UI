import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameStartServiceService {

  constructor() { }

  private gameStartDataSource = new BehaviorSubject<any>({});
  private gameUserInfoSource = new BehaviorSubject<any>({});

  gameStartData$ = this.gameStartDataSource.asObservable();
  gameUserInfoData$ = this.gameUserInfoSource.asObservable();

  setGameStartData(data: any){
    // console.log(data);
    this.gameStartDataSource.next(data);
  }

  setgameUserInfoData(data: any){
    this.gameUserInfoSource.next(data);
  }
}
