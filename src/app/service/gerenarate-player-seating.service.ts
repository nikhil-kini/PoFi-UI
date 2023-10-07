import { Injectable } from '@angular/core';
import { Player, PlayerPosition } from '../model/player.model';

@Injectable({
  providedIn: 'root'
})

export class GerenaratePlayerSeatingService {
  head: Player | null;
  tail: Player | null;
  playerCount = 0;

  constructor() {
    this.head = null;
    this.tail = null;
   }

  /**
   * addPlayer adds player to the Circular Linked List
   * @param  playerNumber takes player number with int data type
   * @return void: returns the null has type
   * */
  addPlayer(playerNumber: number, playerPosition: PlayerPosition): void {
    var newPlayer = new Player(playerNumber, playerPosition);
    if (this.head === null) {
      this.head = newPlayer;
    }
    else if(this.tail){
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
        } else {
          if (nextPlayer) {
            currentPlayer.nextPlayer = nextPlayer.nextPlayer;
            if (this.head === nextPlayer) {
              this.head = this.head.nextPlayer;
            }
            if (this.tail === nextPlayer) {
              this.tail = currentPlayer;
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

  /**
   * size() returns player count
   * @return number player count
   * */
  size(): number{
    return this.playerCount
  }

  /**
   * toArray (Player) gives the array of players in the Circular Linked List
   * with the passed in player at the begining of the Array.
   * @param  Player takes player in the Linked List of players
   * @return Player Array returns the Player Array of all player in Linked List
   * */
  toArray(start: Player | null= this.head): Array<Player | null | undefined>{
    var players: Array<Player | null | undefined> = [];
    var current: Player | null | undefined = start;

    if (start) {
      do {
        players.push(current);
        current = current?.nextPlayer;
      } while (current != start);
    }else{
      players = [];
    }
    return players;
  }

}
