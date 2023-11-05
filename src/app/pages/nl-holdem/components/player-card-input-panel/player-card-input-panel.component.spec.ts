import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerCardInputPanelComponent } from './player-card-input-panel.component';

describe('PlayerCardInputPanelComponent', () => {
  let component: PlayerCardInputPanelComponent;
  let fixture: ComponentFixture<PlayerCardInputPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlayerCardInputPanelComponent]
    });
    fixture = TestBed.createComponent(PlayerCardInputPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
