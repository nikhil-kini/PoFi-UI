import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerBoxComponent } from './player-box.component';
import { GameTableService } from 'src/app/service/game-table.service';
import { Player, PlayerPosition } from 'src/app/model/player.model';

describe('PlayerBoxComponent', () => {
  let component: PlayerBoxComponent;
  let fixture: ComponentFixture<PlayerBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: GameTableService, useClass: MockGameTableService },
      ],
      declarations: [PlayerBoxComponent],
    });
    fixture = TestBed.createComponent(PlayerBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('if the current player is the player box', () => {
    component.player = new Player(1, PlayerPosition.EARLY);

    expect(component.checkCurrentPlayer())
      .withContext('method test')
      .toEqual(true);
  });

  it('if the current player is not the player box', () => {
    component.player = new Player(2, PlayerPosition.EARLY);

    expect(component.checkCurrentPlayer())
      .withContext('method test')
      .toEqual(false);
  });
});

class MockGameTableService {
  currentPlayer$ = new Player(1, PlayerPosition.EARLY);
}
