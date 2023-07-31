import { Injectable } from '@angular/core';
import { Player } from '../model/player.model';

@Injectable({
  providedIn: 'root'
})

export class GerenaratePlayerSeatingService {
  head: Player | null;
  tail: Player | null;
  startPlayer: Player | null;
  playerCount = 0;

  constructor() {
    this.head = null;
    this.tail = null;
    this.startPlayer = null;
   }

  /**
   * addPlayer adds player to the Circular Linked List
   * @param  playerNumber takes player number with int data type
   * @return void: returns the null has type
   * */
  addPlayer(playerNumber: number): void {
    var newPlayer = new Player(playerNumber);
    if (this.head) {
      this.head = newPlayer;
      this.tail = newPlayer;
    }else if(this.tail){
      this.tail.nextPlayer = newPlayer;
    }
    this.tail = newPlayer;
    this.tail.nextPlayer = this.head;
    this.playerCount++;
  }

   /**
   * removePlayer removes player to the Circular Linked List
   * @param  playerNumber takes player number with int data type
   * @return void: returns the null has type
   * @throws RuntimeException " The Table is Empty "
   * */
  removePlayer(playerNumber: number): void {
    let currentPlayer: Player | null = this.head;
    let nextPlayer: Player | null = null;

    if (this.head === null) {
      throw new Error("The Table is Empty");
    }

    do {
      if (!currentPlayer) break;

      nextPlayer = currentPlayer.nextPlayer;
      if (nextPlayer && nextPlayer.playerNumber === playerNumber) {
        if (this.head === this.tail) {
          this.head = null;
          this.tail = null;
          this.startPlayer = null;
        } else {
          if (nextPlayer) {
            currentPlayer.nextPlayer = nextPlayer.nextPlayer;
            if (this.head === nextPlayer) {
              this.head = this.head.nextPlayer;
            }
            if (this.tail === nextPlayer) {
              this.tail = currentPlayer;
            }
            if (this.startPlayer === nextPlayer) {
              this.startPlayer = this.startPlayer.nextPlayer;
            }
          }
        }
        this.playerCount--;
        break;
      }
      currentPlayer = nextPlayer;
    } while (currentPlayer !== this.head);
  }

  /**
   * removePlayer removes player to the Circular Linked List
   * @param  playerNumber takes player number with int data type
   * @return Player returns the Player has type
   * @throws RuntimeException " The Table is Empty "
   * @throws RuntimeException " The Player is not found in the table "
   * */

  findPlayer(playerNumber: number): Player {
    let currentPlayer: Player | null = this.head;

    if (this.head === null) {
      throw new Error("The Table is Empty");
    } else {
      do {
        if (!currentPlayer) break;

        if (currentPlayer.playerNumber === playerNumber) {
          return currentPlayer;
        }

        if (currentPlayer === this.tail) {
          throw new Error("The Player is not found in the table");
        }

        currentPlayer = currentPlayer.nextPlayer;
      } while (currentPlayer !== this.head);
    }

    throw new Error("The Player is not found in the table");
  }

}
